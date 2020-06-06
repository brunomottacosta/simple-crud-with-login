package com.github.brunomottacosta.service;

import com.github.brunomottacosta.data.model.Client;
import com.github.brunomottacosta.data.model.ClientEmail;
import com.github.brunomottacosta.data.model.ClientPhone;
import com.github.brunomottacosta.data.repository.ClientRepository;
import com.github.brunomottacosta.data.repository.EmailRepository;
import com.github.brunomottacosta.data.repository.PhoneRepository;
import com.github.brunomottacosta.web.problems.exceptions.BadRequestException;
import com.github.brunomottacosta.web.problems.exceptions.ResourceNotFoundException;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ClientService {

    private final ClientRepository clientRepository;
    private final PhoneRepository phoneRepository;
    private final EmailRepository emailRepository;

    @Autowired
    public ClientService(
            ClientRepository clientRepository, PhoneRepository phoneRepository, EmailRepository emailRepository) {
        this.clientRepository = clientRepository;
        this.phoneRepository = phoneRepository;
        this.emailRepository = emailRepository;
    }

    @Transactional
    public Client create(Client client) {
        // The entity creation is simple as that
        // Validations are implicity in class model annotations
        return clientRepository.save(client);
    }

    @Transactional
    public Client update(Long id, Client client) {
        // Must find the original entity to update
        Client forUpdate = show(id);

        // To facilitate updating entity values, use copyProperties from BeanUtils
        // Ignores fields that can't be updated by the client
        copyIgnoringProperties(client, forUpdate);

        /* Checks if child entities are no longer in the list and mark then to exclusion */

        List<ClientPhone> toRemovePhones = forUpdate.getPhones()
                .stream().filter(p -> !client.getPhones().contains(p))
                .collect(Collectors.toList());
        forUpdate.getPhones().removeAll(toRemovePhones);
        phoneRepository.deleteAll(toRemovePhones);

        List<ClientEmail> toRemoveEmails = forUpdate.getEmails()
                .stream().filter(e -> !client.getEmails().contains(e))
                .collect(Collectors.toList());
        forUpdate.getEmails().removeAll(toRemoveEmails);
        emailRepository.deleteAll(toRemoveEmails);

        forUpdate.getPhones().addAll(client.getPhones());
        forUpdate.getEmails().addAll(client.getEmails());

        return clientRepository.save(forUpdate);
    }

    public void delete(Long id) {
        Client forExclusion = show(id);
        clientRepository.delete(forExclusion);
    }

    public List<Client> index() {
        return clientRepository.findAll();
    }

    public Client show(Long id) {
        return clientRepository
                .findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Entity not found with given ID"));
    }

    public Client addPhone(Long id, ClientPhone phone) {
        Client client = show(id);
        if (client.getPhones().stream().anyMatch(p -> p.getNumber().equals(phone.getNumber()))) {
            throw new BadRequestException("Phone already registred for this user");
        }

        client.getPhones().add(phone);
        return clientRepository.save(client);
    }

    public Client removePhone(Long id, Long phoneId) {
        Client client = show(id);
        if (client.getPhones().removeIf(phone -> phone.getId().equals(phoneId))) {
            throw new BadRequestException("Phone not found in this client for removal");
        }

        return clientRepository.save(client);
    }

    public Client addEmail(Long id, ClientEmail email) {
        Client client = show(id);
        if (client.getEmails().stream().anyMatch(e -> e.getEmail().equals(email.getEmail()))) {
            throw new BadRequestException("Email already registred for this user");
        }

        client.getEmails().add(email);
        return clientRepository.save(client);
    }

    public Client removeEmail(Long id, Long emailId) {
        Client client = show(id);
        if (!client.getEmails().removeIf(email -> email.getId().equals(emailId))) {
            throw new BadRequestException("Phone not found in this client for removal");
        }

        return clientRepository.save(client);
    }

    private void copyIgnoringProperties(Client source, Client target) {
        BeanUtils.copyProperties(source, target,
                "id", "phones", "emails", "createdBy", "createdAt", "lastModifiedBy", "lastModifiedAt");
    }
}

package com.github.brunomottacosta.web.resources;

import com.github.brunomottacosta.data.model.Client;
import com.github.brunomottacosta.data.model.ClientEmail;
import com.github.brunomottacosta.data.model.ClientPhone;
import com.github.brunomottacosta.service.ClientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/clients")
public class ClientResource {

    private final ClientService clientService;

    @Autowired
    public ClientResource(ClientService clientService) {
        this.clientService = clientService;
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @PostMapping
    public ResponseEntity<?> create(@RequestBody @Valid Client client) {
        return ResponseEntity.ok(clientService.create(client));
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable Long id, @RequestBody @Valid Client client) {
        return ResponseEntity.ok(clientService.update(id, client));
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        clientService.delete(id);
        return ResponseEntity.ok().build();
    }

    @PreAuthorize("hasAnyAuthority('ADMIN', 'COMMON')")
    @GetMapping
    public ResponseEntity<?> index() {
        return ResponseEntity.ok(clientService.index());
    }

    @PreAuthorize("hasAnyAuthority('ADMIN', 'COMMON')")
    @GetMapping("/{id}")
    public ResponseEntity<?> show(@PathVariable Long id) {
        return ResponseEntity.ok(clientService.show(id));
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @PostMapping("/{id}/phones")
    public ResponseEntity<?> addPhone(@PathVariable Long id, @RequestBody @Valid ClientPhone phone) {
        return ResponseEntity.ok(clientService.addPhone(id, phone));
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @DeleteMapping("/{id}/phones/{phoneId}")
    public ResponseEntity<?> removePhone(@PathVariable Long id, @PathVariable Long phoneId) {
        return ResponseEntity.ok(clientService.removePhone(id, phoneId));
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @PostMapping("/{id}/emails")
    public ResponseEntity<?> addEmail(@PathVariable Long id, @RequestBody @Valid ClientEmail email) {
        return ResponseEntity.ok(clientService.addEmail(id, email));
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @DeleteMapping("/{id}/emails/{emailId}")
    public ResponseEntity<?> removeEmail(@PathVariable Long id, @PathVariable Long emailId) {
        return ResponseEntity.ok(clientService.removeEmail(id, emailId));
    }
}

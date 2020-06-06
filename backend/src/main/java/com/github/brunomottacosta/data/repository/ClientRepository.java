package com.github.brunomottacosta.data.repository;

import com.github.brunomottacosta.data.model.Client;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ClientRepository extends JpaRepository<Client, Long> {

}

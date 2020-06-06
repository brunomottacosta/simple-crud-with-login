package com.github.brunomottacosta.data.repository;

import com.github.brunomottacosta.data.model.ClientEmail;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmailRepository extends JpaRepository<ClientEmail, Long> {
}

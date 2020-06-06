package com.github.brunomottacosta.data.repository;

import com.github.brunomottacosta.data.model.ClientPhone;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PhoneRepository extends JpaRepository<ClientPhone, Long> {
}

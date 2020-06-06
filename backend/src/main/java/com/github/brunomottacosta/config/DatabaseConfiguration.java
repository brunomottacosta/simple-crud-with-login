package com.github.brunomottacosta.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@Configuration
@EnableJpaRepositories("com.github.brunomottacosta.data.repository")
public class DatabaseConfiguration {

}

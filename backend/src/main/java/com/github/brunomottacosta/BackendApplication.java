package com.github.brunomottacosta;

import com.github.brunomottacosta.config.ApplicationProperties;
import com.github.brunomottacosta.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;

@Slf4j
@SpringBootApplication
@EnableConfigurationProperties({ApplicationProperties.class})
public class BackendApplication {

    private final UserService userService;

    @Autowired
    public BackendApplication(UserService userService) {
        this.userService = userService;
    }

    public static void main(String[] args) {
        SpringApplication.run(BackendApplication.class);
    }

    /* (non-javadocs)
     * Prepare users to authenticate
     */
    @Bean
    public void prepareInitialUsers() {
        userService.prepareInitialUsers();
    }
}

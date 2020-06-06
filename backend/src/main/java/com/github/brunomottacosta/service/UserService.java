package com.github.brunomottacosta.service;

import com.github.brunomottacosta.data.enumeration.Role;
import com.github.brunomottacosta.data.model.User;
import com.github.brunomottacosta.data.repository.UserRepository;
import com.github.brunomottacosta.web.vm.RequestCredentialsVM;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Value("${application.users.admin-user}")
    private String adminUser;
    @Value("${application.users.admin-password}")
    private String adminPassword;
    @Value("${application.users.common-user}")
    private String commonUser;
    @Value("${application.users.common-password}")
    private String commonPassword;

    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;

    @Autowired
    public UserService(
            @Lazy PasswordEncoder passwordEncoder,
            UserRepository userRepository) {
        this.passwordEncoder = passwordEncoder;
        this.userRepository = userRepository;
    }

    public void validateCredentials(User user, RequestCredentialsVM credentials) {
        if (!passwordEncoder.matches(credentials.getPassword(), user.getPassword())) {
            throw new BadCredentialsException("User credentials are invalid");
        }
    }

    public void prepareInitialUsers() {
        if (!userRepository.findByUsername(adminUser).isPresent()) {
            userRepository.save(User.builder()
                    .username(adminUser)
                    .password(passwordEncoder.encode(adminPassword))
                    .role(Role.ADMIN)
                    .enabled(true)
                    .build());
        }
        if (!userRepository.findByUsername(commonUser).isPresent()) {
            userRepository.save(User.builder()
                    .username(commonUser)
                    .password(passwordEncoder.encode(commonPassword))
                    .role(Role.COMMON)
                    .enabled(true)
                    .build());
        }
    }
}

package com.github.brunomottacosta.security.authentication;

import com.github.brunomottacosta.data.model.User;
import com.github.brunomottacosta.data.repository.UserRepository;
import com.github.brunomottacosta.security.jwt.TokenProvider;
import com.github.brunomottacosta.service.UserService;
import com.github.brunomottacosta.web.vm.RequestCredentialsVM;
import org.springframework.lang.NonNull;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.stereotype.Component;

import javax.validation.constraints.NotNull;
import java.util.Collections;

@Component
public class AuthService {

    private final UserRepository userRepository;
    private final UserService userService;
    private final TokenProvider tokenProvider;

    public AuthService(
            UserRepository userRepository,
            UserService userService,
            TokenProvider tokenProvider) {
        this.userRepository = userRepository;
        this.userService = userService;
        this.tokenProvider = tokenProvider;
    }

    /**
     * Authenticates with user credentials.
     *
     * @param credentials the user credentials (basically username and password)
     * @return the authentication object
     * @throws AuthenticationException exception thrown if authentication does not succeed
     */
    public UserPrincipal authenticate(@NonNull RequestCredentialsVM credentials) throws AuthenticationException {
        User user = userRepository
                .findByUsername(credentials.getUsername())
                .orElseThrow(() -> new BadCredentialsException("Username not found"));

        if (!user.isEnabled()) throw new BadCredentialsException("Account not enabled");

        userService.validateCredentials(user, credentials);

        return createUserPrincipal(user);
    }

    /**
     * Authenticates with token (normally retrieved from request headers).
     *
     * @param token the signed token
     * @return the authentication object
     * @throws AuthenticationException exception thrown if authentication does not succeed
     */
    public UserPrincipal authenticate(String token) throws AuthenticationException {
        String username = tokenProvider.getClaimsFromToken(token).getSubject();

        User user = userRepository
                .findByUsername(username)
                .orElseThrow(() -> new BadCredentialsException("Token is invalid"));

        if (!user.isEnabled()) throw new BadCredentialsException("Account not enabled");

        return createUserPrincipal(user);
    }

    private UserPrincipal createUserPrincipal(@NotNull User user) {
        return new UserPrincipal(user, Collections.singletonList(user.getRole()), tokenProvider.generateToken(user));
    }
}

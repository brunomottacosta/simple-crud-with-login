package com.github.brunomottacosta.web.resources;

import com.github.brunomottacosta.security.authentication.AuthService;
import com.github.brunomottacosta.security.authentication.UserPrincipal;
import com.github.brunomottacosta.security.jwt.TokenProvider;
import com.github.brunomottacosta.web.vm.RequestCredentialsVM;
import com.github.brunomottacosta.web.vm.ResponseCredentialsVM;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/auth")
public class AuthResource {

    private final AuthService authService;
    private final TokenProvider tokenProvider;

    @Autowired
    public AuthResource(AuthService authService, TokenProvider tokenProvider) {
        this.authService = authService;
        this.tokenProvider = tokenProvider;
    }

    @PostMapping
    public ResponseEntity<?> authenticate(@Valid @RequestBody RequestCredentialsVM credentials) {
        final UserPrincipal principal = authService.authenticate(credentials);
        return ResponseEntity
                .ok(ResponseCredentialsVM.builder()
                        .token(principal.getToken())
                        .claims(tokenProvider.getClaimsFromToken(principal.getToken()))
                        .build());
    }
}

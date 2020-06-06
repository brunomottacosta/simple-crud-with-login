package com.github.brunomottacosta.security.jwt;

import com.github.brunomottacosta.security.authentication.UserPrincipal;
import lombok.Builder;
import org.springframework.security.authentication.AbstractAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;


public class JwtAuthentication extends AbstractAuthenticationToken {

    private final UserPrincipal user;

    @Builder
    public JwtAuthentication(UserPrincipal user) {
        super(user.getAuthorities());
        this.setAuthenticated(true);
        this.user = user;
    }

    @Override
    public Object getCredentials() {
        return user.getToken();
    }

    @Override
    public UserDetails getPrincipal() {
        return user;
    }
}

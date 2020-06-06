package com.github.brunomottacosta.security.authentication;

import com.github.brunomottacosta.data.model.User;
import lombok.Getter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.List;

public class UserPrincipal implements UserDetails {

    @Getter
    private final User user;

    @Getter
    private final List<? extends GrantedAuthority> authorities;

    @Getter
    private final String token;

    public UserPrincipal(User user, List<? extends GrantedAuthority> authorities, String token) {
        this.user = user;
        this.authorities = authorities;
        this.token = token;
    }

    @Override
    public String getUsername() {
        return user.getUsername();
    }

    @Override
    public String getPassword() {
        return user.getPassword();
    }

    @Override
    public boolean isAccountNonExpired() {
        return false;
    }

    @Override
    public boolean isAccountNonLocked() {
        return false;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return false;
    }

    @Override
    public boolean isEnabled() {
        return user.isEnabled();
    }
}

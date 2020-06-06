package com.github.brunomottacosta.data.enumeration;

import lombok.Getter;
import org.springframework.security.core.GrantedAuthority;

import java.util.Arrays;
import java.util.List;

public enum Role implements GrantedAuthority {

    ADMIN("ROLE_ADMIN", "Admin"),
    COMMON("ROLE_COMMON", "Common");

    Role(String key, String name) {
        this.key = key;
        this.name = name;
    }

    @Getter
    private final String key;

    @Getter
    private final String name;

    @Override
    public String getAuthority() {
        return this.name();
    }

    public static List<Role> list() {
        return Arrays.asList(Role.values());
    }
}

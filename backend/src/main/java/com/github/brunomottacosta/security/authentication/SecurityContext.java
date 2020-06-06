package com.github.brunomottacosta.security.authentication;

import com.github.brunomottacosta.data.enumeration.Role;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class SecurityContext {

    public static UserPrincipal getUserPrincipal() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null
                && authentication.getPrincipal() != null
                && authentication.getPrincipal() instanceof UserPrincipal) {
            return (UserPrincipal) authentication.getPrincipal();
        } else {
            return null;
        }
    }

    public static boolean hasRole(Role role) {
        UserPrincipal userPrincipal = getUserPrincipal();
        return userPrincipal != null && userPrincipal.getAuthorities().stream()
                .anyMatch(a -> a.getAuthority().equals(role.getAuthority()));
    }

    @SuppressWarnings("unchecked")
    public static <T> T getUserPrincipalAs() {
        return (T) getUserPrincipal();
    }

}

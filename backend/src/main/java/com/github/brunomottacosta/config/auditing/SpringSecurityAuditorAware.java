package com.github.brunomottacosta.config.auditing;

import com.github.brunomottacosta.security.authentication.SecurityContext;
import com.github.brunomottacosta.security.authentication.UserPrincipal;
import org.springframework.data.domain.AuditorAware;

import java.util.Optional;

@SuppressWarnings("NullableProblems")
public class SpringSecurityAuditorAware implements AuditorAware<String> {

    @Override
    public Optional<String> getCurrentAuditor() {
        UserPrincipal principal = SecurityContext.getUserPrincipal();
        if (principal != null && principal.getUsername() != null) {
            return Optional.of(principal.getUsername());
        }
        return Optional.of("unknown");
    }

}

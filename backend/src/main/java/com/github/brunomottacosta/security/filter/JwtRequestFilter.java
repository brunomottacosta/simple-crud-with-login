package com.github.brunomottacosta.security.filter;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.github.brunomottacosta.security.authentication.AuthService;
import com.github.brunomottacosta.security.authentication.UserPrincipal;
import com.github.brunomottacosta.security.jwt.JwtAuthentication;
import com.github.brunomottacosta.web.problems.ErrorResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.lang.NonNull;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.time.Instant;

@Slf4j
@Component
public class JwtRequestFilter extends OncePerRequestFilter {

    private final AuthService authService;
    private final ObjectMapper objectMapper;

    public JwtRequestFilter(AuthService authService, ObjectMapper objectMapper) {
        this.authService = authService;
        this.objectMapper = objectMapper;
    }

    @Override
    protected void doFilterInternal(
            @NonNull HttpServletRequest request,
            @NonNull HttpServletResponse response,
            @NonNull FilterChain chain) throws ServletException, IOException {

        String jwt = resolveToken(request);

        if (StringUtils.hasText(jwt)) {
            try {
                UserPrincipal principal = authService.authenticate(jwt);
                JwtAuthentication authentication = JwtAuthentication.builder().user(principal).build();
                SecurityContextHolder.getContext().setAuthentication(authentication);
                response.addHeader("Renew-JWT", principal.getToken());
            } catch (BadCredentialsException ex) {
                response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                response.setContentType(MediaType.APPLICATION_JSON_VALUE);
                response.getWriter().write(
                        objectMapper.writeValueAsString(
                                ErrorResponse.builder()
                                        .timestamp(Instant.now())
                                        .status(HttpStatus.UNAUTHORIZED.value())
                                        .error(HttpStatus.UNAUTHORIZED.getReasonPhrase())
                                        .message(ex.getMessage())
                                        .build()));
                response.getWriter().flush();
                response.getWriter().close();
                return;
            }
        }

        chain.doFilter(request, response);
    }

    private String resolveToken(HttpServletRequest request) {
        String bearerToken = request.getHeader("Authorization");
        if (StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7);
        }
        return null;
    }
}

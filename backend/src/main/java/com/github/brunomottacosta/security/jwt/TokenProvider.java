package com.github.brunomottacosta.security.jwt;

import com.github.brunomottacosta.data.model.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.stereotype.Component;

import java.util.Date;

@Slf4j
@Component
public class TokenProvider {

    private static final String AUTHORITIES_KEY = "authorities";

    @Value("${spring.application.name}")
    private String applicationName;

    @Value("${application.security.jwt-secret}")
    private String jwtSecret;

    @Value("${application.security.token-validity}")
    private long tokenValidity;

    /**
     * Generates jwt token setting claims from user.
     *
     * @param user the user
     * @return the jwt signed token
     */
    public String generateToken(User user) {
        final String authorities = user.getRole().name();

        return Jwts.builder()
                .setIssuer(applicationName)
                .setSubject(user.getUsername())
                .claim(AUTHORITIES_KEY, authorities)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + tokenValidity * 1000))
                .signWith(SignatureAlgorithm.HS512, jwtSecret)
                .compact();
    }

    public Claims getClaimsFromToken(String jwtToken) {
        try {
            return Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(jwtToken).getBody();
        } catch (JwtException e) {
            log.warn("Invalid JWT: {}", e.getMessage());
            throw new BadCredentialsException("Token is invalid");
        }
    }
}

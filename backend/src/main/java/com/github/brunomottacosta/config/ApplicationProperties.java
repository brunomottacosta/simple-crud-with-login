package com.github.brunomottacosta.config;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.web.cors.CorsConfiguration;

@Getter
@Setter
@ConfigurationProperties(prefix = "application")
public class ApplicationProperties {

    private String defaultTimezone;
    private DefaultLocale defaultLocale = new DefaultLocale();
    private CorsConfiguration cors = new CorsConfiguration();

    @Getter
    @Setter
    public static class DefaultLocale {
        private String country;
        private String language;

        public DefaultLocale() {
        }
    }

}

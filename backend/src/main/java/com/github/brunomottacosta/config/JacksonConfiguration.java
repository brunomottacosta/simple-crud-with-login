package com.github.brunomottacosta.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import org.apache.commons.lang3.LocaleUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class JacksonConfiguration {

    @Value("${application.default-locale.language}")
    private String language;
    @Value("${application.default-locale.country}")
    private String country;

    @Bean
    public ObjectMapper objectMapper() {
        return new ObjectMapper()
                .setLocale(LocaleUtils.toLocale(language + "_" + country))
                .registerModule(new JavaTimeModule())
                .configure(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS, false);
    }
}

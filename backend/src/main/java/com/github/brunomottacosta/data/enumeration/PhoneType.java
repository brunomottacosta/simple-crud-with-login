package com.github.brunomottacosta.data.enumeration;

import lombok.Getter;

import java.util.Arrays;
import java.util.List;

public enum PhoneType {
    HOME("Residencial"),
    ENTERPRISE("Comercial"),
    CELLPHONE("Celular");

    PhoneType(String name) {
        this.name = name;
    }

    @Getter
    private final String name;

    public static List<PhoneType> list() {
        return Arrays.asList(PhoneType.values());
    }
}

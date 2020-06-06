package com.github.brunomottacosta.web.problems.exceptions;

public class BadRequestException extends RuntimeException {

    private String error;

    public BadRequestException(String error, String message) {
        super(message);
        this.error = error;
    }

    public BadRequestException(String message) {
        super(message);
    }

    public String getError() {
        return error;
    }
}

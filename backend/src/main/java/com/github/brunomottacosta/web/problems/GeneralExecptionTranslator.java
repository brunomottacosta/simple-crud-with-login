package com.github.brunomottacosta.web.problems;

import com.github.brunomottacosta.web.problems.exceptions.BadRequestException;
import com.github.brunomottacosta.web.problems.exceptions.EntityAttributeNotAvailableException;
import com.github.brunomottacosta.web.problems.exceptions.ResourceNotFoundException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.time.Instant;

@Slf4j
@RestControllerAdvice
public class GeneralExecptionTranslator extends ResponseEntityExceptionHandler {

    @ExceptionHandler(value = {BadRequestException.class})
    public ResponseEntity<?> handleBadRequestException(BadRequestException ex, WebRequest request) {
        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(ErrorResponse.builder()
                        .status(HttpStatus.BAD_REQUEST.value())
                        .timestamp(Instant.now())
                        .error(ex.getError())
                        .message(ex.getMessage())
                        .build());
    }

    @ExceptionHandler(value = {ResourceNotFoundException.class})
    public ResponseEntity<?> handleResourceNotFoundException(ResourceNotFoundException ex, WebRequest request) {
        return ResponseEntity
                .status(HttpStatus.NOT_FOUND)
                .body(ErrorResponse.builder()
                        .status(HttpStatus.NOT_FOUND.value())
                        .timestamp(Instant.now())
                        .error(ex.getClass().getName())
                        .message(ex.getMessage())
                        .build());
    }

    @ExceptionHandler(value = {EntityAttributeNotAvailableException.class})
    public ResponseEntity<?> handleEntityAttributeNotAvailableException(EntityAttributeNotAvailableException ex, WebRequest request) {
        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(ErrorResponse.builder()
                        .status(HttpStatus.BAD_REQUEST.value())
                        .timestamp(Instant.now())
                        .error(ex.getClass().getName())
                        .message(ex.getMessage())
                        .build());
    }
}

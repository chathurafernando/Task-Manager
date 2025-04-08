package com.example.task_manager.exception;

import com.example.task_manager.model.ResponseMessage;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    // Handle TaskNotFoundException
    @ExceptionHandler(TaskNotFoundException.class)
    public ResponseEntity<ResponseMessage> handleTaskNotFoundException(TaskNotFoundException ex) {
        ResponseMessage response = new ResponseMessage("Task Not Found", ex.getMessage());
        return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
    }

    // Handle InvalidTaskException
    @ExceptionHandler(InvalidTaskException.class)
    public ResponseEntity<ResponseMessage> handleInvalidTaskException(InvalidTaskException ex) {
        ResponseMessage response = new ResponseMessage("Invalid Task", ex.getMessage());
        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }

    // Handle any general runtime exception
    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<ResponseMessage> handleRuntimeException(RuntimeException ex) {
        ResponseMessage response = new ResponseMessage("Error", ex.getMessage());
        return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    // Handle all other generic exceptions
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ResponseMessage> handleException(Exception ex) {
        ResponseMessage response = new ResponseMessage("Unexpected Error", ex.getMessage());
        return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}

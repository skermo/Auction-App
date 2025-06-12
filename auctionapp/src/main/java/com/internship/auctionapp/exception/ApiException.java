package com.internship.auctionapp.exception;

public class ApiException extends RuntimeException {

    private final String message;

    public ApiException(String message) {
        this.message = message;
    }

    @Override
    public String getMessage() {
        return message;
    }
}
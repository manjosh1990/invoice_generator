package com.manjosh.labs.invoicegeneratorapi.domain.models;

public record AppUser(String username,
                      String email,
                      String firstName,
                      String lastName,
                      String photoUrl
) {
}

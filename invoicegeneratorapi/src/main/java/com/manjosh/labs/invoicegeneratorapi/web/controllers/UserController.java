package com.manjosh.labs.invoicegeneratorapi.web.controllers;

import com.manjosh.labs.invoicegeneratorapi.domain.UserService;
import com.manjosh.labs.invoicegeneratorapi.domain.entity.UserEntity;
import com.manjosh.labs.invoicegeneratorapi.domain.models.AppUser;
import com.manjosh.labs.invoicegeneratorapi.web.exceptions.ServiceException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

  private final UserService userService;

  @ResponseStatus(HttpStatus.CREATED)
  @PostMapping
  private UserEntity createOrUpdateUser(
          @RequestBody AppUser user, Authentication authentication) {
    try {
      String userId = authentication.getName();
      String userName =
          ((JwtAuthenticationToken) authentication)
              .getToken()
              .getClaims()
              .get("preferred_username")
              .toString();
      if (userId == null || !userName.equals(user.username())) {
        throw new ResponseStatusException(
            HttpStatus.FORBIDDEN, "User ID does not match the authenticated user");
      }
      return userService.saveOrUpdateUser(user);
    } catch (Exception e) {
      throw new ServiceException("unable to persist user",e);
    }
  }
}

package com.manjosh.labs.invoicegeneratorapi.domain;

import com.manjosh.labs.invoicegeneratorapi.domain.entity.UserEntity;
import com.manjosh.labs.invoicegeneratorapi.domain.models.AppUser;
import org.springframework.lang.Nullable;

public final class AppUserMapper {

  private AppUserMapper() {
    // Prevent instantiation
  }

  @Nullable
  public static UserEntity toEntity(@Nullable AppUser user) {
    if (user == null) {
      return null;
    }
    return UserEntity.builder()
        .username(user.username())
        .email(user.email())
        .firstName(user.firstName())
        .lastName(user.lastName())
        .photoUrl(user.photoUrl())
        .build();
  }

  @Nullable
  public static AppUser fromEntity(@Nullable UserEntity entity) {
    if (entity == null) {
      return null;
    }

    return new AppUser(
        entity.getUsername(),
        entity.getEmail(),
        entity.getFirstName(),
        entity.getLastName(),
        entity.getPhotoUrl());
  }
}

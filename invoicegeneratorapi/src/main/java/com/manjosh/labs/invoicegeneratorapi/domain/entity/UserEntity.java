package com.manjosh.labs.invoicegeneratorapi.domain.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;

@Data
@Document(collection = "users")
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserEntity {
  @Id private String id;
  private String username;
  private String email;
  private String firstName;
  private String lastName;
  private String photoUrl;
  @CreatedDate private Instant createdAt;
}

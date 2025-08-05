package com.manjosh.labs.invoicegeneratorapi.domain;

import com.manjosh.labs.invoicegeneratorapi.domain.entity.UserEntity;
import java.util.Optional;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserRepository extends MongoRepository<UserEntity, String> {
  Optional<UserEntity> findByUsername(String username);

  boolean existsById(String id);
}

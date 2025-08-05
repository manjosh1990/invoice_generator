package com.manjosh.labs.invoicegeneratorapi.domain;

import com.manjosh.labs.invoicegeneratorapi.domain.entity.UserEntity;
import com.manjosh.labs.invoicegeneratorapi.domain.models.AppUser;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class UserService {

  private final UserRepository userRepository;

  public UserEntity getUserById(String id) {
    return userRepository
        .findById(id)
        .orElseThrow(() -> new RuntimeException("User not found with id: " + id));
  }

  public UserEntity saveOrUpdateUser(AppUser AppUser) {
    UserEntity user = AppUserMapper.toEntity(AppUser);
    Optional<UserEntity> userOptional = userRepository.findByUsername(user.getUsername());
    if (userOptional.isPresent()) {
      UserEntity existingUser = userOptional.get();
      existingUser.setEmail(user.getEmail());
      existingUser.setFirstName(user.getFirstName());
      existingUser.setLastName(user.getLastName());
      existingUser.setPhotoUrl(user.getPhotoUrl());
      return userRepository.save(existingUser);
    }
    return userRepository.save(user);
  }

  public void deleteUser(String id) {
    if (!userRepository.existsById(id)) {
      throw new RuntimeException("User not found with id: " + id);
    }
    userRepository.deleteById(id);
  }
}

package com.manjosh.labs.invoicegeneratorapi.domain;

import com.manjosh.labs.invoicegeneratorapi.domain.entity.InvoiceEntity;
import java.util.List;
import java.util.Optional;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface InvoiceRepository extends MongoRepository<InvoiceEntity, String> {
  // Custom query methods can be defined here if needed
  List<InvoiceEntity> findByKeycloakId(String id);

  Optional<InvoiceEntity> findByKeycloakIdAndId(String keycloakId, String id);
}

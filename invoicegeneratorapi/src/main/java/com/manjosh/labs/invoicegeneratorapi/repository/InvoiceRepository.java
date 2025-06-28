package com.manjosh.labs.invoicegeneratorapi.repository;

import com.manjosh.labs.invoicegeneratorapi.entity.Invoice;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface InvoiceRepository extends MongoRepository<Invoice, String> {
    // Custom query methods can be defined here if needed
}

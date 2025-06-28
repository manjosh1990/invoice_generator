package com.manjosh.labs.invoicegeneratorapi.entity;

import com.manjosh.labs.invoicegeneratorapi.entity.domain.Billing;
import com.manjosh.labs.invoicegeneratorapi.entity.domain.Company;
import com.manjosh.labs.invoicegeneratorapi.entity.domain.InvoiceDetails;
import com.manjosh.labs.invoicegeneratorapi.entity.domain.Item;
import com.manjosh.labs.invoicegeneratorapi.entity.domain.Shipping;
import lombok.Data;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;
import java.util.List;

@Data
@Document(collection = "invoices")
public class Invoice {

    @Id
    private String id;

    private Company company;
    private Billing billing;
    private Shipping shipping;
    private InvoiceDetails invoice;
    private List<Item> items;
    private String notes;
    private String logo;
    private Double tax;
    @CreatedDate
    private Instant createdAt;
    @LastModifiedDate
    private Instant lastUpdatedAt;
    private String thumbnailUrl;
    private String template;
    private String title;
}

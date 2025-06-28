package com.manjosh.labs.invoicegeneratorapi.domain.entity;

import com.manjosh.labs.invoicegeneratorapi.domain.models.Billing;
import com.manjosh.labs.invoicegeneratorapi.domain.models.Company;
import com.manjosh.labs.invoicegeneratorapi.domain.models.InvoiceDetails;
import com.manjosh.labs.invoicegeneratorapi.domain.models.Item;
import com.manjosh.labs.invoicegeneratorapi.domain.models.Shipping;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "invoices")
public class InvoiceEntity {
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

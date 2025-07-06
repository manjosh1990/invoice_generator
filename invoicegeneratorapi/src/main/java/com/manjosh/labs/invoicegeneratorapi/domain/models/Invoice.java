package com.manjosh.labs.invoicegeneratorapi.domain.models;

import java.time.Instant;
import java.util.List;

public record Invoice(
    String id,
    Company companyInfo,
    Billing billing,
    Shipping shipping,
    Account account,
    InvoiceDetails invoice,
    List<Item> items,
    String notes,
    String logo,
    Double tax,
    String thumbnailUrl,
    String template,
    String title,
    Instant createdAt,
    Instant lastUpdatedAt) {}

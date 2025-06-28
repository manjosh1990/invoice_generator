package com.manjosh.labs.invoicegeneratorapi.domain.models;

import java.util.List;

public record Invoice(
        Company company,
        Billing billing,
        Shipping shipping,
        InvoiceDetails invoice,
        List<Item> items,
        String notes,
        String logo,
        Double tax,
        String thumbnailUrl,
        String template,
        String title
) {
}
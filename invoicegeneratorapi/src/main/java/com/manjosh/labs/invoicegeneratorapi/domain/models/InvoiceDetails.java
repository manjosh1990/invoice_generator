package com.manjosh.labs.invoicegeneratorapi.domain.models;

import lombok.Data;

@Data
public class InvoiceDetails {
    private String invoiceNumber;
    private String date;
    private String dueDate;
}

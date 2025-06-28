package com.manjosh.labs.invoicegeneratorapi.entity.domain;

import lombok.Data;

@Data
public class InvoiceDetails {
    private String invoiceNumber;
    private String date;
    private String dueDate;
}

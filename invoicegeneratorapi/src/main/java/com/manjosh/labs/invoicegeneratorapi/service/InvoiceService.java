package com.manjosh.labs.invoicegeneratorapi.service;

import com.manjosh.labs.invoicegeneratorapi.entity.Invoice;
import com.manjosh.labs.invoicegeneratorapi.repository.InvoiceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class InvoiceService {
    private final InvoiceRepository invoiceRepository;

    public Invoice saveInvoice(Invoice invoice) {
        return invoiceRepository.save(invoice);
    }
}

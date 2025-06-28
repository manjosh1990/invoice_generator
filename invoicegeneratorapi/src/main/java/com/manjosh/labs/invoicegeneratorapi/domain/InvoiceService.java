package com.manjosh.labs.invoicegeneratorapi.domain;

import com.manjosh.labs.invoicegeneratorapi.domain.entity.InvoiceEntity;
import com.manjosh.labs.invoicegeneratorapi.domain.models.Invoice;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class InvoiceService {
    private final InvoiceRepository invoiceRepository;

    public Invoice saveInvoice(Invoice invoice) {
       final InvoiceEntity invoiceEntity = InvoiceMapper.toEntity(invoice);
        if (invoiceEntity == null) {
            throw new IllegalArgumentException("Invoice cannot be null");
        }
        final InvoiceEntity savedInvoice = invoiceRepository.save(invoiceEntity);
        return InvoiceMapper.fromEntity(savedInvoice);
    }
}

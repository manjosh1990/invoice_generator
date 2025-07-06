package com.manjosh.labs.invoicegeneratorapi.domain;

import com.manjosh.labs.invoicegeneratorapi.domain.entity.InvoiceEntity;
import com.manjosh.labs.invoicegeneratorapi.domain.models.Invoice;
import com.manjosh.labs.invoicegeneratorapi.web.exceptions.ServiceException;
import java.util.List;
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

  public List<Invoice> getAllInvoices() {
    List<InvoiceEntity> invoiceEntities = invoiceRepository.findAll();
    return InvoiceMapper.fromEntities(invoiceEntities);
  }

  public void removeInvoice(String id) {
    if (id == null || id.isEmpty()) {
      throw new IllegalArgumentException("Invoice ID cannot be null or empty");
    }

    // Verify invoice exists before deletion
    if (!invoiceRepository.existsById(id)) {
      throw new ServiceException("Invoice not found with id: " + id);
    }

    try {
      invoiceRepository.deleteById(id);
    } catch (Exception e) {
      throw new ServiceException("Failed to delete invoice with id: " + id, e);
    }
  }
}

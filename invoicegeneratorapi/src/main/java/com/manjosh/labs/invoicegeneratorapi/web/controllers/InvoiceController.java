package com.manjosh.labs.invoicegeneratorapi.web.controllers;

import com.manjosh.labs.invoicegeneratorapi.domain.InvoiceService;
import com.manjosh.labs.invoicegeneratorapi.domain.models.Invoice;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/invoices")
@CrossOrigin("*")
public class InvoiceController {

  private final InvoiceService invoiceService;

  @PostMapping
  public ResponseEntity<Invoice> invoice(@RequestBody Invoice invoice) {
    Invoice savedInvoice = invoiceService.saveInvoice(invoice);
    return ResponseEntity.ok(savedInvoice);
  }

  @GetMapping
  public ResponseEntity<Iterable<Invoice>> getInvoices() {
    Iterable<Invoice> invoices = invoiceService.getAllInvoices();
    return ResponseEntity.ok(invoices);
  }
}

package com.manjosh.labs.invoicegeneratorapi.web.controllers;

import com.manjosh.labs.invoicegeneratorapi.domain.InvoiceService;
import com.manjosh.labs.invoicegeneratorapi.domain.models.Invoice;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/invoices")
public class InvoiceController {

  private final InvoiceService invoiceService;

  @PostMapping
  public ResponseEntity<Invoice> invoice(
      @RequestBody Invoice invoice, Authentication authentication) {
    String keycloakId = authentication.getName();
    Invoice savedInvoice = invoiceService.saveInvoice(invoice,keycloakId);
    return ResponseEntity.ok(savedInvoice);
  }

  @GetMapping
  public ResponseEntity<Iterable<Invoice>> getInvoices(Authentication authentication) {
    Iterable<Invoice> invoices = invoiceService.getAllInvoices(authentication.getName());
    return ResponseEntity.ok(invoices);
  }

  @DeleteMapping("{id}")
  public ResponseEntity<Void> deleteInvoice(
      @PathVariable String id, Authentication authentication) {
    if (authentication.getName() != null)
      invoiceService.removeInvoice(id, authentication.getName());
    else throw new ResponseStatusException(HttpStatus.FORBIDDEN, "User not authenticated");
    return ResponseEntity.noContent().build();
  }
}

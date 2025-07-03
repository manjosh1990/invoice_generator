package com.manjosh.labs.invoicegeneratorapi.web.controllers;


import com.fasterxml.jackson.databind.ObjectMapper;
import com.manjosh.labs.invoicegeneratorapi.AbstractBaseIntegrationTest;
import com.manjosh.labs.invoicegeneratorapi.domain.InvoiceRepository;
import com.manjosh.labs.invoicegeneratorapi.domain.models.*;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@AutoConfigureMockMvc
class InvoiceControllerIntegrationTest extends AbstractBaseIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private InvoiceRepository invoiceRepository;

    @BeforeEach
    void setUp() {
        invoiceRepository.deleteAll();
    }

    @Test
    void shouldCreateInvoiceSuccessfully() throws Exception {
        // given
        Company company = new Company();
        company.setName("Test Company");
        company.setAddress("123 Test St");
        company.setPhoneNumber("123-456-7890");

        Billing billing = new Billing();
        billing.setName("John Doe");
        billing.setAddress("456 Billing St");

        Shipping shipping = new Shipping();
        shipping.setName("Jane Doe");
        shipping.setAddress("789 Shipping St");

        InvoiceDetails invoiceDetails = new InvoiceDetails();
        invoiceDetails.setInvoiceNumber("INV-001");
        invoiceDetails.setDate("2025-06-29");

        Item item = new Item();
        item.setDescription("Test Item");
        item.setQuantity(1);
        item.setPrice(100.0);

        Invoice invoice = new Invoice(
                company,
                billing,
                shipping,
                invoiceDetails,
                List.of(item),
                "Test Notes",
                "logo.png",
                10.0,
                "thumbnail.png",
                "default",
                "Test Invoice"
        );

        // when & then
        mockMvc.perform(post("/api/invoices")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(invoice)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.company.name").value("Test Company"))
                .andExpect(jsonPath("$.billing.name").value("John Doe"))
                .andExpect(jsonPath("$.shipping.name").value("Jane Doe"))
                .andExpect(jsonPath("$.invoice.invoiceNumber").value("INV-001"))
                .andExpect(jsonPath("$.items[0].description").value("Test Item"))
                .andExpect(jsonPath("$.tax").value(10.0));
    }
}
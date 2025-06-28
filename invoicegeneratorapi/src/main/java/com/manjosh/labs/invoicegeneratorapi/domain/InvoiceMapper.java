package com.manjosh.labs.invoicegeneratorapi.domain;

import com.manjosh.labs.invoicegeneratorapi.domain.entity.InvoiceEntity;
import com.manjosh.labs.invoicegeneratorapi.domain.models.Invoice;

import org.springframework.lang.Nullable;

public final class InvoiceMapper {

    private InvoiceMapper() {
        // Prevent instantiation
    }

    @Nullable
    public static InvoiceEntity toEntity(@Nullable Invoice invoice) {
        if (invoice == null) {
            return null;
        }
        return InvoiceEntity.builder()
                .company(invoice.company())
                .billing(invoice.billing())
                .shipping(invoice.shipping())
                .invoice(invoice.invoice())
                .items(invoice.items())
                .notes(invoice.notes())
                .logo(invoice.logo())
                .tax(invoice.tax())
                .thumbnailUrl(invoice.thumbnailUrl())
                .template(invoice.template())
                .title(invoice.title())
                .build();
    }

    @Nullable
    public static Invoice fromEntity(@Nullable InvoiceEntity entity) {
        if (entity == null) {
            return null;
        }

        return new Invoice(
                entity.getCompany(),
                entity.getBilling(),
                entity.getShipping(),
                entity.getInvoice(),
                entity.getItems(),
                entity.getNotes(),
                entity.getLogo(),
                entity.getTax(),
                entity.getThumbnailUrl(),
                entity.getTemplate(),
                entity.getTitle()
        );
    }
}

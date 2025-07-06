export const formatInvoiceData = (invoiceData) => {
    const {
        title,
        companyInfo = {},
        invoice = {},
        billing = {},
        shipping = {},
        account = {},
        tax = 0,
        notes = '',
        items = [],
        logo = ""
    } = invoiceData || {};

    const currency = "₹"
    const subtotal = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    const taxAmount = (subtotal * tax) / 100;
    const total = subtotal + taxAmount;

    return {
        title,
        companyName: companyInfo.companyName || '',
        companyAddress: companyInfo.companyAddress || '',
        companyPhone: companyInfo.companyPhone || '',
        companyLogo: logo || '',

        invoiceNumber: invoice.invoiceNumber || '',
        invoiceDate: invoice.invoiceDate || '',
        paymentDate: invoice.dueDate || '',

        billingName: billing.name || '',
        billingAddress: billing.address || '',
        billingPhone: billing.phone || '',

        shippingName: shipping.name || '',
        shippingAddress: shipping.address || '',
        shippingPhone: shipping.phone || '',

        accountName: account.accountName || '',
        accountNumber: account.accountNumber || '',
        accountIfscCode: account.ifscCode || '',

        tax,
        notes,
        items,
        logo,
        currency,
        subtotal,
        taxAmount,
        total
    }
}

export const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: '2-digit'
    });
}
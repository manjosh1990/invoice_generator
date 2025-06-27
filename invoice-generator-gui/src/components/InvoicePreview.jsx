import {forwardRef} from "react";

const InvoicePreview = forwardRef(({invoiceData,template }, ref) => {
    return(
        <div ref={ref}
        className="invoice-preview container px-2 py-2 overflow-auto"
        >
            Render the pdf here
        </div>
    )
});
export default InvoicePreview;
import {forwardRef} from "react";
import {formatInvoiceData} from "../utils/formatInvoiceData.js";
import {templateComponents} from "../utils/InvoiceTemplates.js";

const InvoicePreview = forwardRef(({invoiceData, template}, ref) => {

    const formattedData = formatInvoiceData(invoiceData)
    const SelectedTemplate =
        templateComponents[template] || templateComponents["template1"];
    console.log(template);
    return (
        <div ref={ref}
             className="invoice-preview container px-2 py-2 overflow-auto"
        >
            <SelectedTemplate data={formattedData}/>
        </div>
    )
});
export default InvoicePreview;
import {createContext, useState} from "react";

export const AppContext = createContext();

export const initialInvoiceData = {
    title: "New Invoice",
    billing: {
        name: "",
        phone: "",
        address: ""
    },
    shipping: {
        name: "",
        phone: "",
        address: ""
    },
    invoice :{
        invoiceNumber: "",
        invoiceDate: "",
        dueDate: ""
    },
    account : {
        accountName: "",
        accountNumber: "",
        ifscCode: "",
    },
    companyInfo: {
        companyName: "",
        companyPhone: "",
        companyAddress: ""
    },
    tax: 0,
    notes: "",
    items: [
        {name: "", quantity: 0, price: 0, total: 0, description: ""},
    ],
    logo:""
}
export const AppContextProvider = ({children}) => {

    const [invoiceTitle, setInvoiceTitle] = useState("New Invoice");
    const [invoiceData, setInvoiceData] = useState(initialInvoiceData);
    const [selectedTemplate, setSelectedTemplate] = useState("template1");

    const contextValue = {
        invoiceTitle,
        setInvoiceTitle,
        invoiceData,
        setInvoiceData,
        selectedTemplate,
        setSelectedTemplate,
        initialInvoiceData
    };

    return (
        <AppContext.Provider value={contextValue}>
            {children}
        </AppContext.Provider>
    );
}
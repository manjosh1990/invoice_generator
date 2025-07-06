import axios from 'axios';
export const saveInvoice = async (baseUrl,payLoad) => {
    return axios.post(`${baseUrl}/invoices`,payLoad);
}

export const getInvoices = async (baseUrl) => {
    return axios.get(`${baseUrl}/invoices`);
}

export const deleteInvoice = async (baseUrl, invoiceId) => {
    return axios.delete(`${baseUrl}/invoices/${invoiceId}`);
}
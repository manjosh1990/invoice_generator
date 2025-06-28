import axios from 'axios';
export const saveInvoice = async (baseUrl,payLoad) => {
    return axios.post(`${baseUrl}/invoices`,payLoad);
}
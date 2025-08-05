import axios from 'axios';
export const saveInvoice = async (baseUrl,payLoad,token) => {
    return axios.post(`${baseUrl}/invoices`,payLoad,{
        headers: {
            'Authorization': `Bearer ${token}`,
        }
    });
}

export const getInvoices = async (baseUrl,token) => {
    return axios.get(`${baseUrl}/invoices`,{
        headers: {
            'Authorization': `Bearer ${token}`,
        }
    });
}

export const deleteInvoice = async (baseUrl, invoiceId,token) => {
    return axios.delete(`${baseUrl}/invoices/${invoiceId}`,{
        headers: {
            'Authorization': `Bearer ${token}`,
        }
    });
}
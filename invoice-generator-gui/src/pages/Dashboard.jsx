import {useContext, useEffect, useState} from "react";
import {getInvoices} from "../service/invoiceService.js";
import {AppContext, initialInvoiceData} from "../context/AppContext.jsx";
import toast from "react-hot-toast";
import {Plus} from "lucide-react";
import {formatDate} from "../utils/formatInvoiceData.js";
import {useNavigate} from "react-router-dom";


const Dashboard = () => {

    const [invoices, setInvoices] = useState([]);
    const {
        baseUrl, setInvoiceData,
        setInvoiceTitle, setSelectedTemplate
    } = useContext(AppContext);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchInvoices = async () => {
            try {
                const response = await getInvoices(baseUrl);
                setInvoices(response.data);
            } catch (error) {
                console.error("Error fetching invoices:", error);
                toast.error("Error fetching invoices.", error.message)
            }
        };
        fetchInvoices();
    }, [baseUrl]);

    const handleViewClick = (invoice) =>{
        setInvoiceData(invoice);
        setSelectedTemplate(invoice.template || "template1");
        setInvoiceTitle(invoice.title || "New Invoice");
        navigate("/preview");
    }

    const handleCreateNew = () => {
        // Reset invoice data for a new invoice
        setInvoiceTitle("New Invoice");
        setSelectedTemplate("template1");
        setInvoiceData(initialInvoiceData);
        navigate("/generate");
    }
    return (
        <div className="container py-5">
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-5 g-4">
                {/*create new invoice card*/}
                <div className="col">
                    <div
                        onClick={handleCreateNew}
                        className="card h-100 d-flex justify-content-center align-items-center border border-2 border-light shadow-sm cursor-pointer"
                        style={{minHeight: "270px"}}>
                        <Plus size={48}/>
                        <p className="mt-3 fw-medium">Create New Invoice</p>
                    </div>
                </div>
                {/*render existing invoice*/}
                {invoices.map((invoice, idx) => (
                    <div className="col" key={idx}>
                        <div className="card h-100 shadow-sm cursor-pointer" style={{minHeight: '270px'}}
                        onClick={() => handleViewClick(invoice)}>
                            {
                                invoice.thumbnailUrl && (
                                    <img src={invoice.thumbnailUrl} className="card-img-top" alt="Invoice Thumbnail"
                                         style={{height: '200px', objectFit: 'cover'}}
                                    />
                                )
                            }
                            <div className="card-body">
                                <h6 className="card-title mb-1">{invoice.title}</h6>
                                <small className="text-muted">
                                    Last Updated: {formatDate(invoice.lastUpdatedAt)}
                                </small>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Dashboard;
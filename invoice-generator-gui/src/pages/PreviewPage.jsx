import {useContext, useRef} from "react";
import {templates} from "../assets/assets.js";
import {AppContext} from "../context/AppContext.jsx";
import InvoicePreview from "../components/InvoicePreview.jsx";
import {useNavigate} from "react-router-dom";

const PreviewPage = () => {
    const {
        selectedTemplate,
        setSelectedTemplate,
        invoiceData
    } = useContext(AppContext);
    const previewRef = useRef();
    const navigate = useNavigate();
    return (
        <div className="previewpage container-fluid d-flex flex-column p-3 min-vh-100">
            {/*Action buttons*/}
            <div className="d-flex flex-column align-items-center gap-3 mb-4">
                {/*list of templates*/}
                <div className="d-flex gap-2 flex-wrap justify-content-center">
                    {templates.map(({id, label}) => (
                        <button
                            key={id}
                            className={
                                `btn btn-sm rounded-pill p-2 
                            ${selectedTemplate === id ? 'btn-warning' : 'btn-outline-secondary'}
                            `}
                            style={{
                                minWidth: '100px',
                                height: '38px',
                                borderColor: '#800080',      // Purple border
                                borderWidth: '2px',          // Visible border thickness
                                borderStyle: 'solid',
                            }}
                            onClick={() => setSelectedTemplate(id)}
                        >
                            {label}
                        </button>
                    ))}
                </div>
                {/*list of action buttons*/}
                <div className="d-flex flex-wrap justify-content-center gap-2">
                    <button
                        className="btn btn-dark"
                        onClick={() => navigate(-1)}
                    >
                        Back
                    </button>
                    <button className="btn btn-primary d-flex align-items-center justify-content-center">Save and Exit</button>
                    <button className="btn btn-danger">Delete Invoice</button>
                    <button className="btn btn-secondary">Back to Dashboard</button>
                    <button className="btn btn-info">Send email</button>
                    <button className="btn btn-success d-flex align-items-center justify-content-center">Download PDF</button>
                </div>
            </div>
            {/*Display the invoice preview here*/}
            <div className="flex-grow-1 overflow-auto d-flex justify-content-center align-items-start bg-light py-3">
                <div ref={previewRef} className="invoice-preview">
                    <InvoicePreview template={selectedTemplate} invoiceData={invoiceData}/>
                </div>
            </div>
        </div>
    )
}
export default PreviewPage;
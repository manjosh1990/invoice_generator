import {useContext, useRef, useState} from "react";
import {templates} from "../assets/assets.js";
import {AppContext} from "../context/AppContext.jsx";
import InvoicePreview from "../components/InvoicePreview.jsx";
import {useNavigate} from "react-router-dom";
import {saveInvoice} from "../service/invoiceService.js";
import toast from "react-hot-toast";
import {Loader2} from "lucide-react";
import html2canvas from "html2canvas";
import {uploadInvoiceThumbnail} from "../service/cloudnariService.js";

const PreviewPage = () => {
    const {
        selectedTemplate,
        setSelectedTemplate,
        invoiceData,
        baseUrl
    } = useContext(AppContext);
    const previewRef = useRef();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const handleSave = async () => {

        try {
            setLoading(true);
            const canvas = await html2canvas(previewRef.current, {
                scale: 2, // Increase scale for better quality
                useCORS: true, // Enable CORS to load external images
                backgroundColor:"#fff", // Set background color to white
                scrollY: -window.scrollY, // Adjust for any scrolling
            })
            const imageData = canvas.toDataURL("image/png");
           const thumbnailUrl = await  uploadInvoiceThumbnail(imageData)

            const payLoad = {
                ...invoiceData,
                thumbnailUrl, // Add the uploaded thumbnail URL
                template: selectedTemplate,
            }
            const response =await saveInvoice(baseUrl, payLoad);
            if (response.status === 200) {
                toast.success("Invoice saved successfully.");
                navigate("/dashboard");
            } else {
                console.log(response.status);
                console.log(response.data);
                toast.error("Something went wrong while saving the invoice.");
            }
        } catch (error) {
            console.error(error);
            toast.error("Failed to save invoice.",error.message);
        }finally {
            setLoading(false);
        }
    }
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
                    <button className="btn btn-primary d-flex align-items-center justify-content-center"
                    onClick={()=> handleSave()}
                            disabled={loading}
                    >   {loading && <Loader2 className="me-2 spin-animation" size={18}/> }
                        {loading?"Saving...": "Save and Exit"}
                    </button>
                    <button className="btn btn-danger">Delete Invoice</button>
                    <button className="btn btn-secondary">Back to Dashboard</button>
                    <button className="btn btn-info">Send email</button>
                    <button className="btn btn-success d-flex align-items-center justify-content-center">Download PDF
                    </button>
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
import {useContext, useState} from "react";
import {Pencil} from "lucide-react";
import {AppContext} from "../context/AppContext.jsx";
import InvoiceForm from "../components/InvoiceForm.jsx";
import TemplateGrid from "../components/TemplateGrid.jsx";

const MainPage = () => {
    // This is the main page of the application
    // It contains the title bar, invoice form, and template grid
    const [isEditingTitle, setIsEditingTitle] = useState(false);
    const {
        invoiceTitle,
        setInvoiceTitle,
        setInvoiceData,
        setSelectedTemplate,
    } = useContext(AppContext);

    const handleTitleChange = (e) => {
        const newTitle = e.target.value;
        setInvoiceTitle(newTitle);
        setInvoiceData((prevData) => ({
            ...prevData,
            title: newTitle
        }));
    }

    const handleTemplateClick = (templateId) => {
        setSelectedTemplate(templateId);
        console.log(templateId);
    }

    const handleTitleEdit = () => {
        setIsEditingTitle(true)
    }

    const handleTitleBlur = () => {
        setIsEditingTitle(false);
    }
    return (
        <div className="mainpage container-fluid bg-light min-vh-100 py-4">
            <div className="container">
                {/*Title bar*/}
                <div className="bg-white border rounded shadow-sm p-3 mb-4">
                    <div className="d-flex align-items-center">
                        {isEditingTitle ? (
                            <input
                                type="text"
                                className="form-control me-2"
                                autoFocus
                                onBlur={handleTitleBlur}
                                onChange={handleTitleChange}
                                value={invoiceTitle}
                            />
                        ) : (
                            <>
                                <h5 className="mb-0 me-2">{invoiceTitle}</h5>
                                <button className="btn btn-sm p-0 border-0 bg-transparent"
                                        onClick={handleTitleEdit}
                                >
                                    <Pencil className="text-primary" size={20}/>
                                </button>
                            </>
                        )}
                    </div>
                </div>
                {/*Invoice form and template grid*/}
                <div className="row g-4 align-items-stretch">
                    {/*Invoice form*/}
                    <div className="col-12 col-lg-6 d-flex">
                        <div className="bg-white border rounded shadow-sm p-4 w-100">
                            <InvoiceForm/>
                        </div>
                    </div>
                    {/*template grid*/}
                    <div className="col-12 col-lg-6 d-flex">
                        <div className="bg-white border rounded shadow-sm p-4 w-100">
                            <TemplateGrid onTemplateClick={handleTemplateClick}/>
                        </div>
                    </div>
                </div>
                {/*Title bar*/}

            </div>
        </div>
    )
}

export default MainPage;
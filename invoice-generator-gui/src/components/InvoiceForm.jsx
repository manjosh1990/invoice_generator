import {assets} from "../assets/assets.js";
import {Trash2} from "lucide-react";
import {useContext, useEffect, useState} from "react";
import {AppContext} from "../context/AppContext.jsx";

const InvoiceForm = () => {

    const {invoiceData, setInvoiceData} = useContext(AppContext);
    const [isSameAsBilling, setIsSameAsBilling] = useState(false);

    const addItem = () => {
        setInvoiceData(prevData => ({
            ...prevData, items: [...prevData.items, {
                name: "", quantity: 0, price: 0, total: 0, description: ""
            }]
        }))
    }

    const deleteItem = (index) => {
        const items = invoiceData.items.filter((_, i) => i !== index);
        setInvoiceData(prevData => ({
            ...prevData, items
        }));
    }

    const handleChange = (section, field, value) => {
        setInvoiceData(prevData => ({
            ...prevData, [section]: {
                ...prevData[section], [field]: value
            }
        }))
    }

    const handleSameAddress = (e) => {
        const checked = e.target.checked;
        setIsSameAsBilling(checked);
        setInvoiceData(prevData => ({
            ...prevData, shipping: {
                ...prevData.billing
            }
        }))
    }

    const handleItemChange = (index, field, value) => {
        const items = [...invoiceData.items];
        items[index][field] = value;
        if (field === 'quantity' || field === 'price') {
            items[index].total = (items[index].quantity || 0) * (items[index].price || 0);
        }
        setInvoiceData(prevData => ({
            ...prevData, items
        }))
    }

    const calculateTotals = () => {
        const subTotal = invoiceData.items.reduce((sum, item) => sum + (item.total || 0), 0);
        const taxAmount = (subTotal * Number(invoiceData.tax || 0)) / 100;
        const grandTotal = subTotal + taxAmount;
        return {subTotal, taxAmount, grandTotal};
    }

    const { subTotal, taxAmount, grandTotal } = calculateTotals();

    const handleLogoUpload = (e) => {
        const file = e.target.files[0];
        if(file){
            const reader = new FileReader();
            reader.onloadend = () => {
                setInvoiceData(prevData => ({
                    ...prevData, logo: reader.result
                }));
            };
            reader.readAsDataURL(file);
        }
    }

    useEffect(() => {
        if(!invoiceData.invoice.invoiceNumber){
            const invoiceNumber = `INV-${Math.floor(100000 + Math.random() * 900000)}`;
            setInvoiceData(prevData => ({
                ...prevData, invoice: {
                    ...prevData.invoice, invoiceNumber
                }
            }));
        }
    }, []);

    return (<>
        <div className="invoiceForm container py-4">
            {/*Company logo*/}
            <div className="mb-4">
                <h5>Company Logo</h5>
                <div className="d-flex align-items-center gap-3">
                    <label htmlFor="image" className="form-label">
                        <img
                            src={invoiceData.logo ? invoiceData.logo : assets.upload_area}
                            alt=""
                            width={98}
                        />
                    </label>
                    <input
                        type="file"
                        className="form-control"
                        name="logo"
                        id="image"
                        hidden
                        accept="image/*"
                        onChange={handleLogoUpload}
                    />
                </div>
            </div>
            {/*Company information*/}
            <div className="mb-4">
                <h5>Your Company</h5>
                <div className="row g-3">
                    <div className="col-md-6">
                        <input type="text"
                               className="form-control"
                               placeholder="Company Name"
                               onChange={(e) => handleChange('companyInfo', 'companyName', e.target.value)}
                               value={invoiceData.companyInfo.companyName}
                        />
                    </div>
                    <div className="col-md-6">
                        <input type="text"
                               className="form-control"
                               placeholder="Company Phone"
                               onChange={(e) => handleChange('companyInfo', 'companyPhone', e.target.value)}
                               value={invoiceData.companyInfo.companyPhone}
                        />
                    </div>
                    <div className="col-md-12">
                            <textarea className="form-control"
                                      placeholder="Company Address"
                                      onChange={(e) => handleChange('companyInfo', 'companyAddress', e.target.value)}
                                      value={invoiceData.companyInfo.companyAddress}
                            />
                    </div>
                </div>
            </div>
            {/*Bill to*/}
            <div className="mb-4">
                <h5>Bill To</h5>
                <div className="row g-3">
                    <div className="col-md-6">
                        <input type="text"
                               className="form-control"
                               placeholder="Client Name"
                               onChange={(e) => handleChange('billing', 'name', e.target.value)}
                               value={invoiceData.billing.name}
                        />
                    </div>
                    <div className="col-md-6">
                        <input type="text"
                               className="form-control"
                               placeholder="Client Phone"
                               onChange={(e) => handleChange('billing', 'phone', e.target.value)}
                               value={invoiceData.billing.phone}
                        />
                    </div>
                    <div className="col-md-12">
                            <textarea
                                className="form-control"
                                placeholder="Client Address"
                                onChange={(e) => handleChange('billing', 'address', e.target.value)}
                                value={invoiceData.billing.address}
                            />
                    </div>
                </div>
            </div>
            {/*Ship to*/}
            <div className="mb-4">
                <div className="d-flex justify-content-between align-items-center mb-2">
                    <h5>Ship To</h5>
                    <div className="form-check">
                        <input type="checkbox" id="sameAddress" className="form-check-input"
                               onChange={(e) => handleSameAddress(e)}
                        />
                        <label className="form-check-label" htmlFor="sameAddress">
                            Same as Bill To
                        </label>
                    </div>
                </div>
                <div className="row g-3">
                    <div className="col-md-6">
                        <input type="text"
                               className="form-control"
                               placeholder="Recipient Name"
                               onChange={(e) => handleChange('shipping', 'name', e.target.value)}
                               value={invoiceData.shipping.name}
                               disabled={isSameAsBilling}
                        />
                    </div>
                    <div className="col-md-6">
                        <input type="text"
                               className="form-control"
                               placeholder="Recipient Phone"
                               onChange={(e) => handleChange('shipping', 'phone', e.target.value)}
                               value={invoiceData.shipping.phone}
                               disabled={isSameAsBilling}
                        />
                    </div>
                    <div className="col-md-12">
                        <textarea className="form-control"
                                  placeholder="Recipient Address"
                                  onChange={(e) => handleChange('shipping', 'address', e.target.value)}
                                  value={invoiceData.shipping.address}
                                  disabled={isSameAsBilling}
                        />
                    </div>
                </div>
            </div>
            {/*Invoice information*/}
            <div className="mb-4">
                <div className="row g-3">
                    <div className="col-md-4">
                        <label className="form-label" htmlFor="invoiceNumber">Invoice Number</label>
                        <input type="text"
                               id="invoiceNumber"
                               disabled className="form-control"
                               placeholder="Invoice Number"
                               value={invoiceData.invoice.invoiceNumber}
                               onChange={(e) => handleChange('invoice', 'invoiceNumber', e.target.value)}
                        />
                    </div>
                    <div className="col-md-4">
                        <label className="form-label" htmlFor="invoiceDate">Invoice Date</label>
                        <input
                            id="invoiceDate"
                            type="date"
                            className="form-control"
                            value={invoiceData.invoice.invoiceDate}
                            onChange={(e) => handleChange('invoice', 'invoiceDate', e.target.value)}/>
                    </div>
                    <div className="col-md-4">
                        <label className="form-label" htmlFor="dueDate">Due Date</label>
                        <input id="dueDate"
                               type="date"
                               className="form-control"
                               value={invoiceData.invoice.dueDate}
                               onChange={(e) => handleChange('invoice', 'dueDate', e.target.value)}
                        />
                    </div>
                </div>
            </div>
            {/*item details*/}
            <div className="mb-4">
                <h5>Item Details</h5>
                {invoiceData.items.map((item, index) => (<div className="card p-3 mb-3" key={index}>
                    <div className="row g-3 mb-2">
                        <div className="col-md-3">
                            <input type="text"
                                   className="form-control"
                                   placeholder="Item Name"
                                   value={item.name}
                                   onChange={(e) => handleItemChange(index, 'name', e.target.value)}
                            />
                        </div>
                        <div className="col-md-3">
                            <input type="number"
                                   className="form-control"
                                   placeholder="Qnty"
                                   value={item.quantity}
                                   onChange={(e) => handleItemChange(index, 'quantity', e.target.value)}
                            />
                        </div>
                        <div className="col-md-3">
                            <input type="number"
                                   className="form-control"
                                   placeholder="Price"
                                   onChange={(e) => handleItemChange(index, 'price', e.target.value)}
                                   value={item.price}/>
                        </div>

                        <div className="col-md-3">
                            <input type="number"
                                   className="form-control"
                                   placeholder="Total"
                                   disabled
                                   value={item.total}
                            />
                        </div>
                    </div>
                    <div className="d-flex gap-2">
                        <textarea className="form-control"
                                  placeholder="Description"
                                  value={item.description}
                                  onChange={(e) => handleItemChange(index, 'description', e.target.value)}
                        ></textarea>
                        {invoiceData.items.length > 1 && (
                            <button className="btn btn-outline-danger" type="button"
                                    onClick={() => deleteItem(index)}
                            >
                                <Trash2 size={18}/>
                            </button>)}
                    </div>
                </div>))}
                <button className="btn" type="button"
                        style={{backgroundColor: '#800080', color: '#fff'}}
                        onClick={addItem}>
                    Add Item
                </button>
            </div>
            {/*Bank Account details*/}
            <div className="mb-4">
                <h5>Bank Account Details</h5>
                <div className="row g-3">
                    <div className="col-md-4">
                        <input
                            type="text"
                            placeholder="Account Name"
                            className="form-control"
                            value={invoiceData.account.accountName}
                            onChange={(e) => handleChange('account', 'accountName', e.target.value)}
                        />
                    </div>
                    <div className="col-md-4">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Account number"
                            value={invoiceData.account.accountNumber}
                            onChange={(e) => handleChange('account', 'accountNumber', e.target.value)}
                        />
                    </div>
                    <div className="col-md-4">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Branch/IFSC Code"
                            value={invoiceData.account.ifscCode}
                            onChange={(e) => handleChange('account', 'ifscCode', e.target.value)}
                        />
                    </div>
                </div>
            </div>
            {/*totals*/}
            <div className="mb-4">
                <h5>Totals</h5>
                <div className="d-flex justify-content-end">
                    <div className="w-100 w-md-50">
                        <div className="d-flex justify-content-between">
                            <span>SubTotal</span>
                            <span>₹{subTotal.toFixed(2)}</span>
                        </div>
                        <div className="d-flex justify-content-between align-items-center my-2">
                            <label className="me-2" htmlFor="tax">Tax Rate(%)</label>
                            <input
                                type="number"
                                id="tax"
                                className="form-control w-25 text-end"
                                placeholder="2%"
                                value={invoiceData.tax}
                                onChange={(e) => setInvoiceData((prevData) => {
                                    return {...prevData, tax: e.target.value}
                                })}
                            />
                        </div>
                        <div className="d-flex justify-content-between">
                            <span>Tax Amount</span>
                            <span>₹{taxAmount.toFixed(2)}</span>
                        </div>
                        <div className="d-flex justify-content-between fw-bold mt-2">
                            <span>Grand Total</span>
                            <span>₹{grandTotal.toFixed(2)}</span>
                        </div>
                    </div>
                </div>
            </div>
            {/*Notes*/}
            <div className="mb-4">
                <h5>Notes</h5>
                <div className="w-100">
                        <textarea
                            className="form-control"
                            placeholder="Additional notes or terms and conditions"
                            rows="3"
                            value={invoiceData.notes}
                            onChange={(e) => setInvoiceData((prev) => ({...prev, notes: e.target.value}))}
                        ></textarea>
                </div>
            </div>
        </div>
    </>)
}

export default InvoiceForm;
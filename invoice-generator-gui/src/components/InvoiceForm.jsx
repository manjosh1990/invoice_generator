import {assets} from "../assets/assets.js";
import {Trash2} from "lucide-react";

const InvoiceForm = () => {
    return (
        <>
            <div className="invoiceForm container py-4">
                {/*Company logo*/}
                <div className="mb-4">
                    <h5>Company Logo</h5>
                    <div className="flex align-items-center gap-3">
                        <label htmlFor="image" className="form-label">
                            <img
                                src={assets.upload_area}
                                alt="upload"
                                width={38}
                                style={{cursor: 'pointer', filter: 'grayscale(100%) brightness(10)'}}
                            />

                            <input
                                type="file"
                                name="logo"
                                id="image"
                                hidden
                                className="form-control"
                                accept="image/*"
                            />
                        </label>
                    </div>
                </div>
                {/*Company information*/}
                <div className="mb-4">
                    <h5>Your Company</h5>
                    <div className="row g-3">
                        <div className="col-md-6">
                            <input type="text" className="form-control" placeholder="Company Name"/>
                        </div>
                        <div className="col-md-6">
                            <input type="text" className="form-control" placeholder="Company Phone"/>
                        </div>
                        <div className="col-md-12">
                            <textarea className="form-control" placeholder="Company Address"/>
                        </div>
                    </div>
                </div>
                {/*Bill to*/}
                <div className="mb-4">
                    <h5>Bill To</h5>
                    <div className="row g-3">
                        <div className="col-md-6">
                            <input type="text" className="form-control" placeholder="Client Name"/>
                        </div>
                        <div className="col-md-6">
                            <input type="text" className="form-control" placeholder="Client Phone"/>
                        </div>
                        <div className="col-md-12">
                            <textarea className="form-control" placeholder="Client Address"/>
                        </div>
                    </div>
                </div>
                {/*Ship to*/}
                <div className="mb-4">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                        <h5>Ship To</h5>
                        <div className="form-check">
                            <input type="checkbox" id="sameAddress" className="form-check-input"/>
                            <label className="form-check-label" htmlFor="sameAddress">
                                Same as Bill To
                            </label>
                        </div>
                    </div>
                    <div className="row g-3">
                        <div className="col-md-6">
                            <input type="text" className="form-control" placeholder="Recipient Name"/>
                        </div>
                        <div className="col-md-6">
                            <input type="text" className="form-control" placeholder="Recipient Phone"/>
                        </div>
                        <div className="col-md-12">
                            <textarea className="form-control" placeholder="Recipient Address"/>
                        </div>
                    </div>
                </div>
                {/*Invoice information*/}
                <div className="mb-4">
                    <div className="row g-3">
                        <div className="col-md-4">
                            <lable className="form-label" htmlFor="invoiceNumber">Invoice Number</lable>
                            <input type="text" id="invoiceNumber" disabled className="form-control" placeholder="Invoice Number"/>
                        </div>
                        <div className="col-md-4">
                            <lable className="form-label" htmlFor="invoiceDate">Invoice Date</lable>
                            <input id="invoiceDate" type="date" className="form-control"/>
                        </div>
                        <div className="col-md-4">
                            <lable className="form-label" htmlFor="dueDate">Due Date</lable>
                            <input id ="dueDate" type="date" className="form-control"/>
                        </div>
                    </div>
                </div>
                {/*item details*/}
                <div className="mb-4">
                    <h5>Item Details</h5>
                    <div className="card p-3 mb-3">
                        <div className="row g-3 mb-2">
                            <div className="col-md-3">
                                <input type="text" className="form-control" placeholder="Item Name"/>
                            </div>
                            <div className="col-md-3">
                                <input type="number" className="form-control" placeholder="Qnty"/>
                            </div>
                            <div className="col-md-3">
                                <input type="number" className="form-control" placeholder="Price"/>
                            </div>

                            <div className="col-md-3">
                                <input type="number" className="form-control" placeholder="Total" disabled/>
                            </div>
                        </div>
                        <div className="d-flex gap-2">
                            <textarea className="form-control" placeholder="Description"></textarea>
                            <button className="btn btn-outline-danger" type="button">
                                <Trash2 size={18}/>
                            </button>
                        </div>
                    </div>
                    <button className="btn btn-primary" type="button">Add Item</button>
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
                            />
                        </div>
                        <div className="col-md-4">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Account number"
                            />
                        </div>
                        <div className="col-md-4">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Branch/IFSC Code"
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
                                <span>₹{0.00}</span>
                            </div>
                            <div className="d-flex justify-content-between align-items-center my-2">
                                <label className="me-2" htmlFor="tax">Tax Rate(%)</label>
                                <input
                                    type="number"
                                    id="tax"
                                    className="form-control w-25 text-end"
                                    placeholder="2%"/>
                            </div>
                            <div className="d-flex justify-content-between">
                                <span>Tax Amount</span>
                                <span>₹{0.00}</span>
                            </div>
                            <div className="d-flex justify-content-between fw-bold mt-2">
                                <span>Grand Total</span>
                                <span>₹{0.00}</span>
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
                        ></textarea>
                    </div>
                </div>
            </div>
        </>
    )
}

export default InvoiceForm;
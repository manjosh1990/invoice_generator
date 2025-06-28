import axios from "axios";

export const uploadInvoiceThumbnail = async (imageData) => {
    const formData = new FormData();
    formData.append("file", imageData);
    formData.append("upload_preset", "invoices_thumbnail");
    formData.append("cloud_name", "dfgel8gmi");

   const response = await axios.post("https://api.cloudinary.com/v1_1/dfgel8gmi/image/upload", formData);
    if (response.status === 200) {
        return response.data.secure_url; // Return the URL of the uploaded image
    } else {
        throw new Error("Failed to upload image");
    }
}
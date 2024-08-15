import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';

const ProductUploadForm = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        const formData = new FormData();
        formData.append('image', data.image[0]);
        formData.append('name', data.name);
        formData.append('price', data.price);
        formData.append('description', data.description);
        formData.append('section', data.section);  // Add section to the form data

        try {
            const response = await axios.post('/api/products', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log(response.data);
            alert('Product uploaded successfully!');
        } catch (error) {
            console.error('Error uploading product:', error);
            alert('Failed to upload product');
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
            <div>
                <label>Product Name:</label>
                <input {...register('name', { required: true })} placeholder="Enter product name" />
                {errors.name && <p>This field is required</p>}
            </div>

            <div>
                <label>Price:</label>
                <input type="number" {...register('price', { required: true })} placeholder="Enter price" />
                {errors.price && <p>This field is required</p>}
            </div>

            <div>
                <label>Product Description:</label>
                <textarea {...register('description', { required: true })} placeholder="Enter product description" />
                {errors.description && <p>This field is required</p>}
            </div>

            <div>
                <label>Upload Image:</label>
                <input type="file" {...register('image', { required: true })} />
                {errors.image && <p>This field is required</p>}
            </div>

            <div>
                <label>Select Section:</label>
                <select {...register('section', { required: true })}>
                    <option value="">Select a section</option>
                    <option value="freshvegetable">Fresh Vegetables</option>
                    <option value="organicfruit">Organic Fruits</option>
                    <option value="dairyproduct">Dairy Products</option>
                </select>
                {errors.section && <p>This field is required</p>}
            </div>

            <button type="submit">Upload Product</button>
        </form>
    );
}

export default ProductUploadForm;

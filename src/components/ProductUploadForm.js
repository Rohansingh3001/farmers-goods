import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import './ProductUploadForm.css'; // Custom styles

const ProductUploadForm = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [isLoading, setIsLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [fileSizeError, setFileSizeError] = useState('');

    const onSubmit = async (data) => {
        // Clear previous messages
        setSuccessMessage('');
        setFileSizeError('');

        if (data.image[0]?.size > 2000000) { // 2MB limit for file size
            setFileSizeError('Image size should not exceed 2MB.');
            return;
        }

        const formData = new FormData();
        formData.append('image', data.image[0]);
        formData.append('name', data.name);
        formData.append('price', data.price);
        formData.append('description', data.description);
        formData.append('section', data.section);

        try {
            setIsLoading(true);
            const response = await axios.post('/api/products', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log(response.data);
            setSuccessMessage('Product uploaded successfully!');
            reset(); // Reset form fields after successful upload
        } catch (error) {
            console.error('Error uploading product:', error);
            alert('Failed to upload product');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form className="product-upload-form" onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
            <h2>Upload New Product</h2>

            <div className="form-group">
                <label htmlFor="name">Product Name:</label>
                <input
                    id="name"
                    {...register('name', { required: 'Product name is required' })}
                    placeholder="Enter product name"
                    className={errors.name ? 'input-error' : ''}
                />
                {errors.name && <p className="error-message">{errors.name.message}</p>}
            </div>

            <div className="form-group">
                <label htmlFor="price">Price:</label>
                <input
                    id="price"
                    type="number"
                    step="0.01"
                    {...register('price', {
                        required: 'Price is required',
                        min: { value: 0, message: 'Price cannot be negative' }
                    })}
                    placeholder="Enter price"
                    className={errors.price ? 'input-error' : ''}
                />
                {errors.price && <p className="error-message">{errors.price.message}</p>}
            </div>

            <div className="form-group">
                <label htmlFor="description">Product Description:</label>
                <textarea
                    id="description"
                    {...register('description', { required: 'Description is required' })}
                    placeholder="Enter product description"
                    className={errors.description ? 'input-error' : ''}
                />
                {errors.description && <p className="error-message">{errors.description.message}</p>}
            </div>

            <div className="form-group file-upload">
                <label htmlFor="image" className="file-label">Choose Image</label>
                <input
                    id="image"
                    type="file"
                    accept="image/png, image/jpeg"
                    {...register('image', {
                        required: 'Product image is required',
                        validate: {
                            acceptedFormats: (files) =>
                                ['image/jpeg', 'image/png'].includes(files[0]?.type) || 'Only JPG and PNG formats are allowed',
                        },
                    })}
                    className={errors.image ? 'input-error' : ''}
                />
                {errors.image && <p className="error-message">{errors.image.message}</p>}
            </div>

            <div className="form-group">
                <label htmlFor="section">Select Section:</label>
                <select
                    id="section"
                    {...register('section', { required: 'Section is required' })}
                    className={errors.section ? 'input-error' : ''}
                >
                    <option value="">Select a section</option>
                    <option value="freshvegetable">Fresh Vegetables</option>
                    <option value="organicfruit">Organic Fruits</option>
                    <option value="dairyproduct">Dairy Products</option>
                </select>
                {errors.section && <p className="error-message">{errors.section.message}</p>}
            </div>

            <div className="form-group">
                <button type="submit" className="upload-button" disabled={isLoading}>
                    {isLoading ? <span className="spinner"></span> : 'Upload Product'}
                </button>
                {fileSizeError && <p className="error-message">{fileSizeError}</p>}
                {successMessage && <p className="success-message">{successMessage}</p>}
            </div>
        </form>
    );
};

export default ProductUploadForm;

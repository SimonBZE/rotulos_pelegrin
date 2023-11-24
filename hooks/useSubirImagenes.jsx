import { imageApi } from '@/api';
import { useState } from 'react';

// http://127.0.0.1:1337/uploads/2023_10_11_20_03_33_f1455476f4.mp4


const useSubirImagenes = () => {
    const [images, setImages] = useState({});
    const [loading, setLoading] = useState(false);

    const uploadImages = async (files, inputName) => {
        const formData = new FormData();
        files.forEach(file => formData.append("files", file));

        setLoading(true);
        try {
            const data = await (new imageApi()).upload(formData);
            const newImageData = data.map(imagen => ({ id: imagen.id, url: imagen.url }));
            return newImageData;
        } catch (error) {
            console.error("Error uploading images:", error);
            return [];
        } finally {
            setLoading(false);
        }
    };

    const handleFileChange = async (event, inputName) => {
        const files = Array.from(event.target.files);
        const validImageTypes = ["image/gif", "image/jpeg", "image/png", "image/jpg"];
        
        const filteredFiles = files.filter(file => validImageTypes.includes(file.type));
        if (filteredFiles.length !== files.length) {
            alert("Por favor, sube solo imágenes.");
            return;
        }

        const newImageData = await uploadImages(filteredFiles, inputName);
        setImages(prev => ({ ...prev, [inputName]: [...(prev[inputName] || []), ...newImageData] }));
    };

    const handleImageRemove = (inputName, imageId) => {
        setImages(prev => ({
            ...prev,
            [inputName]: prev[inputName].filter(image => image.id !== imageId)
        }));
    };

    return { images, handleFileChange, handleImageRemove, loading, setImages };
};

export default useSubirImagenes;
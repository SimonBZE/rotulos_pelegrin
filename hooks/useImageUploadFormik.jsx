import { imageApi } from '@/api';
import { useState } from 'react';

const imageApiCtrl = new imageApi();

const useImageUpload = (formik) => {
  const [loading, setLoading] = useState(false);

  const handleFileChange = async (event, fieldName, index) => {
    const files = Array.from(event.currentTarget.files);
  
    if (files.length === 0) {
      return; // No hay archivos para cargar
    }
  
    setLoading(true);
  
    const formData = new FormData();
    files.forEach(file => {
      formData.append("files", file);
    });
  
    try {
      const data = await imageApiCtrl.upload(formData);
      const newImageData = data.map((imagen) => ({
        id: imagen.id,
        url: imagen.url
      }));
  
      const fieldPath = `${fieldName}[${index}].imagenes`;
      const currentImages = formik.values[fieldName]?.[index]?.imagenes || [];
  
      // Combina las imágenes existentes con las nuevas
      formik.setFieldValue(fieldPath, [...currentImages, ...newImageData]);
  
    } catch (error) {
      console.error("Error al cargar archivos:", error);
    }
  
    setLoading(false);
  };

  const handleImageRemove = (fieldName, index, subIndex) => {
    const fieldPath = `${fieldName}[${index}].imagenes`;
  
    if (subIndex === null || subIndex === undefined) {
      // Si subIndex no está definido, no hagas nada
      return;
    }
  
    let currentImages = formik.values[fieldName]?.[index]?.imagenes || [];
    if (!Array.isArray(currentImages)) {
      // No hay imágenes para eliminar
      return;
    }
  
    // Filtrar la imagen específica
    const updatedImages = currentImages.filter((_, i) => i !== subIndex);
  
    formik.setFieldValue(fieldPath, updatedImages);
  };

  return { handleFileChange, handleImageRemove, loading };
};

export default useImageUpload;

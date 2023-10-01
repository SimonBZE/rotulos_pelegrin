import { imageApi } from '@/api';
import { useState } from 'react';

const imageApiCtrl = new imageApi();

const useImageUpload = () => {
  const [images, setImages] = useState({});

  const handleFileChange = async (event, inputName, index = null) => {
    const files = Array.from(event.currentTarget.files);
    const formData = new FormData();

    files.forEach((file) => {
      formData.append("files", file);
    });

    const data = await imageApiCtrl.upload(formData)
    
    // const newImageURLs = data.map((imagen) => imagen.id);
    // setImageURL((prevImageURL) => [...prevImageURL, ...newImageURLs]);

    const newImageData = data.map((imagen) => ({
      id: imagen.id,
      url: imagen.url
    }));

    setImages(prevImages => {
      // Si el inputName tiene un índice, es un array
      if (index !== null) {
        const componentImages = [...(prevImages[inputName] || [])];
        if (Array.isArray(componentImages[index])) {
          componentImages[index] = [...componentImages[index], ...newImageData];
        } else {
          componentImages[index] = newImageData;
        }
        return { ...prevImages, [inputName]: componentImages };
      } else {
        // Si no tiene índice, es un input normal
        return {
          ...prevImages,
          [inputName]: [...(prevImages[inputName] || []), ...newImageData]
        };
      }
    });
  };
  
  return { images, handleFileChange, setImages  };
};

export default useImageUpload;

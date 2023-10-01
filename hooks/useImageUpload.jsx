import { useState } from 'react';

const useImageUpload = () => {
  const [images, setImages] = useState({});

  const handleFileChange = async (event, inputName, index = null) => {
    const files = Array.from(event.currentTarget.files);
    const formData = new FormData();

    files.forEach((file) => {
      formData.append("files", file);
    });

    const response = await fetch("http://localhost:1337/api/upload", {
      method: "POST",
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjk2MDc1ODg2LCJleHAiOjE2OTg2Njc4ODZ9.fI7VF8Yb9VdULFPc_uEfgp45EBfexn84waU_vAxT2xQ",
      },
      body: formData,
    });

    const data = await response.json();
    const newImageURLs = data.map((imagen) => imagen.id);
    // setImageURL((prevImageURL) => [...prevImageURL, ...newImageURLs]);

    setImages(prevImages => {
      // Si el inputName tiene un índice, es un array
      if (index !== null) {
        const componentImages = [...(prevImages[inputName] || [])];
        if (componentImages[index]) {
          componentImages[index] = [...componentImages[index], ...newImageURLs];
        } else {
          componentImages[index] = newImageURLs;
        }
        return { ...prevImages, [inputName]: componentImages };
      } else {
        // Si no tiene índice, es un input normal
        return {
          ...prevImages,
          [inputName]: [...(prevImages[inputName] || []), ...newImageURLs]
        };
      }
    });
  };
  
  return { images, handleFileChange };
};

export default useImageUpload;

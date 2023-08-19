import Image from 'next/image';
import React, { useState, useRef } from 'react';

function ImageUploader({ onImagesChange }) {
  const [previewImages, setPreviewImages] = useState([]);
  const fileInputRef = useRef(null);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const newImageURLs = files.map(file => URL.createObjectURL(file));

    const combinedImageURLs = [...previewImages, ...newImageURLs];
    setPreviewImages(combinedImageURLs);

    // Propagar cambios al componente padre
    onImagesChange && onImagesChange(combinedImageURLs);
  };

  const handleImageRemove = (removeIndex) => {
    const filteredImages = previewImages.filter((_, imgIndex) => imgIndex !== removeIndex);
    setPreviewImages(filteredImages);

    // Propagar cambios al componente padre
    onImagesChange && onImagesChange(filteredImages);
  };

  const onDragOver = (e) => {
    e.preventDefault();
  };

  const onDrop = (e) => {
    e.preventDefault();
    handleImageChange({ target: { files: e.dataTransfer.files } });
  };

  return (
    <div className="space-y-4 mt-5">
      <div 
        className="border-dashed border-2 p-4 rounded-md relative cursor-pointer bg-white"
        onDragOver={onDragOver}
        onDrop={onDrop}
        onClick={() => fileInputRef.current.click()}
      >
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleImageChange}
          className="hidden"
          ref={fileInputRef}
        />
        <p className="text-center text-gray-500">Arrastra y suelta imágenes aquí o haz clic para seleccionar</p>
      </div>

      <div className="grid gap-3 grid-cols-3 sm:grid-cols-4 md:grid-cols-3 2xl:grid-cols-4">
        {previewImages.map((imageURL, imgIndex) => (
          <div key={imgIndex} className="relative">
            <Image 
              src={imageURL} 
              alt="Previsualización" 
              className="w-24 h-24 object-cover rounded-md shadow-sm" 
              width={100}
              height={100}
            />
            <button 
              className="absolute top-0 right-0 bg-black text-white rounded-full w-5 h-5 flex items-center justify-center"
              onClick={() => handleImageRemove(imgIndex)}
            >
              X
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ImageUploader;
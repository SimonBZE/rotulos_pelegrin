import { useState } from 'react';

const UploadImage = ({ onUploadSuccess, onUploadError }) => {
  const [file, setFile] = useState(null);
  const [uploadedImages, setUploadedImages] = useState([]);

  const handleFileChange = async (e) => {
    setFile(e.target.files[0]);
    await handleUpload(e.target.files[0]);
  };

  const handleUpload = async (fileToUpload) => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjk1MzY5MzI1LCJleHAiOjE2OTc5NjEzMjV9.e5b0iddcBpONw3op6loWQJQWI-F3zLhumpX79shUSdk");

    const formData = new FormData();
    formData.append("ref", "api::presupuesto.presupuesto");
    formData.append("files", fileToUpload);

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formData,
      redirect: 'follow'
    };

    try {
      const response = await fetch("http://localhost:1337/api/upload", requestOptions);
      const result = await response.json();
      setUploadedImages([...uploadedImages, `http://localhost:1337${result[0].url}`]); // Asegurándonos de que la URL base es correcta.
      onUploadSuccess(result);
    } catch (error) {
      onUploadError(error);
    }
  };

// const handleUpload = async (fileToUpload) => {
//     // ... (tu código existente para subir la imagen)

//     try {
//       const response = await fetch("http://localhost:1337/api/upload", requestOptions);
//       const result = await response.json();
//       setUploadedImages([...uploadedImages, `http://localhost:1337${result[0].url}`]);

//       // Suponiendo que tienes el ID del presupuesto al que quieres asociar la imagen
//       const presupuestoId = "TU_ID_AQUÍ";
//       const updateResponse = await fetch(`http://localhost:1337/presupuestos/${presupuestoId}`, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': "Bearer TU_TOKEN_AQUÍ"
//         },
//         body: JSON.stringify({
//           imagen: result[0].id // Asociando la imagen subida con el presupuesto
//         })
//       });

//       const updateResult = await updateResponse.json();
//       console.log(updateResult);

//       onUploadSuccess(result);
//     } catch (error) {
//       onUploadError(error);
//     }
//   };

  return (
    <div className="w-full">
      <input type="file" onChange={handleFileChange} className="mb-4" />

      <div className="flex overflow-x-scroll hide-scrollbar w-full space-x-4">
        {uploadedImages.map((imageUrl, index) => (
          <div key={index} className="flex-none w-1/3">
            <img src={imageUrl} alt="Uploaded Preview" className="w-full h-32 object-cover rounded-md" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default UploadImage;

// Estilos adicionales para ocultar el scrollbar
<style jsx>{`
  .hide-scrollbar::-webkit-scrollbar {
    display: none;
  }
  .hide-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
`}</style>

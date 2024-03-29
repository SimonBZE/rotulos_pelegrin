import { useState } from "react";
import { imageApi } from "@/api";

const imageApiCtrl = new imageApi();

export const useFilesUpload = () => {
  const [files, setFiles] = useState({});
  const [loading, setLoading] = useState({});
  const [error, setError] = useState(null);

  const validFormats = {
    image: [
      "image/jpeg",
      "image/png",
      "image/gif",
      "image/svg+xml",
      "image/tiff",
      "image/vnd.microsoft.icon",
      "image/vnd.djvu",
    ],
    audio: ["adudio/mpeg", "auio/wav", "audio/ogg"],
    video: [
      "video/mpeg",
      "video/mp4",
      "video/quicktime",
      "video/x-ms-wmv",
      "video/x-msvideo",
      "video/x-flv",
    ],
  };

  const handleMultimediaChange = async (e, mediaType, fieldId) => {
    setError(null);
    setLoading({ ...loading, [mediaType]: true });

    const uploadedFiles = e.target.files;
    const validFiles = Array.from(uploadedFiles).filter((file) =>
      validFormats[mediaType].includes(file.type)
    );

    const fileIds = await Promise.all(
      validFiles.map(async (file) => {
        const formData = new FormData();
        formData.append("files", file);

        try {
          const response = await imageApiCtrl.upload(formData);

          // await console.log(response)

          const datos = response.map((imagen) => ({
            id: imagen.id,
            url: imagen.url,
          }));

          return datos;
        } catch (error) {
          console.error("Error uploading file:", error);
          setError("Error uploading file");
        }
        return null;
      })
    );

    

    setFiles((prev) => ({
      ...prev,
      [fieldId]: [
        ...(prev[fieldId] || []),
        ...fileIds.filter((id) => id !== null),
      ],
    }));

    setLoading({ ...loading, [fieldId]: false });
  };

  const uploadAudioFromBlob = async (audioURL, fieldId) => {
    setError(null);
    setLoading({ ...loading, [fieldId]: true });

    try {
        const resp = await fetch(audioURL);
        const audioBlob = await resp.blob();
        
        const formData = new FormData();
        formData.append("files", audioBlob, "recorded-audio.wav");

        const response = await imageApiCtrl.upload(formData);
        console.log("Upload Response:", response);

        const datos = response.map((media) => ({
            id: media.id,
            url: media.url,
        }));

        setFiles((prev) => ({
            ...prev,
            [fieldId]: [
                ...(prev[fieldId] || []),
                ...datos,
            ],
        }));
        
    } catch (uploadError) {
        console.error("Error uploading file:", uploadError);
        setError("Error uploading file");
    } finally {
      setLoading({ ...loading, [fieldId]: false });
    }
};

  const handleMediaRemove = (mediaType, index) => {
    setFiles((prevFiles) => {
      // Crear una copia del array actual de medios.
      const newMediaArray = prevFiles[mediaType].flat();
      // Eliminar el medio en el índice proporcionado.
      newMediaArray.splice(index, 1);
      // Actualizar el estado con el nuevo array de medios.
      return {
        ...prevFiles,
        [mediaType]: [newMediaArray],
      };
    });
  };
  

  return { files, handleMultimediaChange, setFiles, loading, error, handleMediaRemove, uploadAudioFromBlob };
};



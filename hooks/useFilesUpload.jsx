import { useState } from "react";
import { imageApi } from "@/api";

const imageApiCtrl = new imageApi();

export const useFilesUpload = () => {
  const [files, setFiles] = useState({});
  const [loading, setLoading] = useState(false);
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
    audio: ["audio/mpeg", "audio/wav", "audio/ogg"],
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
    setLoading(true);

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

          await console.log(response)

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

    setLoading(false);
  };

  return { files, handleMultimediaChange, setFiles, loading, error };
};

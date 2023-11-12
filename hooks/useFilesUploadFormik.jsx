import { useState, useCallback } from "react";
import { imageApi } from "@/api";

const imageApiCtrl = new imageApi();

export const useFilesUpload = (formik) => {
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


  const uploadMedia = useCallback(async (files, fieldId) => {
    const formData = new FormData();
    files.forEach(file => formData.append("files", file));

    try {
      const response = await imageApiCtrl.upload(formData);
      const mediaData = response.map(media => ({ id: media.id, url: media.url }));
      return mediaData;
    } catch (error) {
      console.error("Error uploading file:", error);
      setError("Error uploading file");
      return [];
    }
  }, []);

  const handleMultimediaChange = useCallback(async (e, mediaType, fieldId) => {
    const uploadedFiles = e.target.files;
    const validFiles = Array.from(uploadedFiles).filter(file =>
      validFormats[mediaType].includes(file.type)
    );

    if (validFiles.length === 0) {
      return;
    }

    setLoading(prevLoading => ({ ...prevLoading, [fieldId]: true }));
    const mediaData = await uploadMedia(validFiles, fieldId);
    formik.setFieldValue(fieldId, [...(formik.values[fieldId] || []), ...mediaData]);
    setLoading(prevLoading => ({ ...prevLoading, [fieldId]: false }));
  }, [formik, uploadMedia]);

  const handleMediaRemove = useCallback((fieldId, index) => {
    const updatedMedia = formik.values[fieldId].filter((_, i) => i !== index);
    formik.setFieldValue(fieldId, updatedMedia);
  }, [formik]);

  const uploadAudioFromBlob = useCallback(async (audioURL, fieldId) => {
    setLoading(prevLoading => ({ ...prevLoading, [fieldId]: true }));

    try {
      const resp = await fetch(audioURL);
      const audioBlob = await resp.blob();
      const audioData = await uploadMedia([audioBlob], fieldId);
      formik.setFieldValue(fieldId, [...(formik.values[fieldId] || []), ...audioData]);
    } catch (uploadError) {
      console.error("Error uploading file:", uploadError);
      setError("Error uploading file");
    } finally {
      setLoading(prevLoading => ({ ...prevLoading, [fieldId]: false }));
    }
  }, [formik, uploadMedia]);

  return { handleMultimediaChange, handleMediaRemove, loading, error, uploadAudioFromBlob };
};

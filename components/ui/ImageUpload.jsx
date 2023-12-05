import React, { useEffect, useRef, useState } from "react";
import { imageApi } from "@/api";
import { Avatar, Button } from "@nextui-org/react";
import { IoImageOutline, IoTrashOutline } from "react-icons/io5";

import { ENV } from "@/utils";

export const ImageUploader = ({ onUpload, onError, foto }) => {
  const fileInputRef = useRef(null);
  const imageApiCtrl = new imageApi();
  const [imagen, setImagen] = useState({});
  const [loading, setLoading] = useState(false);

  const validFormats = [
    "image/jpeg",
    "image/png",
    "image/gif",
    "image/svg+xml",
    "image/tiff",
    "image/vnd.microsoft.icon",
    "image/vnd.djvu",
  ];

  const handleFileChange = async (e) => {
    setLoading(true);
    const uploadedFiles = e.target.files;
    const validFiles = Array.from(uploadedFiles).filter((file) =>
      validFormats.includes(file.type)
    );

    if (validFiles.length === 0) {
      onError && onError("Invalid file format");
      setLoading(false);
      return;
    }

    if (imagen.id) {
      await DeleteImage(imagen.id);
    }

    try {
      const formData = new FormData();
      formData.append("files", validFiles[0]); // Solo se maneja un archivo a la vez

      const response = await imageApiCtrl.upload(formData);
      const datos = response.map((imagen) => ({
        id: imagen.id,
        url: imagen.url,
      }));

      setImagen(datos[0]);
      onUpload && onUpload(datos);

    } catch (error) {
      console.error("Error uploading file:", error);
      onError && onError("Error uploading file");
    } finally {
      setLoading(false);
    }
  };

  const DeleteImage = async () => {
    try {
      await imageApiCtrl.deleteImage(imagen.id);
      setImagen({});
      onUpload([])
    } catch (error) {
      console.error("Error deleting file:", error);
    }
  };

  useEffect(() => {
    if (foto) {
      setImagen(foto);
    }
  }, [foto]);

  return (
    <>
      <div className="flex gap-3 items-center">
        <Avatar
          src={imagen.url ? ENV.SERVER_HOST + imagen.url : ""}
          className="w-20 h-20 text-large"
        />

        {imagen.id && (
          <Button
            color="danger"
            radius="full"
            onClick={() => DeleteImage(imagen.id)}
          >
            <IoTrashOutline />
            Eliminar
          </Button>
        )}

        <Button
          color="success"
          radius="full"
          onClick={() => fileInputRef.current.click()}
          className="text-white"
          isLoading={loading}
        >
          <IoImageOutline /> {!imagen.id ? "Subir foto" : "Cambiar foto"}{" "}
        </Button>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        className="hidden"
        multiple
        onChange={handleFileChange}
        accept="image/png, image/jpeg, image/jpg, image/gif"
      />
    </>
  );
};

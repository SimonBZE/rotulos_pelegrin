"use client";

import { useFormik, FormikProvider, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Budget } from "@/api";
import { useEffect, useState } from "react";

const disenoSchema = Yup.object({
  horas: Yup.number()
    .required("Debe definir un número de horas")
    .test(
      "Is positive?",
      "El número debe ser mayor que 0",
      (value) => value > 0
    ),
  unidades: Yup.number()
    .required("Debe de especificar unidades")
    .test(
      "Is positive?",
      "El número debe ser mayor que 0",
      (value) => value > 0
    ),
  precio: Yup.number()
    .required("Debe de especificar un precio")
    .test(
      "Is positive?",
      "No puede poner precio negativo",
      (value) => value >= 0
    ),
  imagenes: Yup.mixed(),
});

const newDiseno = {
  unidades: "",
  horas: "",
  precio: "",
  imagenes: [],
};

const validationSchema = Yup.object({
  name: Yup.string().required("Debe poner un nombre"),
  cover: Yup.mixed(),
});

const initialValues = {
  name: "",
  cover: [],
};

const page = () => {
  const [imageURL, setImageURL] = useState([]);

  const handleFileChange = async (event) => {
    const files = Array.from(event.currentTarget.files);
    const formData = new FormData();
    
    files.forEach(file => {
      formData.append('files', file);
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

    const newImageURLs = data.map(imagen => imagen.id);
    setImageURL(prevImageURL => [...prevImageURL, ...newImageURLs]);
   
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const data = {
        name: values.name,
        cover: imageURL, // Aquí usamos la URL o el ID de la imagen
      };

      try {
        const url = await fetch("http://localhost:1337/api/pruebas", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjk2MDc1ODg2LCJleHAiOjE2OTg2Njc4ODZ9.fI7VF8Yb9VdULFPc_uEfgp45EBfexn84waU_vAxT2xQ",
          },
          body: JSON.stringify({ "data": data }),
          
        });

        const response = await url.json();
        console.log(response)

      } catch (error) {
        console.log(error)
      }
      
      
    },
  });

  return (
    
    <FormikProvider value={formik}>
      {/* { imageURL.length > 0 ? imageURL[0].formats.small.url : 'no hay nada'} */}
      
      <form onSubmit={formik.handleSubmit}>
        <input
          type="text"
          name="name"
          className="formulario"
          onChange={formik.handleChange}
          value={formik.values.name}
          onBlur={formik.handleBlur}
        />
        {console.log(formik.errors.name)}
        {formik.errors.name && formik.touched.name ? (
          <div>{formik.errors.name}</div>
        ) : null}

        <input
          type="file"
          multiple
          name="cover"
          onChange={handleFileChange}
          onBlur={formik.handleBlur}
        />
        {formik.errors.cover && formik.touched.cover ? (
          <div>{formik.errors.cover}</div>
        ) : null}

        <button type="submit">Enviar</button>
      </form>
    </FormikProvider>
  );
};

export default page;

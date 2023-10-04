"use client";

import { useFormik, FormikProvider, FieldArray } from "formik";
import * as Yup from "yup";
import { Dinero } from "./components/Dinero";
import useImageUpload from "@/hooks/useImageUpload";
import ImageGrid from "@/components/common/ImageGrid";

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
    )
    .notOneOf([NaN], "Debe ser un número válido"),
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
  dinero: [],
};

const page = () => {
  const { images, handleFileChange, setImages, loader } = useImageUpload();

  const handleImageRemove = (inputName, index, subIndex = null) => {
    setImages((prevImages) => {
      const newImages = { ...prevImages };
      if (subIndex !== null) {
        // Eliminar imagen de un componente hijo
        newImages[inputName][index].splice(subIndex, 1);
      } else {
        // Eliminar imagen del array padre
        newImages[inputName].splice(index, 1);
      }
      return newImages;
    });
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      
      values.cover = images.cover;
      values.dinero.forEach((item, index) => {
        item.imagenes = images.dinero[index];
      });

      try {
        const url = await fetch("http://localhost:1337/api/pruebas", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjk2MDc1ODg2LCJleHAiOjE2OTg2Njc4ODZ9.fI7VF8Yb9VdULFPc_uEfgp45EBfexn84waU_vAxT2xQ",
          },
          body: JSON.stringify({ data: { ...values } }),
        });

        // const response = await url.json();
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <FormikProvider value={formik}>
      {/* { imageURL.length > 0 ? imageURL[0].formats.small.url : 'no hay nada'} */}
      {JSON.stringify(images)}
      <form onSubmit={formik.handleSubmit}>
        <input
          type="text"
          name="name"
          className="formulario"
          onChange={formik.handleChange}
          value={formik.values.name}
          onBlur={formik.handleBlur}
        />

        {formik.errors.name && formik.touched.name ? (
          <div>{formik.errors.name}</div>
        ) : null}

        <input
          type="file"
          multiple
          // name="cover"
          data-name="cover"
          onChange={(e) => handleFileChange(e, "cover")}
          // onBlur={formik.handleBlur}
        />
        {formik.errors.cover && formik.touched.cover ? (
          <div>{formik.errors.cover}</div>
        ) : null}

        <ImageGrid
          images={images.cover || []}
          onRemove={(index) => handleImageRemove("cover", index)}
        />

        <FieldArray
          name="dinero"
          render={(arrayHelpers) => (
            <div>
              {formik.values.dinero.map((_, index) => (
                <Dinero
                  index={index}
                  arrayHelpers={arrayHelpers}
                  key={index}
                  onRemove={() => arrayHelpers.remove(index)}
                  handleFileChange={handleFileChange}
                  loader={loader}
                  images={images}
                  setImages={setImages}
                  handleImageRemove={handleImageRemove}
                />
              ))}
              <button
                type="button"
                onClick={() => arrayHelpers.push({ ...newDiseno })}
                className="mt-3 p-2 bg-primary text-white"
              >
                Agregar
              </button>
            </div>
          )}
        />

        <button type="submit">Enviar</button>
      </form>
    </FormikProvider>
  );
};

export default page;

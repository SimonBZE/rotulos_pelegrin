"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  Print,
  Mounting,
  Paint,
  Locksmith,
  Cut,
  Sumaries,
  Design,
  Contenido,
} from "./components";
import { Budget } from "@/api";
import {
  initialValues,
  newPaint,
  newLockSmith,
  newDesign,
  newPrint,
  newCut,
  newMounting,
  validationSchema,
} from "./utils/formikValidations";
import { useFormik, FormikProvider, FieldArray } from "formik";
import useImageUpload from "@/hooks/useImageUpload";
import { useFilesUpload } from "@/hooks/useFilesUpload";

const servicios = [
  {
    nombre: "Diseño",
    color: "#6E5FFF",
    imagen: "./assets/Diseno.svg",
  },
  {
    nombre: "Impresión",
    color: "#2FA7FF",
    imagen: "./assets/Impresion.svg",
  },
  {
    nombre: "Corte",
    color: "#FF5F5F",
    imagen: "./assets/Corte.svg",
  },
  {
    nombre: "Cerrajeria",
    color: "#00D7E2",
    imagen: "./assets/Cerrajeria.svg",
  },
  {
    nombre: "Pintura",
    color: "#8AC111",
    imagen: "./assets/Pintura.svg",
  },
  {
    nombre: "Montaje",
    color: "#FFA008",
    imagen: "./assets/Montaje.svg",
  },
];

const budgetCtrl = new Budget();

export default function NuevoProyecto() {
  const { images, handleFileChange, setImages, handleImageRemove } =
    useImageUpload({});
  const { files, handleMultimediaChange, loading, setFiles } = useFilesUpload(
    {}
  );

  const [total, setTotal] = useState({
    diseno: 0,
    impresion: 0,
    corte: 0,
    pintura: 0,
    montaje: 0,
    cerrajeria: 0,
    totalGeneral: 0,
  });

  const [presupuesto, setPresupuesto] = useState();

  const today = new Date().toISOString().split("T")[0];

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: async (formData) => {
      // console.log(formData);
      // Ahora envía el formulario completo a tu API
      formData.diseno.forEach((item, index) => {
        item.imagenes = images.diseno?.[index] || [];
      });

      formData.impresion.forEach((item, index) => {
        item.imagenes = images.impresion?.[index] || [];
      });

      formData.corte.forEach((item, index) => {
        item.imagenes = images.corte?.[index] || [];
      });

      formData.cerrajeria.forEach((item, index) => {
        item.imagenes = images.cerrajeria?.[index] || [];
      });

      formData.pintura.forEach((item, index) => {
        item.imagenes = images.pintura?.[index] || [];
      });

      formData.montaje.forEach((item, index) => {
        item.imagenes = images.montaje?.[index] || [];
      });

      if (files.videos) {
        formData.videos = [].concat(...files.videos);
      }

      try {
        await budgetCtrl.createBudget(formData);
      } catch (error) {
        console.log(error);
      }
    },
  });

  const updatePresupuesto = () => {
    let newPresupuesto = "";

    if (formik.values.diseno.length > 0) newPresupuesto += "D";
    if (formik.values.impresion.length > 0) newPresupuesto += "I";
    if (formik.values.corte.length > 0) newPresupuesto += "C";
    if (formik.values.cerrajeria.length > 0) newPresupuesto += "CE";
    if (formik.values.pintura.length > 0) newPresupuesto += "P";
    if (formik.values.montaje.length > 0) newPresupuesto += "M";

    setPresupuesto(newPresupuesto);
  };

  // Agrega el servicio seleccionado en el FormArray de formik
  const handleServiceClick = (serviceName) => {
    switch (serviceName) {
      case "Diseño":
        formik.setFieldValue("diseno", [...formik.values.diseno, newDesign]);
        break;
      // Añade casos similares para otros servicios si es necesario.
      case "Impresión":
        formik.setFieldValue("impresion", [
          ...formik.values.impresion,
          newPrint,
        ]);
        break;

      case "Corte":
        formik.setFieldValue("corte", [...formik.values.corte, newCut]);
        break;

      case "Cerrajeria":
        formik.setFieldValue("cerrajeria", [
          ...formik.values.cerrajeria,
          newLockSmith,
        ]);
        break;

      case "Pintura":
        formik.setFieldValue("pintura", [...formik.values.pintura, newPaint]);
        break;

      case "Montaje":
        formik.setFieldValue("montaje", [...formik.values.montaje, newMounting])
        break;

      default:
        break;
    }
  };

  useEffect(() => {
    let totalDesign = formik.values.diseno.reduce(
      (acc, curr) => acc + (curr.precio || 0),
      0
    );
    let totalPrint = formik.values.impresion.reduce(
      (acc, curr) => acc + (curr.precio || 0),
      0
    );
    let totalCut = formik.values.corte.reduce(
      (acc, curr) => acc + (curr.precio || 0),
      0
    );

    // Suma los totales de cada componente para obtener el total general
    let totalSum = totalDesign + totalPrint + totalCut;

    // Actualiza el estado con el total
    setTotal({
      ...total,
      diseno: totalDesign,
      impresion: totalPrint,
      corte: totalCut,
      totalGeneral: totalSum,
    });
    updatePresupuesto();
  }, [formik.values]);

  return (
    <>
      {/* {JSON.stringify(formik.errors)} */}
      <FormikProvider value={formik}>
        <form onSubmit={formik.handleSubmit}>
          <div className="2xl:h-[calc(100vh-120px)] 2xl:flex mt-[-40px]">
            <div className="2xl:flex-1 2xl:flex 2xl:overflow-hidden">
              <div className="p-3 2xl:flex-1 2xl:overflow-y-scroll">
                <div className="mt-5 px-5">
                  <div>
                    <h2 className="text-title-md font-semibold text-black dark:text-white">
                      PRESUPUESTO
                    </h2>

                    {formik.touched.campo && formik.errors.campo ? (
                      <div className="error-message">{errors.campo}</div>
                    ) : null}

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-primary font-bold">
                          PR{presupuesto}0003
                        </p>
                        <input
                          className={`formulario ${
                            formik.touched.nombre && formik.errors.nombre
                              ? "errores"
                              : ""
                          }`}
                          type="text"
                          placeholder="Nombre del presupuesto"
                          name="nombre"
                          value={formik.values.nombre}
                          onChange={formik.handleChange}
                        />
                      </div>
                      {/* <p className="font-bold text-base">PLACA METACRILATO</p> */}
                      <div className="flex flex-col items-end justify-end">
                        <label htmlFor="aprovacion" className="ml-2 labels">
                          Aprovación
                        </label>
                        <input
                          id="aprovacion"
                          type="checkbox"
                          className="w-9 h-9 accent-primary"
                          name="aprovacion"
                          checked={formik.values.aprovacion}
                          onChange={formik.handleChange}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center mt-2">
                    <div className="flex flex-col gap-2">
                      <input
                        type="text"
                        className={`formulario ${
                          formik.touched.cliente && formik.errors.cliente
                            ? "errores"
                            : ""
                        }`}
                        placeholder="Cliente"
                        name="cliente"
                        value={formik.values.cliente}
                        onChange={formik.handleChange}
                      />

                      <input
                        type="string"
                        className={`formulario ${
                          formik.touched.contacto && formik.errors.contacto
                            ? "errores"
                            : ""
                        }`}
                        placeholder="Contacto"
                        name="contacto"
                        value={formik.values.contacto}
                        onChange={formik.handleChange}
                      />
                    </div>

                    <div className="flex flex-col items-end justify-end">
                      <label htmlFor="aprovacion" className="ml-2 labels">
                        Prioridad
                      </label>
                      <select
                        className={`formulario ${
                          formik.touched.prioridad && formik.errors.prioridad
                            ? "errores"
                            : ""
                        }`}
                        name="prioridad"
                        value={formik.values.prioridad}
                        required
                        onChange={formik.handleChange}
                      >
                        <option>seleccione</option>
                        <option value="baja">Baja</option>
                        <option value="media">Media</option>
                        <option value="alta">Alta</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="rounded-xl mt-5 p-5 border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                  {/* Date */}
                  <div className="flex gap-2 items-center">
                    <label className="font-bold text-black" htmlFor="fecha">
                      Fecha
                    </label>
                    <input
                      id="fecha"
                      min={today}
                      // "custom-input-date custom-input-date-1 rounded border-[1.5px] border-stroke bg-transparent py-2 px-5 font-medium outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      className={`formulario custom-input-date custom-input-date-1 w-40 rounded ${
                        formik.touched.fecha && formik.errors.fecha
                          ? "errores"
                          : ""
                      }`}
                      type="date"
                      name="fecha"
                      value={formik.values.fecha}
                      onChange={formik.handleChange}
                    />
                  </div>

                  {/* Descripcion */}
                  <div className="mt-5">
                    <label
                      className="font-bold text-black"
                      htmlFor="descripcion"
                    >
                      Descripcion
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Describe el proyecto"
                      className={`formulario ${
                        formik.touched.descripcion && formik.errors.descripcion
                          ? "errores"
                          : ""
                      }`}
                      name="descripcion"
                      value={formik.values.descripcion}
                      onChange={formik.handleChange}
                    ></textarea>
                  </div>

                  {/* Servicios */}
                  <div className="grid grid-cols-3 mt-5 auto-cols-auto gap-4 md:grid-cols-6 lg:grid-cols-6 xl:auto-cols-min">
                    {servicios.map(({ nombre, color, imagen }) => (
                      <div
                        key={nombre}
                        className="text-center max-w-35 cursor-pointer transition"
                        onClick={() => handleServiceClick(nombre)}
                      >
                        <div
                          className={`p-7 rounded-3xl flex flex-col items-center transition justify-center hover:scale-105 duration-300`}
                          style={{ backgroundColor: color + "20" }}
                        >
                          <Image
                            src={imagen}
                            alt="presupuestos"
                            width={100}
                            height={100}
                            className="w-10 h-10 sm:w-10 sm:h-10"
                          />
                          <p className=" text-black mt-2 text-sm font-bold">
                            {nombre}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Puesta en marcha */}
                  <div className="flex gap-2 mt-5 justify-between">
                    <div className="flex items-center gap-3">
                      <label
                        htmlFor="en_marcha"
                        className="font-bold text-black"
                      >
                        Puesta en marcha
                      </label>
                      <input
                        id="en_marcha"
                        type="checkbox"
                        className="w-5 h-5 accent-primary"
                        name="puesta_en_marcha"
                        checked={formik.values.puesta_en_marcha}
                        onChange={formik.handleChange}
                      />
                    </div>
                    <p className="font-bold text-black dark:text-whiten">50€</p>
                  </div>

                  <div className="grid rid-flow-row-dense md:grid-cols-2 gap-4 lg:grid-cols-3 gap-4">
                    {/* FOrmulario de diseño */}
                    <FieldArray
                      name="diseno"
                      render={(arrayHelpers) => (
                        <>
                          {formik.values.diseno.map((_, index) => (
                            <Design
                              index={index}
                              arrayHelpers={arrayHelpers}
                              key={index}
                              formik={formik}
                              onRemove={() => {
                                arrayHelpers.remove(index);
                                handleImageRemove("diseno", index);
                              }}
                              handleFileChange={handleFileChange}
                              images={images}
                              handleImageRemove={handleImageRemove}
                            />
                          ))}
                        </>
                      )}
                    />

                    <FieldArray
                      name="impresion"
                      render={(arrayHelpers) => (
                        <>
                          {formik.values.impresion.map((_, index) => (
                            <Print
                              index={index}
                              arrayHelpers={arrayHelpers}
                              key={index}
                              formik={formik}
                              onRemove={() => {
                                arrayHelpers.remove(index);
                                handleImageRemove("impresion", index);
                              }}
                              handleFileChange={handleFileChange}
                              images={images}
                              handleImageRemove={handleImageRemove}
                            />
                          ))}
                        </>
                      )}
                    />

                    <FieldArray
                      name="corte"
                      render={(arrayHelpers) => (
                        <>
                          {formik.values.corte.map((_, index) => (
                            <Cut
                              index={index}
                              arrayHelpers={arrayHelpers}
                              key={index}
                              formik={formik}
                              onRemove={() => {
                                arrayHelpers.remove(index);
                                handleImageRemove("corte", index);
                              }}
                              handleFileChange={handleFileChange}
                              images={images}
                              handleImageRemove={handleImageRemove}
                            />
                          ))}
                        </>
                      )}
                    />

                    <FieldArray
                      name="cerrajeria"
                      render={(arrayHelpers) => (
                        <>
                          {formik.values.cerrajeria.map((_, index) => (
                            <Locksmith
                              index={index}
                              arrayHelpers={arrayHelpers}
                              key={index}
                              formik={formik}
                              onRemove={() => {
                                arrayHelpers.remove(index);
                                handleImageRemove("cerrajeria", index);
                              }}
                              handleFileChange={handleFileChange}
                              images={images}
                              handleImageRemove={handleImageRemove}
                              FieldArray={FieldArray}
                            />
                          ))}
                        </>
                      )}
                    />

                    <FieldArray
                      name="pintura"
                      render={(arrayHelpers) => (
                        <>
                          {formik.values.pintura.map((_, index) => (
                            <Paint
                              index={index}
                              arrayHelpers={arrayHelpers}
                              key={index}
                              formik={formik}
                              onRemove={() => {
                                arrayHelpers.remove(index);
                                handleImageRemove("pintura", index);
                              }}
                              handleFileChange={handleFileChange}
                              images={images}
                              handleImageRemove={handleImageRemove}
                              FieldArray={FieldArray}
                            />
                          ))}
                        </>
                      )}
                    />

                    <FieldArray
                      name="montaje"
                      render={(arrayHelpers) => (
                        <>
                          {formik.values.montaje.map((_, index) => (
                            <Mounting
                              index={index}
                              arrayHelpers={arrayHelpers}
                              key={index}
                              formik={formik}
                              onRemove={() => {
                                arrayHelpers.remove(index);
                                handleImageRemove("montaje", index);
                              }}
                              handleFileChange={handleFileChange}
                              images={images}
                              handleImageRemove={handleImageRemove}
                              FieldArray={FieldArray}
                            />
                          ))}
                        </>
                      )}
                    />

                  </div>

                  <Contenido
                    handleMultimediaChange={handleMultimediaChange}
                    files={files}
                    loading={loading}
                    formik={formik}
                    setFiles={setFiles}
                  />
                </div>
              </div>
            </div>
            <div className="2xl:w-94 p-3">
              <Sumaries total={total} formik={formik} />
              <button
                type="submit"
                className="w-full bg-primary mt-5 p-3 rounded-xl text-white uppercase "
              >
                Crear Presupuesto
              </button>
            </div>
          </div>
        </form>
      </FormikProvider>
    </>
  );
}

"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
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
import useImageUpload from "@/hooks/useImageUploadFormik";
import { useFilesUpload } from "@/hooks/useFilesUpload";
import Loader from "@/components/common/Loader";
import { servicios } from "@/utils";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "react-toastify";
import { SearchClient } from "@/components/clientes/SearchClient";

const budgetCtrl = new Budget();

export default function NuevoProyecto() {
  const router = useRouter();

  const {
    files,
    handleMultimediaChange,
    loading,
    setFiles,
    uploadAudioFromBlob,
  } = useFilesUpload({});
  const [loadingForm, setLoadingForm] = useState(false);

  const [presupuesto, setPresupuesto] = useState();

  const [preciosServicios, setPreciosServicios] = useState({});

  const { user } = useAuth();

  const today = new Date().toISOString().split("T")[0];

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: async (formData) => {
      setLoadingForm(true);

      const departamentos = [
        "diseno",
        "impresion",
        "corte",
        "cerrajeria",
        "pintura",
        "montaje",
      ];

      const asignarDepartamento = (formData) => {
        for (const departamento of departamentos) {
          if (formData[departamento]?.length > 0) {
            formData.departamento = departamento;
            break;
          }
        }

        if (formData.departamento === "")
          notify("Debe de agregar al menos un departamento", "error");
      };

      asignarDepartamento(formData);
      // Fin
      formData.creador = user.username;
      formData.idpresupuesto = presupuesto;
      formData.estado = "en cola";

      departamentos.forEach((departamento) => {
        formData[departamento].forEach((item, index) => {
          item.imagenes = item.imagenes[index] || [];
        });
      });

      if (files.videos) {
        formData.videos = [].concat(...files.videos);
      }

      if (files.audios) {
        formData.audios = [].concat(...files.audios);
      }

      if (files.fotos) {
        formData.fotos = [].concat(...files.fotos);
      }

      try {
        const res = await budgetCtrl.createBudget(formData);
        setLoadingForm(false);

        if (!!res.error) throw res;

        notify("Proyecto creado con exito", "success");
        router.push("/proyectos");
      } catch (error) {
        console.log(error);
        setLoadingForm(false);

        // Muestra un mensaje de error usando Toastify
        notify("No se ha enviado el formulario", "err");
      }
      ro;
    },
  });

  const {
    images,
    handleFileChange,
    loading: loadingImage,
    handleImageRemove,
  } = useImageUpload(formik);

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

  useEffect(() => {
    updatePresupuesto();
  }, [formik.values]);

  useEffect(() => {
    const getPrices = async () => {
      const precios = await budgetCtrl.getPrecios();
      setPreciosServicios(precios.data.attributes);
    };

    getPrices();
  }, []);

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
        formik.setFieldValue("montaje", [
          ...formik.values.montaje,
          newMounting,
        ]);
        break;

      default:
        break;
    }
  };

  const notify = (mensaje, type = "") =>
    type === "" ? toast(mensaje) : toast[type](mensaje);

  const handleCustomSubmit = () => {
    // Primero, forzamos la validación de Formik
    formik.validateForm().then((errors) => {
      // Si hay errores, mostramos un toast y no enviamos el formulario
      if (Object.keys(errors).length > 0) {
        notify(
          "Hay errores en el formulario. Por favor, corrígelos antes de enviar.",
          "error"
        );
        formik.handleSubmit();
      } else {
        // Si no hay errores, enviamos el formulario
        formik.handleSubmit();
      }
    });
  };

  return (
    <>
      {/* {JSON.stringify(user)}  */}
      {/* {JSON.stringify(formik.errors)} */}
      {/* {JSON.stringify(formik.values)} */}
      {/* {JSON.stringify(preciosServicios)} */}
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

                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <p className="text-primary font-bold">
                          PR{presupuesto}
                        </p>
                        <div className="w-full min-w-75">
                          <SearchClient formik={formik}/>
                        </div>

                        {/* <input
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
                        /> */}
                      </div>
                      {/* <p className="font-bold text-base">PLACA METACRILATO</p> */}
                      <div className="flex sm:flex-col gap-3">
                        <div className="flex flex-col sm:items-end items-center">
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
                        <div className="flex flex-col items-end">
                          <label htmlFor="aprovacion" className="ml-2 labels">
                            Prioridad
                          </label>
                          <input
                            id="prioridad"
                            type="checkbox"
                            className="w-9 h-9 accent-primary"
                            name="prioridad"
                            checked={formik.values.prioridad}
                            onChange={formik.handleChange}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center mt-2">
                    {/* <div className="flex flex-col gap-2">
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
                    </div> */}

                    <div className="flex flex-col items-end justify-end">
                      {/* <label htmlFor="aprovacion" className="ml-2 labels">
                        Prioridad
                      </label>
                      <input
                        id="prioridad"
                        type="checkbox"
                        className="w-9 h-9 accent-primary"
                        name="prioridad"
                        checked={formik.values.prioridad}
                        onChange={formik.handleChange}
                      /> */}
                    </div>
                  </div>
                </div>
                <div className="rounded-xl mt-5 p-5 border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                  {/* Date */}
                  <div className="flex gap-2 items-center">
                    <label className="font-bold text-black" htmlFor="fecha">
                      Fecha de entrega
                    </label>
                    <input
                      id="fecha"
                      min={today}
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
                    <input
                      type="time"
                      step="3600000"
                      name="hora"
                      className={`formulario w-30 rounded ${
                        formik.touched.hora && formik.errors.hora
                          ? "errores"
                          : ""
                      }`}
                      value={formik.values.hora}
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
                  {formik.errors.departamento && (
                    <div style={{ color: "red" }}>
                      {formik.errors.departamento}
                    </div>
                  )}
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
                              loadingImage={loadingImage}
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
                              loadingImage={loadingImage}
                              formik={formik}
                              onRemove={() => {
                                arrayHelpers.remove(index);
                                handleImageRemove("impresion", index);
                              }}
                              handleFileChange={handleFileChange}
                              images={images}
                              handleImageRemove={handleImageRemove}
                              preciosServicios={preciosServicios}
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
                              loadingImage={loadingImage}
                              onRemove={() => {
                                arrayHelpers.remove(index);
                                handleImageRemove("corte", index);
                              }}
                              handleFileChange={handleFileChange}
                              images={images}
                              handleImageRemove={handleImageRemove}
                              preciosServicios={preciosServicios}
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
                              loadingImage={loadingImage}
                              onRemove={() => {
                                arrayHelpers.remove(index);
                                handleImageRemove("cerrajeria", index);
                              }}
                              handleFileChange={handleFileChange}
                              images={images}
                              handleImageRemove={handleImageRemove}
                              FieldArray={FieldArray}
                              preciosServicios={preciosServicios}
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
                              loadingImage={loadingImage}
                              onRemove={() => {
                                arrayHelpers.remove(index);
                                handleImageRemove("pintura", index);
                              }}
                              handleFileChange={handleFileChange}
                              images={images}
                              handleImageRemove={handleImageRemove}
                              FieldArray={FieldArray}
                              preciosServicios={preciosServicios}
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
                              loadingImage={loadingImage}
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
                </div>
                <Contenido
                  handleMultimediaChange={handleMultimediaChange}
                  files={files}
                  loading={loading}
                  formik={formik}
                  setFiles={setFiles}
                  uploadAudioFromBlob={uploadAudioFromBlob}
                />
              </div>
            </div>
            <div className="2xl:w-94 p-3">
              <Sumaries formik={formik} files={files} />

              {loadingForm ? (
                <a className="flex items-center justify-center w-full bg-white mt-5 p-3 rounded-xl text-graydark uppercase shadow-8 gap-3">
                  <Loader tamano="30px" /> Validando...
                </a>
              ) : (
                // <button
                //   type="submit"
                //   className="w-full bg-primary mt-5 p-3 rounded-xl text-white uppercase "
                // >
                //   Crear Presupuesto
                // </button>

                <button
                  type="button"
                  className="w-full bg-primary mt-5 p-3 rounded-xl text-white uppercase "
                  onClick={handleCustomSubmit}
                >
                  Enviar
                </button>
              )}
            </div>
          </div>
        </form>
      </FormikProvider>
    </>
  );
}

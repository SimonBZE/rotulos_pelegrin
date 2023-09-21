"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Print, Mounting, Paint, Locksmith, Cut, Sumaries } from "./components";
import FieldDesign  from "./components/FieldArray";
import { Budget } from "@/api";
import * as Yup from "yup";
import { useFormik, FormikProvider, FieldArray } from "formik";

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
    nombre: "Cerrajería",
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

const disenoSchema = Yup.object().shape({
  horas: Yup.number()
    .required("Horas es requerido")
    .min(1, "Debe ser al menos 1 hora"),
  unidades: Yup.number()
    .required("Unidades es requerido")
    .min(1, "Debe ser al menos 1 unidad"),
  precio: Yup.number()
    .required("Precio es requerido")
    .min(0, "El precio no puede ser negativo"),
});

const validationSchema = Yup.object({
  nombre: Yup.string().required("Debe añadir un nombre al presupuesto"),
  cliente: Yup.string().required("Debe añadir el nombre del cliente"),
  contacto: Yup.number().required("Debe añadir un número de contacto"),
  aprovacion: Yup.boolean(),
  prioridad: Yup.string().required("Debe elegir el nivel de prioridad"),
  fecha: Yup.date().required("Debe establecer una fecha de entrega"),
  descripcion: Yup.string(),
  puesta_en_marcha: Yup.boolean(),
  diseno: Yup.array().of(disenoSchema),
});

const newDesign = {
  unidades: "",
  horas: "",
  precio: "",
  imagenes: []
};

const budgetCtrl = new Budget();

export default function NuevoProyecto() {
  const [selectedService, setSelectedService] = useState(null);

  const [presupuesto, setPresupuesto] = useState("pr{iniciales}0001");



  const initialValues = {
    nombre: "",
    cliente: "",
    contacto: "",
    aprovacion: false,
    prioridad: "",
    fecha: "",
    descripcion: "",
    puesta_en_marcha: false,
    diseno: [],
    impresion: [],
    corte: [],
    cerrajeria: [],
    pintura: [],
    montaje: [],
  };

  const today = new Date().toISOString().split("T")[0];

  // const [aprovacion, setAprovacion] = useState(initialValues.aprovacion)
  // const submit = budgetCtrl.createBudget(formData);

  // handleSubmit(formData, url)

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: async (formData) => {
      console.log(formData);
      try {
        await budgetCtrl.createBudget(formData);
      } catch (error) {
        console.log(error);
      }
    },
  });

  // Agrega el servicio seleccionado en el FormArray de formik
  const handleServiceClick = (serviceName) => {
    switch (serviceName) {
      case "Diseño":
        formik.setFieldValue("diseno", [...formik.values.diseno, newDesign]);
        break;
      // Añade casos similares para otros servicios si es necesario.
      default:
        break;
    }
  };

  return (
    <>
      <FormikProvider value={formik}>
        <form onSubmit={formik.handleSubmit}>
          <div className="2xl:h-screen 2xl:flex">
            <div className="2xl:flex-1 2xl:flex 2xl:overflow-hidden">
              <div className="2xl:flex-1 2xl:overflow-y-scroll">
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
                              ? "border-danger"
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
                            ? "border-danger"
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
                            ? "border-danger"
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
                            ? "border-danger"
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
                      className="custom-input-date custom-input-date-1 rounded border-[1.5px] border-stroke bg-transparent py-2 px-5 font-medium outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
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
                          ? "border-danger"
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
                        <div>
                          {formik.values.diseno.map((_, index) => (
                            <FieldDesign
                              index={index}
                              arrayHelpers={arrayHelpers}
                              key={index}
                              onRemove={() => arrayHelpers.remove(index)}
                            />
                          ))}
                          <button
                            type="button"
                            onClick={() => arrayHelpers.push({})}
                            className="mt-3 p-2 bg-blue-500 text-white"
                          >
                            Añadir Diseño
                          </button>
                        </div>
                      )}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="2xl:w-94">
              <Sumaries />
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

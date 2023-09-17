"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import useForm from "@/hooks/useForm";
import { Print, Mounting, Paint, Locksmith, Cut, Sumaries, Design } from "./components";
import {Budget} from '@/api'


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

const budgetCtrl = new Budget();

export default function NuevoProyecto() {

  const [componentCounts, setComponentCounts] = useState({
    diseno: 0,
    impresion: 0,
    corte: 0,
    cerrajeria: 0,
    pintura: 0,
    montaje: 0,
  });

  const [presupuesto, setPresupuesto] = useState("pr{iniciales}0001");

  
  

  useEffect(() => {
    const generatePresupuesto = () => {
      let prefix = ""; // Reemplaza `{iniciales}` por las iniciales que desees.

      if (componentCounts.diseno > 0) prefix += "D";
      if (componentCounts.impresion > 0) prefix += "I";
      if (componentCounts.corte > 0) prefix += "C";
      if (componentCounts.cerrajeria > 0) prefix += "CE";
      if (componentCounts.pintura > 0) prefix += "P";
      if (componentCounts.montaje > 0) prefix += "M";

      return prefix;
    };

    setPresupuesto(generatePresupuesto());
  }, [componentCounts]);

  const initialValues = {
    nombre: "",
    presupuesto: "",
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
  const {
    values,
    handleChange,
    handleComponentChange,
    addComponent,
    removeComponent,
    handleSubmit,
    
  } = useForm(initialValues, async (formData) => {
   try{
    await budgetCtrl.createBudget(formData)
   }catch (error){
    console.log(error)
   }
    
    
  });

  // handleSubmit(formData, url)

  const addService = (servicio) => {
    if (servicio === "Diseño") {
      addComponent("diseno");
    }

    if (servicio === "Impresión") {
      addComponent("impresion");
    }

    if (servicio === "Corte") {
      addComponent("corte");
    }

    if (servicio === "Montaje") {
      addComponent("montaje");
    }

    if (servicio === "Cerrajería") {
      addComponent("cerrajeria");
    }

    if (servicio === "Pintura") {
      addComponent("pintura");
    }
  };

  useEffect(() => {
    setComponentCounts({
      diseno: values.diseno.length,
      impresion: values.impresion.length,
      corte: values.corte.length,
      cerrajeria: values.cerrajeria.length,
      pintura: values.pintura.length,
      montaje: values.montaje.length,
    });
  }, [values]);

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="2xl:h-screen 2xl:flex">
          <div className="2xl:flex-1 2xl:flex 2xl:overflow-hidden">
            <div className="2xl:flex-1 2xl:overflow-y-scroll">
              <div className="mt-5 px-5">
                <div>
                  <h2 className="text-title-md font-semibold text-black dark:text-white">
                    PRESUPUESTO
                  </h2>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-primary font-bold">
                        PR{presupuesto}0003
                      </p>
                      <input
                        className={`formulario`}
                        type="text"
                        placeholder="Nombre del presupuesto"
                        name="nombre"
                        value={values.nombre}
                        onChange={handleChange}
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
                        checked={values.aprovacion}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-between items-center mt-2">
                  <div className="flex flex-col gap-2">
                    <input
                      type="text"
                      className="formulario"
                      placeholder="Cliente"
                      name="cliente"
                      value={values.cliente}
                      onChange={handleChange}
                    />

                    <input
                      type="number"
                      className="formulario"
                      placeholder="Contacto"
                      name="contacto"
                      value={values.contacto}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="flex flex-col items-end justify-end">
                    <label htmlFor="aprovacion" className="ml-2 labels">
                      Prioridad
                    </label>
                    <select
                      className="bg-white relative w-full appearance-none rounded border border-stroke bg-transparent py-2 px-6 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input"
                      name="prioridad"
                      value={values.prioridad}
                      required
                      onChange={handleChange}
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
                    value={values.fecha}
                    onChange={handleChange}
                  />
                </div>

                {/* Descripcion */}
                <div className="mt-5">
                  <label className="font-bold text-black" htmlFor="descripcion">
                    Descripcion
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Describe el proyecto"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:bg-form-input"
                    name="descripcion"
                    value={values.Descripcion}
                    onChange={handleChange}
                  ></textarea>
                </div>

                {/* Servicios */}
                <div className="grid grid-cols-3 mt-5 auto-cols-auto gap-4 md:grid-cols-6 lg:grid-cols-6 xl:auto-cols-min">
                  {servicios.map(({ nombre, color, imagen }) => (
                    <div
                      key={nombre}
                      className="text-center max-w-35 cursor-pointer transition"
                      onClick={() => addService(nombre)}
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
                    <label htmlFor="en_marcha" className="font-bold text-black">
                      Puesta en marcha
                    </label>
                    <input
                      id="en_marcha"
                      type="checkbox"
                      className="w-5 h-5 accent-primary"
                      name="puesta_en_marcha"
                      checked={values.puesta_en_marcha}
                      onChange={handleChange}
                    />
                  </div>
                  <p className="font-bold text-black dark:text-whiten">50€</p>
                </div>

                <div className="grid rid-flow-row-dense md:grid-cols-2 gap-4 lg:grid-cols-3 gap-4">
                  {/* FOrmulario de diseño */}
                  {values.diseno.map((diseno, index) => {
                    return (
                      <Design
                        key={index}
                        index={index}
                        data={values.diseno[index]}
                        onChange={handleComponentChange}
                        onRemove={() => removeComponent("diseno", index)}
                      />
                    );
                  })}

                  {/* Formulario de Impresion */}
                  {values.impresion.map((impresion, index) => (
                    <Print
                      key={index}
                      index={index}
                      data={values.impresion[index]}
                      onChange={handleComponentChange}
                      onRemove={() => removeComponent("impresion", index)}
                    />
                  ))}

                  {/* Formulario de corte */}

                  {values.corte.map((cortes, index) => (
                    <Cut
                      key={index}
                      index={index}
                      data={values.corte[index]}
                      onChange={handleComponentChange}
                      onRemove={() => removeComponent("corte", index)}
                    />
                  ))}

                  {/* Formulario de cerrajeria */}

                  {values.cerrajeria.map((cerrajerias, index) => (
                    <Locksmith
                      key={index}
                      index={index}
                      data={values.cerrajeria[index]}
                      onChange={handleComponentChange}
                      onRemove={() => removeComponent("cerrajeria", index)}
                    />
                  ))}

                  {/* Formulario de pintura */}

                  {values.pintura.map((pinturas, index) => (
                    <Paint
                      key={index}
                      index={index}
                      data={values.pintura[index]}
                      onChange={handleComponentChange}
                      onRemove={() => removeComponent("pintura", index)}
                    />
                  ))}

                  {/* Formulario de montaje */}

                  {values.montaje.map((montaje, index) => (
                    <Mounting
                      key={index}
                      index={index}
                      data={values.montaje[index]}
                      onChange={handleComponentChange}
                      onRemove={() => removeComponent("montaje", index)}
                    />
                  ))}
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
    </>
  );
}

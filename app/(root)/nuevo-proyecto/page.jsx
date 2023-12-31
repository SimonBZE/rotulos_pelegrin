"use client";

import Image from "next/image";
import { Design } from "./components/Design";
import useForm from "@/hooks/useForm";
import { Print } from "./components/Print";

import { Mounting } from "./components/Mounting";
import { Paint } from "./components/Paint";
import { Locksmith } from "./components/Locksmith";
import { Cut } from "./components/Cut";
import { Sumaries } from "./components/Sumaries";

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

export default function NuevoProyecto() {
  // const [diseno, setDiseno] = useState([]);

  const initialValues = {
    Nombre: "",
    presupuesto: "",
    prioridad: "",
    Descripcion: "",
    Diseno: [],
    Impresion: [],
    Corte: [],
    cerrajeria: [],
    pintura: [],
    Montaje: [],
  };

  const {
    values,
    handleChange,
    handleComponentChange,
    addComponent,
    removeComponent,
    handleSubmit,
  } = useForm(initialValues, (formData) => {
    console.log("Datos enviados:", formData);
  });

  const addService = (servicio) => {
    console.log(servicio)
    if (servicio === "Diseño") {
      addComponent("Diseno");
    }

    if (servicio === "Impresión") {
      addComponent("Impresion");
    }

    if (servicio === "Corte") {
      addComponent("Corte");
    }

    if (servicio === "Montaje") {
      addComponent("Montaje");
    }

    if (servicio === "Cerrajería") {
      addComponent("cerrajeria");
    }

    if (servicio === "Pintura") {
      addComponent("pintura");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="mt-5 px-5">
          <div>
            <h2 className="text-title-md font-semibold text-black dark:text-white">
              PRESUPUESTO
            </h2>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-primary font-bold">PRDCM00003</p>
                <input
                  className="formulario"
                  type="text"
                  placeholder="Nombre del presupuesto"
                  name="Nombre"
                  value={values.Nombre}
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
                />
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm mt-5">CLIENTE: ALEMAN CARS</p>
              <p className="text-sm mt-2">CONTACTO: 975 65 65 54</p>
            </div>
            <div className="flex flex-col items-end justify-end">
              <label htmlFor="aprovacion" className="ml-2 labels">
                Prioridad
              </label>
              <select
                className="bg-white relative w-full appearance-none rounded border border-stroke bg-transparent py-2 px-6 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input"
                name="prioridad"
                value={values.prioridad}
                onChange={handleChange}
              >
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
              className="custom-input-date custom-input-date-1 rounded border-[1.5px] border-stroke bg-transparent py-2 px-5 font-medium outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
              type="date"
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
              name="Descripcion"
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
                  <p className=" text-black mt-2 text-sm font-bold">{nombre}</p>
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
              />
            </div>
            <p className="font-bold text-black dark:text-whiten">50€</p>
          </div>

          <div className="grid md:grid-cols-2 gap-4 lg:grid-cols-3 gap-4">
            {/* FOrmulario de diseño */}
            {values.Diseno.map((diseno, index) => {
              return (
                <Design
                  key={index}
                  index={index}
                  data={values.Diseno[index]}
                  onChange={handleComponentChange}
                  onRemove={() => removeComponent("Diseno", index)}
                />
              );
            })}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Formulario de Impresion */}
            {values.Impresion.map((impresion, index) => (
              <Print
                key={index}
                index={index}
                data={values.Impresion[index]}
                onChange={handleComponentChange}
                onRemove={() => removeComponent("Impresion", index)}
              />
            ))}
          </div>

          {/* Formulario de corte */}

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {values.Corte.map((cortes, index) => (
              <Cut
                key={index}
                index={index}
                data={values.Corte[index]}
                onChange={handleComponentChange}
                onRemove={() => removeComponent("Corte", index)}
              />
            ))}
          </div>

          {/* Formulario de cerrajeria */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {values.cerrajeria.map((cerrajerias, index) => (
              <Locksmith
                key={index}
                index={index}
                data={values.cerrajeria[index]}
                onChange={handleComponentChange}
                onRemove={() => removeComponent("cerrajeria", index)}
              />
            ))}
          </div>

          {/* Formulario de pintura */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {values.pintura.map((pinturas, index) => (
              <Paint
                key={index}
                index={index}
                data={values.pintura[index]}
                onChange={handleComponentChange}
                onRemove={() => removeComponent("pintura", index)}
              />
            ))}
          </div>

          {/* Formulario de montaje */}

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {values.Montaje.map((montaje, index) => (
              <Mounting
                key={index}
                index={index}
                data={values.Montaje[index]}
                onChange={handleComponentChange}
                onRemove={() => removeComponent("Montaje", index)}
              />
            ))}
          </div>

        </div>

        <Sumaries />

        <button
          type="submit"
          className="w-full bg-primary mt-5 p-3 rounded-xl text-white uppercase "
        >
          Crear Presupuesto
        </button>
      </form>
    </>
  );
}

import { useEffect, useState } from "react";

import Link from "next/link";

import { CiCalendar } from "react-icons/ci";

import { colors } from "@/utils/menus";
import { ProgresoDep } from "@/components/common/ProgesoDep";
import { servicios } from "@/utils";
import Image from "next/image";

export const CardProjects = ({ proyecto, params }) => {
  // Filtrar las tareas completadas
  const [departamentosActivos, setDepartamentosActivos] = useState([]);

  const obtenerDepartamentosActivos = (proyecto) => {
    const departamentos = [
      "diseno",
      "impresion",
      "corte",
      "cerrajeria",
      "pintura",
      "montaje",
    ];

    return departamentos.filter(
      (depto) =>
        proyecto.attributes[depto] && proyecto.attributes[depto].length > 0
    );
  };

  useEffect(() => {
    const activos = obtenerDepartamentosActivos(proyecto);
    setDepartamentosActivos(activos);
  }, [proyecto]);

  const estado =
    proyecto.attributes.departamento === params
      ? proyecto.attributes.estado_departamento
      : "pendiente";

  return (
    <Link href={`/proyecto/${proyecto.id}`}>
      <div
        className="rounded-xl p-5 m-2 bg-white"
        style={
          proyecto.attributes.prioridad
            ? { background: "#F871A0" }
            : { background: colors[estado] }
        }
      >
        <div className="flex">
        <div className="w-9/12 flex flex-col justify-center">
          <p className="labels uppercase text-primary">
            PR{proyecto.attributes.idpresupuesto}
            {proyecto.id} <span>{estado}</span>
          </p>
          <p className="labels">{proyecto.attributes.nombre}</p>
          <p className="labels">
            Departamento actual:{" "}
            <span className="font-thin capitalize">
              {" "}
              {proyecto.attributes.departamento}{" "}
            </span>
          </p>
          <p className="labels">{proyecto.attributes.cliente}</p>
          <p className="labels flex gap-2 items-center">
            {proyecto.attributes.fecha} <CiCalendar className="ml-[-5px]" />
            {proyecto.attributes.hora?.slice(0, 5)}
          </p>
        </div>
        <ProgresoDep tareasDep={proyecto.attributes[params]} />
        </div>
        <div className="flex gap-2 overflow-x-auto mt-2">
        {servicios.map((servicio, index) => {
          if (departamentosActivos.indexOf(servicio.departamento) < 0) {
            return;
          }

          let todasLasTareasCompletadas = false;

          if (proyecto.attributes[servicio.departamento].length > 0) {
            // Comprueba si todas las tareas en el departamento están completadas
            todasLasTareasCompletadas = proyecto.attributes[
              servicio.departamento
            ].every((serv) => serv.completado);
          }

          return (
            <div
              className={`flex gap-1 p-2 rounded-md bg-white shadow-4 border-1 ${
                todasLasTareasCompletadas && "border-success border-3"}`}
              key={index}
            >
              <div className="flex justify-center items-center min-w-[70px] gap-1">
                <Image
                  width={25}
                  height={25}
                  className="ml-3 w-[25px] h-[25px] grayscale"
                  src={servicio.imagen}
                  alt={servicio.nombre}
                />
                <p className="font-sm text-sm">{servicio.nombre}</p>
              </div>
            </div>
          );
        })}
      </div>

        
      </div>
      
    </Link>
  );
};

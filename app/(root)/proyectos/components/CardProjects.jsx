import React from "react";

import Link from "next/link";

import {colors} from '@/utils/menus'
import { ProgresoDep } from "@/components/common/ProgesoDep";

export const CardProjects = ({ proyecto, params }) => {
  // Filtrar las tareas completadas

  const estado =
    proyecto.attributes.departamento === params
      ? proyecto.attributes.estado_departamento
      : "pendiente";
  return (
    <Link href={`/proyecto/${proyecto.id}`}>
      <div
        className="rounded-xl p-5 m-2 bg-white flex justify-between"
        style={{ background: colors[estado] }}
      >
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
          <p className="labels">
            {proyecto.attributes.fecha} 📅{" "}
            {proyecto.attributes.hora?.slice(0, 5)}
          </p>
        </div>
        <ProgresoDep tareasDep={proyecto.attributes[params]} />
        
      </div>
    </Link>
  );
};

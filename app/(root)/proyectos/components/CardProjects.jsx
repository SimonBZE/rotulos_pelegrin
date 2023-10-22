import React from "react";
import { ProgressBar } from "@/components/ui";
import Link from "next/link";

const colors = {
  "en proceso": "#c0ffc9",
  pendiente: "#e5e5e5",
  "en pausa": "#ffecc2",
  prioridad: "ffc2c2",
};

export const CardProjects = ({ proyecto, params }) => {
  // Filtrar las tareas completadas
  const tareasCompletadas = proyecto.attributes[params].filter(
    (tarea) => tarea.completado === true
  );
  const tareas = tareasCompletadas.length;
  const porcentaje =
    tareas === 0 ? 0 : (tareas / proyecto.attributes[params].length) * 100;
  const estado =
    proyecto.attributes.departamento === params
      ? proyecto.attributes.estado_departamento
      : "pendiente";
  return (
    <Link href={`/proyecto/${proyecto.id}`}>
      <div
        className="rounded-xl p-5 m-2 bg-white flex"
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
        <div className="w-3/12 flex justify-end gap-2 items-center flex-col md:flex-row">
          <div className="max-w-[80px]">
            <ProgressBar percentage={porcentaje} />
          </div>
          <div>
            <p>Cantidad</p>
            <p className="labels">
              {tareas} de {proyecto.attributes[params].length}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

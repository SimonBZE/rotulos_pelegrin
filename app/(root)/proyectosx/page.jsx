"use client";
import { Projects } from "@/api";
import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { ProgressBar } from "@/components/ui";



const colors = {
  "en proceso": "#c0ffc9",
  "pendiente": "#e5e5e5",
  "en pausa": "#ffecc2",
  "prioridad": "ffc2c2"
}

const departamentos = {
  diseno: 1,
  impresion: 2,
  corte: 3,
  cerrajeria: 4,
  pintura: 5,
  montaje: 6
}

const cargarProyectos = async (departamento) => {
  const projectsCtrl = new Projects();
  const filter = `?populate=*&filters[${departamento}][completado][$eq]=false`;
  const res = await projectsCtrl.getBudgets(filter);
  console.log(res);
  return res;
};

const Departamentos = () => {
  const { user } = useAuth();
  const [proyectos, setProyectos] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const res = await cargarProyectos("cerrajeria");
      setProyectos(res.data);
    };

    getData();
  }, []);

  return (
    <div>
      {proyectos.map((proyecto, index) => {
        // Filtrar las tareas completadas
        const tareasCompletadas = proyecto.attributes.cerrajeria.filter(
          (tarea) => tarea.completado === true
        );
        const tareas = tareasCompletadas.length
        const porcentaje = tareas === 0 ? 0 :    (tareas / proyecto.attributes.cerrajeria.length) *100;
        const estado = proyecto.attributes.departamento === "cerrajeria" ?  proyecto.attributes.estado_departamento : "pendiente";
        return (
          <div key={index} className="rounded-xl p-5 m-2 bg-white flex" style={{background: colors[estado]}}>
            <div className="w-9/12 flex flex-col justify-center">
              <p className="labels uppercase text-primary">
                PR{proyecto.attributes.idpresupuesto}
                {proyecto.id} <span>{estado}</span>
              </p>
              <p className="labels">{proyecto.attributes.nombre}</p>
              <p className="labels">Departamento actual: <span className="font-thin capitalize"> {proyecto.attributes.departamento} </span></p>
              <p className="labels">{proyecto.attributes.cliente}</p>
              <p className="labels">{proyecto.attributes.fecha} 📅 {proyecto.attributes.hora?.slice(0,5)}</p>
            </div>
            <div className="w-3/12 flex justify-end gap-2 items-center flex-col md:flex-row">
              <div className="max-w-[80px]">
                <ProgressBar percentage={porcentaje} />
              </div>
              <div>
                <p>Cantidad</p>
                <p className="labels">
                  {tareas} de{" "}
                  {proyecto.attributes.cerrajeria.length}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Departamentos;

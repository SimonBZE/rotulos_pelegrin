"use client";
import { Projects } from "@/api";
import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { CardProjects } from "../components/CardProjects";
import Image from "next/image";

const depart = [
  "diseno",
  "impresion",
  "corte",
  "cerrajeria",
  "pintura",
  "montaje",
];

const cargarProyectos = async (departamento) => {
  const projectsCtrl = new Projects();
  const filter = `?populate=*&filters[${departamento}][completado][$eq]=false`;
  const res = await projectsCtrl.getBudgets(filter);
  return res;
};

const Departamentos = ({ params }) => {
  const { user } = useAuth();
  const [proyectos, setProyectos] = useState([]);
  const [orden, setOrden] = useState("mas antiguos"); // Estado para el orden
  const [proximos, setProximos] = useState(false);

  useEffect(() => {
    const getData = async () => {
      const res = await cargarProyectos(params.id);
      setProyectos(res.data);
    };

    getData();
  }, [params.id]);

  // Función para ordenar los proyectos según la opción seleccionada
  const ordenarProyectos = () => {
    let proyectosOrdenados = [...proyectos];

    if (orden === "mas recientes") {
      proyectosOrdenados.sort(
        (a, b) => new Date(b.attributes.fecha) - new Date(a.attributes.fecha)
      );
    } else if (orden === "mas antiguos") {
      proyectosOrdenados.sort(
        (a, b) => new Date(a.attributes.fecha) - new Date(b.attributes.fecha)
      );
    }

    return proyectosOrdenados;
  };

  return (
    <div>
      {/* {JSON.stringify(proyectos)} */}
      <div className="flex justify-between items-center mb-5 p-5">
        <div className="flex items-center gap-3">
          <Image
            className="w-[40px] h-[40px]"
            src={`/assets/${params.id}.svg`}
            alt={params.id}
            width={40}
            height={40}
          />
          <h1 className="capitalize text-title-md text-black font-bold">
            {params.id}
          </h1>
        </div>
        <select
          className="formulario w-65"
          value={orden}
          onChange={(e) => setOrden(e.target.value)} // Actualizar el estado de orden al cambiar el select
        >
          <option value="mas recientes">↓ Más recientes</option>
          <option value="mas antiguos">↑ Más antiguos</option>
        </select>
      </div>

      {ordenarProyectos().map((proyecto, index) => {
        if (proyecto.attributes.departamento !== params.id) {
          return;
        }

        return (
          <CardProjects key={index} proyecto={proyecto} params={params.id} />
        );
      })}

      {proximos ? (
        <h3 className="text-title-md mt-5 mb-3 font-bold text-black ml-5">
          Próximos proyectos
        </h3>
      ) : null}

      {ordenarProyectos().map((proyecto, index) => {
        // Esta funcion muestra los proximos proyectos que van a llegar, pero solo muestra los que se encuentran justo en el departamento anterior al actual
        //Si el departamento es igual al departamento actual se sale del ciclo
        if (proyecto.attributes.departamento === params.id) {
          return;
        }

        let validador = {}; // En esta variable se almacenan los departamentos, al finalizar se ve algo así {corte: 2, cerrajeria: 3, montaje: 5}
        depart.forEach((dep, index) => {
          // La respuesta de la api almacena cada proyecto en un [], si este está vácio significa que no hay tareas asiganadas al departamento, si está lleno se almacena el nombre del departamento y el index en validador
          if (proyecto.attributes[dep].length > 0) validador[dep] = index;
        });

        const propiedades = Object.keys(validador);
        // dado que se van almacenando los departamento en orden en el arreglo significa que si el departamento actual +1 es igual al departamento de departamento del encargado, significa que cuando avancen la tarea será el siguiente, por eso quiero que se muestre
        if (
          propiedades.indexOf(proyecto.attributes.departamento) + 1 <
          propiedades.indexOf(params.id)
        ) return;
        
        // Si hay hay proximos trabajos que mostrar se cambia la bandera a true, se almacena en un if porque solo necesito que se cambie el estado una unica vez
        if(!proximos){
          setProximos(true)
        }

        return (
          <CardProjects
            key={index}
            proyecto={proyecto}
            params={proyecto.attributes.departamento}
          />
        );
      })}
    </div>
  );
};

export default Departamentos;

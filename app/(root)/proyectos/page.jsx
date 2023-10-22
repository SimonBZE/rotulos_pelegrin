"use client";

import { Budget } from "@/api";
import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";

const fetchData = async () => {
  const filter =
    "?filters[$or][0][estado][$eq]=en%20curso&filters[$or][0][estado][$eq]=en%20pausa&filters[$or][0][estado][$eq]=incidencia&filters[$or][0][estado][$eq]=en%20cola";
  const budgetCtrl = new Budget();
  const res = await budgetCtrl.getBudgets(filter);
  // console.log(res)
  return res;
};

import { servicios } from "@/utils";

export default function Proyectos() {
  const { user } = useAuth();


  const [proyectos, setProyectos] = useState({});
  const [contadorDepartamento, setContadorDepartamento] = useState({});

  useEffect(() => {
    const getData = async () => {
      const data = await fetchData();
      setProyectos(data);
    };

    getData();
  }, []);

  useEffect(() => {
    if (!!proyectos.data) {
      const contador = {};

      // Recorre el arreglo de proyectos y actualiza el contador
      proyectos.data.forEach((proyecto) => {
        const departamento = proyecto.attributes.departamento;
        // Si el departamento no está en el objeto, inicializa el contador en 1
        if (!contador[departamento]) {
          contador[departamento] = 1;
        } else {
          // Si el departamento ya existe en el objeto, incrementa el contador en 1
          contador[departamento]++;
        }
      });

      // Actualiza el estado con el contador
      setContadorDepartamento(contador);
    }
  }, [proyectos]);

  return (
    <>
    {/* {JSON.stringify(proyectos)} */}
      <div className="w-full grid grid-cols-2 gap-5 md:grid-cols-3 mt-5">
        {servicios.map((servicio, index) => {
          return (
            <Link key={index} href={`/proyectos/${servicio.departamento}`}>
              <div
                style={{ backgroundColor: servicio.color + "20" }}
                className={`rounded-xl p-5 relative ${user?.rol === servicio.nombre ? 'cursor-pointer' : 'cursor-default'}`}
              >
                {user?.rol === servicio.nombre ? '' : <div className="absolute right-3 top-3 bg-black text-white rounded-full py-1 px-2 text-xs">Sin permisos</div>}
                
                <Image
                  className="w-[60px] h-[60px]"
                  src={servicio.imagen}
                  alt={servicio.nombre}
                  width={50}
                  height={50}
                />
                <p className=" text-black mt-2 text-sm font-bold">
                  {servicio.nombre}
                </p>

                <p className="mt-5 text-lg">
                  <span className="font-extrabold text-lg">
                    {contadorDepartamento[servicio.departamento] || 0}
                  </span>{" "}
                  Proyecto
                </p>
              </div>
            </Link>
          );
        })}
      </div>
      <div className="flex justify-center mt-5">
        <Link href="#" className="px-5 py-3 bg-primary text-white rounded-full">
          Ver todos
        </Link>
      </div>
    </>
  );
}

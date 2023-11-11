"use client";

import { Projects } from "@/api";
import { useAuth } from "@/hooks/useAuth";
import { useEffect, useState } from "react";
import { ListaPresupuesto, FilterSection } from "./components";
import PaginationOne from "@/components/common/Pagination";

const fetchData = async () => {
  let filter = "?";
  const media =
    "populate[fotos][populate][0]=*&populate[audios][populate][0]=*&populate[videos][populate][0]=*";
  const diseno = "&populate[diseno][populate][0]=imagenes";
  const impresion = "&populate[impresion][populate][0]=imagenes";
  const corte = "&populate[corte][populate][0]=imagenes";
  const cerrajeria =
    "&populate[cerrajeria][populate][0]=imagenes&populate[cerrajeria][populate][1]=adicional";
  const pintura = "&populate[pintura][populate][0]=imagenes";
  const montaje =
    "&populate[montaje][populate][0]=imagenes&populate[montaje][populate][1]=adicional&populate[montaje][populate][2]=matricula&populate[montaje][populate][3]=montadores";

  const prioridad = "filters[aprovacion][$eq]=false";

  // filter += prioridad;
  // console.log(filter)
  const projectsCtrl = new Projects();
  const res = await projectsCtrl.getBudgets(filter);
  console.log(res);
  return res;
};

const defaultFilters = {
  prioridad: [],
  aprovacion: [],
  departamento: [],
  estado: [],
};

export default function page() {
  const [proyectos, setProyectos] = useState({});
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState(defaultFilters);
  const [pagination, setPagination] = useState({});

  const handleFilterChange = (filterType, value, isChecked) => {
    setFilters((prevFilters) => {
      if (isChecked) {
        // Agrega el filtro si está marcado
        return {
          ...prevFilters,
          [filterType]: [...prevFilters[filterType], value],
        };
      } else {
        // Elimina el filtro si no está marcado
        return {
          ...prevFilters,
          [filterType]: prevFilters[filterType].filter(
            (item) => item !== value
          ),
        };
      }
    });
  };

  useEffect(() => {
    setLoading(true);
    fetchData(filters).then((data) => {
      setProyectos(data.data);
      setPagination(data.meta.pagination);
      setLoading(false);
    });
  }, [filters]);

  useEffect(() => {
    const getData = async () => {
      const data = await fetchData();
      setProyectos(data.data);
      setPagination(data.meta.pagination);
      console.log(data.data);
      setLoading(false);
    };
    getData();
  }, []);

  return (
    <>
      {loading ? (
        <p>Cargando...</p>
      ) : (
        <div className="container mx-auto my-8">
          {/* {JSON.stringify(proyectos)} */}
          <div className="flex flex-col md:flex-row">
            <main className="w-full md:w-3/4 px-2">
              <ListaPresupuesto proyectos={proyectos} />
              <PaginationOne />
            </main>
            <aside className="w-full md:w-1/4 px-2 mb-4 md:mb-0">
              <div className="bg-white p-4 shadow-lg rounded-lg">
                <FilterSection
                  title="Prioridad"
                  options={["Alta"]}
                  handleFilterChange={handleFilterChange}
                />
                <FilterSection
                  title="Aprovación"
                  options={["aprovacion"]}
                  handleFilterChange={handleFilterChange}
                />
                <FilterSection
                  title="Departamento"
                  options={[
                    "diseno",
                    "impresion",
                    "corte",
                    "cerrajeria",
                    "pintura",
                    "montaje",
                  ]}
                  handleFilterChange={handleFilterChange}
                />
                <FilterSection
                  title="Estado"
                  options={[
                    "en cola",
                    "en curso",
                    "terminado",
                    "incidencia",
                    "en pausa",
                  ]}
                  handleFilterChange={handleFilterChange}
                />
                {/* ... more filters as needed */}
              </div>
            </aside>
          </div>
        </div>
      )}
    </>
  );
}

"use client";

import Loader from "@/components/common/Loader";
import Image from "next/image";
import { useEffect, useState } from "react";
import { estado, servicios, estados } from "@/utils";
import { ProgresoDep } from "@/components/common/ProgesoDep";
import { useAuth } from "@/hooks/useAuth";
import { ProjectTabs } from "./components/ProjectTabs";
import { ProjectMedia } from "./components/ProjectMedia";
import Link from "next/link";
import { MultiModal } from "@/components/common/MultiModal";
import { ModalDuplicar } from "./components/ModalDuplicar";
import { useProjectContext } from "@/context/ProjectContext";
import { Mensajes } from "./components/Mensajes";
import { ModalRetroceder } from "./components/ModalRetroceder";
import { ModalIncidencia } from "./components/ModalIncidencia";
import { ModalPausa } from "./components/ModalPausa";

export default function Proyecto({ params }) {
  const [loading, setLoading] = useState(true);

  const {
    fetchData,
    proyecto,
    setProyecto,
    departamentosActivos,
    departamentosActuales,
    updateProject,
    avanzar,
    retroceder,
    duplicar,
    actualizarEstadoProyecto,
    manejarCambioAIncidencia
  } = useProjectContext();

  const [modalOpen, setModalOpen] = useState(false);
  const [modalBack, setModalBack] = useState(false);
  const [modalIncidencia, setModalIncidencia] = useState(false);
  const [modalPausa, setModalPausa] = useState(false);
  const [selectedState, setSelectedState] = useState('');
  const { user } = useAuth();

  // onChange={e => {
  //   const nuevoEstado = e.target.value;
  //   actualizarEstadoProyecto(nuevoEstado)
  // }}

  const handleEstadoChange = (e) => {
    const nuevoEstado = e.target.value;
    setSelectedState(nuevoEstado);
    console.log(nuevoEstado)

    if (nuevoEstado === "incidencia") {
      setModalIncidencia(true);
    }  else if (nuevoEstado === "en pausa") {
      setModalPausa(true);
    } else {
      actualizarEstadoProyecto(nuevoEstado);
    }
  };

  useEffect(() => {
    const getData = async () => {
      const data = await fetchData(params.id);
      setProyecto(data.data);
      setLoading(false);
    };
    getData();
  }, []);

  useEffect(() => {
    if (
      departamentosActivos.length > 0 ||
      typeof proyecto.attributes?.createdAt === "undefined"
    ) {
      return;
    }
    departamentosActuales(proyecto);
  }, [proyecto]);

  // console.log(proyecto);
  return (
    <>
      {loading ? (
        <div className="w-full h-[calc(100vh-80px)] flex justify-center items-center">
          <Loader tamano={"100px"} />
        </div>
      ) : (
        <>
          <div className="flex justify-between">
            {/* {JSON.stringify(proyecto)} */}
            <div className="flex gap-3 items-center">
              {/* <Image  /> */}
              {/* {JSON.stringify(user?.rol)}*/}
              {/* {JSON.stringify(departamentosActivos)} */}
              {/* <Image
                src="/assets/default.svg"
                alt="default"
                width={100}
                height={100}
                className=" rounded-xl object-contain"
                priority
              /> */}
              <div className="flex flex-col justify-center">
                <p className="text-primary font-bold">
                  {proyecto.attributes.idpresupuesto}
                  {proyecto.id}
                </p>
                <p className="font-bold text-black">
                  {proyecto.attributes.nombre}
                </p>
                <p>{proyecto.attributes.client.data.attributes.nombre}</p>
                <p>Creador: {proyecto.attributes.creador}</p>
              </div>
            </div>

            <div className="flex flex-col justify-center items-center gap-3">
              <label
                htmlFor="priodidad"
                className="labels text-danger mb-[-10px] text-sm"
              >
                Prioridad
              </label>
              <input
                id="prioridad"
                type="checkbox"
                className="w-9 h-9 accent-primary"
                name="prioridad"
                checked={proyecto.attributes.prioridad}
                readOnly
              />

              <a
                onClick={() => setModalOpen(true)}
                className="rounded-full bg-primary text-white py-1 px-3 uppercase text-sm cursor-pointer"
              >
                Duplicar
              </a>
              <Link
                href={`/presupuestos/${params.id}`}
                className="rounded-full bg-primary text-white py-1 px-3 uppercase text-sm cursor-pointer"
              >
                Editar
              </Link>
            </div>
          </div>
          <div className="rounded-xl mt-5 p-5 border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="flex gap-3 flex-wrap justify-between">
              <div>
                <p className="labels">Fecha de entrada</p>
                <p>{proyecto.attributes.createdAt.slice(0, 10)}</p>
              </div>
              <div>
                <p className="labels text-right">Fecha de entrega</p>
                <p>
                  {proyecto.attributes.fecha}{" "}
                  <span className="font-bold text-black">hora</span>{" "}
                  {proyecto.attributes.hora?.slice(0, 5)}
                </p>
              </div>
            </div>

            <div className="flex mt-5 justify-between">
              <div className="flex flex-col justify-start items-start gap-3">
                <div className="flex items-center gap-3">
                  <label className="labels" htmlFor="estado">
                    Estado:
                  </label>
                  <select
                    className="capitalize formulario"
                    type="select"
                    style={{
                      color: estado[proyecto.attributes.estado],
                    }}
                    value={proyecto.attributes.estado}
                    onChange={handleEstadoChange}
                    // onChange={e => {
                    //   const nuevoEstado = e.target.value;
                    //   actualizarEstadoProyecto(nuevoEstado)
                    // }}
                  >
                    {estados.map((dep) => (
                      <option
                        key={dep}
                        value={dep}
                        className="capitalize text-black"
                      >
                        {dep}
                      </option>
                    ))}
                  </select>
                </div>

                <ProgresoDep
                  tareasDep={
                    proyecto.attributes[proyecto.attributes.departamento]
                  }
                />
              </div>
              <div className="flex justify-center flex-col items-center gap-3">
                <div className="text-center">
                  <p className="font-bold labels">Departamento actual</p>
                  <p className="capitalize">
                    {proyecto.attributes.departamento}
                  </p>
                </div>
                <div className="flex gap-5 items-center">
                  {departamentosActivos.indexOf(
                    proyecto.attributes.departamento
                  ) === 0 ? (
                    <a className="rounded-full text-white px-2 py-1 bg-bodydark1">
                      Retroceder
                    </a>
                  ) : (
                    <a
                      className="bg-danger rounded-full text-white px-2 py-1 cursor-pointer"
                      onClick={() => setModalBack(true)}
                    >
                      Retroceder
                    </a>
                  )}

                  {departamentosActivos.length > 1 &&
                  departamentosActivos.indexOf(
                    proyecto.attributes.departamento
                  ) <
                    departamentosActivos.length - 1 ? (
                    <a
                      className="bg-primary rounded-full text-white px-2 py-1 cursor-pointer"
                      onClick={() => avanzar()}
                    >
                      Avanzar
                    </a>
                  ) : (
                    <a className="rounded-full text-white px-2 py-1 bg-bodydark1">
                      Avanzar
                    </a>
                  )}
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center mt-5">
              <p className="labels">Procesos</p>
              <div className="text-center">
                <p className="labels">H.Trabajo</p>
                <p>4 horas</p>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-3 mt-5">
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
                  <div className="flex items-center gap-1" key={index}>
                    <input
                      type="checkbox"
                      className="w-7 h-7 accent-primary"
                      checked={todasLasTareasCompletadas}
                      readOnly
                    />
                    <Image
                      width={30}
                      height={30}
                      className="ml-3 w-[35px] h-[35px] grayscale"
                      src={servicio.imagen}
                      alt={servicio.nombre}
                    />
                    <p className="labels">{servicio.nombre}</p>
                  </div>
                );
              })}
            </div>

            <MultiModal isOpen={modalOpen} close={() => setModalOpen(false)}>
              <ModalDuplicar
                close={() => setModalOpen(false)}
                duplicar={duplicar}
              />
            </MultiModal>

            <MultiModal isOpen={modalBack} close={() => setModalBack(false)}>
              <ModalRetroceder
                close={() => setModalBack(false)}
                retroceder={retroceder}
              />
            </MultiModal>

            <MultiModal
              isOpen={modalIncidencia}
              close={() => setModalIncidencia(false)}
            >
              <ModalIncidencia
                close={() => setModalIncidencia(false)}
                manejarCambioAIncidencia={manejarCambioAIncidencia}
              />
            </MultiModal>
            
            <MultiModal
              isOpen={modalPausa}
              close={() => setModalPausa(false)}
            >
              <ModalPausa
                close={() => setModalPausa(false)}
                manejarCambioAIncidencia={manejarCambioAIncidencia}
              />
            </MultiModal>

            <div className="flex flex-col mt-10">
              <p className="labels">Descripción</p>
              <p>{proyecto.attributes.descripcion}</p>
            </div>
          </div>
          <ProjectTabs
            proyecto={proyecto}
            departamentosActivos={departamentosActivos}
            updateProject={updateProject}
          />
          {(!!proyecto.attributes.fotos?.data?.[0] ||
            !!proyecto.attributes.videos?.data?.[0] ||
            !!proyecto.attributes.audios?.data?.[0]) && (
            <ProjectMedia proyecto={proyecto} />
          )}

          {!!proyecto.attributes.mensajes.data?.[0] && <Mensajes />}

          {/* <Messages /> */}
        </>
      )}
    </>
  );
}

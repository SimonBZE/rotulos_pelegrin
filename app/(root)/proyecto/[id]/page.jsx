"use client";

import { Projects, Budget } from "@/api";
import Loader from "@/components/common/Loader";
import Image from "next/image";
import { useEffect, useState } from "react";
import { estado, servicios } from "@/utils";
import { ProgresoDep } from "@/components/common/ProgesoDep";
import { useAuth } from "@/hooks/useAuth";
import { useProject } from "./useProject";
import { ProjectTabs } from "./components/ProjectTabs";
import { ProjectMedia } from "./components/ProjectMedia";
import Link from "next/link";
import { MultiModal } from "@/components/common/MultiModal";
import { ModalDuplicar } from "./components/ModalDuplicar";
import { toast } from "react-toastify";

const fetchData = async (id) => {
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

  filter += media + diseno + impresion + corte + cerrajeria + pintura + montaje;
  const projectsCtrl = new Projects();
  const res = await projectsCtrl.getSingleBudget(id, filter);
  return res;
};

const budgetCtrl = new Budget();

export default function Proyecto({ params }) {
  const [proyecto, setProyecto] = useState({});
  const [loading, setLoading] = useState(true);

  const [modalOpen, setModalOpen] = useState(false);

  const notify = (mensaje, type = "") =>
    type === "" ? toast(mensaje) : toast[type](mensaje);

  const { user } = useAuth();
  const { depart, departamentosActivos, departamentosActuales, updateProject } =
    useProject(proyecto);
  // console.log(params.id)

  const duplicar = async (nombreProyecto) => {
    const procesarSeccion = (seccion) => {
      return (
        proyecto.attributes[seccion]?.map((item) => ({
          ...item,
          imagenes: item.imagenes?.data || [], // Incluye la información de las imágenes de la sección
        })) || []
      );
    };

    try {
      const proyectoDuplicado = {
        ...proyecto.attributes,
        fotos: proyecto.attributes.fotos.data, // Incluye la información de fotos
        audios: proyecto.attributes.audios.data, // Incluye la información de audios
        videos: proyecto.attributes.videos.data, // Incluye la información de videos
        diseno: procesarSeccion("diseno"),
        impresion: procesarSeccion("impresion"),
        corte: procesarSeccion("corte"),
        cerrajeria: procesarSeccion("cerrajeria"),
        pintura: procesarSeccion("pintura"),
        montaje: procesarSeccion("montaje"),
        nombre: nombreProyecto,
      };

      await budgetCtrl.createBudget(proyectoDuplicado);
      notify("Proyecto duplicado", "success");
    } catch (error) {
      console.log(error);
    }
  };

  const avanzar = () => {
    const nextDep = departamentosActivos.indexOf(
      proyecto.attributes.departamento
    );
    if (nextDep < 0) {
      return;
    }
    const currentDep = departamentosActivos[nextDep + 1];

    updateProject({ departamento: currentDep });

    setProyecto((prevProyecto) => ({
      ...prevProyecto,
      attributes: {
        ...prevProyecto.attributes,
        departamento: currentDep,
      },
    }));
  };

  const retroceder = () => {
    const backDep = departamentosActivos.indexOf(
      proyecto.attributes.departamento
    );
    if (backDep < 0) {
      return;
    }
    const currentDep = departamentosActivos[backDep - 1];

    updateProject({ departamento: currentDep });

    setProyecto((prevProyecto) => ({
      ...prevProyecto,
      attributes: {
        ...prevProyecto.attributes,
        departamento: currentDep,
      },
    }));
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
              <Image
                src="/assets/default.svg"
                alt="default"
                width={100}
                height={100}
                className=" rounded-xl object-contain"
              />
              <div className="flex flex-col justify-center">
                <p className="text-primary font-bold">
                  {proyecto.attributes.idpresupuesto}
                  {proyecto.id}
                </p>
                <p className="font-bold text-black">
                  {proyecto.attributes.nombre}
                </p>
                <p>{proyecto.attributes.cliente}</p>
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
              <div className="">
                <p
                  className="font-bold"
                  style={{
                    color: estado[proyecto.attributes.estado_departamento],
                  }}
                >
                  {" "}
                  <span className="labels">Estado:</span>{" "}
                  {proyecto.attributes.estado}
                </p>
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
                      onClick={retroceder}
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

                let mostrar = null;

                if (proyecto.attributes[servicio.departamento].length > 0) {
                  // console.log(proyecto.attributes[servicio.departamento])
                  proyecto.attributes[servicio.departamento].forEach(
                    (serv) => (mostrar += serv.completado)
                  );
                }

                return (
                  <div className="flex items-center gap-1" key={index}>
                    <input
                      type="checkbox"
                      className="w-7 h-7 accent-primary"
                      checked={mostrar}
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
          {(!!proyecto.attributes.fotos.data?.[0] ||
            !!proyecto.attributes.videos.data?.[0] ||
            !!proyecto.attributes.audios.data?.[0]) && (
            <ProjectMedia proyecto={proyecto} />
          )}
        </>
      )}
    </>
  );
}

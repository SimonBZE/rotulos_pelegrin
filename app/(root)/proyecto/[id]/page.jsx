"use client";

import { Projects, Budget } from "@/api";
import Loader from "@/components/common/Loader";
import Image from "next/image";
import { useEffect, useState } from "react";
import {estado, servicios} from '@/utils';
import { ProgresoDep } from "@/components/common/ProgesoDep";
import { useAuth } from "@/hooks/useAuth";
import { useProject } from "./useProject";

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
    "&populate[montaje][populate][0]=imagenes&populate[montaje][populate][1]=adicional";

  filter += media + diseno + impresion + corte + cerrajeria + pintura + montaje;

  // filter+=imagenes
  console.log(id);
  const projectsCtrl = new Projects();
  const res = await projectsCtrl.getSingleBudget(id, filter);
  console.log(res);
  return res;
};


const budgetCtrl = new Budget();

export default function Proyecto({ params }) {
  const [proyecto, setProyecto] = useState({});
  const [loading, setLoading] = useState(true);
  
  const {user} = useAuth()
  const {depart, departamentosActivos, departamentosActuales, estadoDepartamentos} = useProject(proyecto);
  // console.log(params.id)

  const duplicar = async () => {
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
        // diseno: proyecto.diseno?.map((item) => ({
        //   ...item,
        //   imagenes: item.imagenes?.data || [], // Incluye la información de las imágenes de diseno
        // })),
        diseno: procesarSeccion("diseno"),
        impresion: procesarSeccion("impresion"),
        corte: procesarSeccion("corte"),
        cerrajeria: procesarSeccion("cerrajeria"),
        pintura: procesarSeccion("pintura"),
        montaje: procesarSeccion("montaje"),
      };

      await budgetCtrl.createBudget(proyectoDuplicado);
    } catch (error) {
      console.log(error);
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

  useEffect( () => {    
    if( departamentosActivos.length > 0 || typeof(proyecto.attributes?.createdAt) === 'undefined' ){
      return
    }    
    departamentosActuales(proyecto)
  }, [proyecto] )

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
            {/* {JSON.stringify(departamentosActivos)}  */}
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
              <p className="font-bold text-black">{proyecto.attributes.nombre}</p>
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
            <p className="text-lg text-black capitalize p-2 shadow-6 shadow-[rgba(255,0,0,.1)] rounded">{proyecto.attributes.prioridad}</p>
            <a
              onClick={duplicar}
              className="rounded-full bg-primary text-white py-1 px-3 uppercase text-sm cursor-pointer"
            >
              Duplicar
            </a>
          </div>
        </div>
        <div className="rounded-xl mt-5 p-5 border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="flex gap-3 flex-wrap justify-between">
            <div>
              <p className="labels">Fecha de entrada</p>
              <p>{proyecto.attributes.createdAt.slice(0,10)}</p>
            </div>
            <div>
              <p className="labels text-right">Fecha de entrega</p>
              <p>{proyecto.attributes.fecha} <span className="font-bold text-black">hora</span> {proyecto.attributes.hora?.slice(0,5)}</p>
            </div>
          </div>

          <div className="flex mt-5 justify-between">
            <div className="">
              <p className="font-bold" style={{color:estado[proyecto.attributes.estado_departamento]}}> <span className="labels">Estado:</span> {proyecto.attributes.estado}</p>
              <ProgresoDep tareasDep={proyecto.attributes[proyecto.attributes.departamento]} />
            </div>
            <div className="flex justify-center flex-col items-center gap-3">
              <div className="text-center">
                <p className="font-bold labels">Departamento actual</p>
                <p className="capitalize">{proyecto.attributes.departamento}</p>
              </div>
              <div className="flex gap-5 items-center">
                <a className="bg-danger rounded-full text-white px-2 py-1 cursor-pointer">Retroceder</a>
                <a className="bg-primary rounded-full text-white px-2 py-1 cursor-pointer">Avanzar</a>
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
            
            {servicios.map( (servicio, index) => {
              if(departamentosActivos.indexOf(servicio.departamento) < 0) {
                return
              }

              let mostrar = null;

              // console.log(proyecto.attributes[servicio.departamento])
              if(proyecto.attributes[servicio.departamento] > 0){
                proyecto.attributes[servicio.departamento].foreach( (serv) => mostrar += serv.completado)
              }

              // console.log(mostrar)

              // if(!mostrar){
              //   return
              // }
              
              return(
              <div className="flex items-center gap-1" key={index}>
                <input type="checkbox" className="w-7 h-7 accent-primary" defaultChecked={mostrar} />
                <Image width={30} height={30} className="ml-3 w-[35px] h-[35px] grayscale" src={servicio.imagen} alt={servicio.nombre} />
                <p className="labels">{servicio.nombre}</p>
              </div>)
             } )}
          </div>

        </div>
        </>
      )}
    </>
  );
}

// Consulta

// {
//   populate: {
//   fotos:{
//     populate: ['*'],
//   },
//   audios:{
//     populate: ['*'],
//   },
//   videos:{
//     populate: ['*'],
//   },
//     diseno:{
//       populate:['imagenes'],
//     },
//     impresion:{
//       populate:['imagenes'],
//     },
//     corte: {
//       populate:['imagenes']
//     },
//     cerrajeria: {
//       populate: ['imagenes', 'adicional'],
//     },
//     pintura: {
//       populate:['imagenes'],
//     },
//     montaje: {
//       populate:['imagenes', 'adicional']
//     }
//   },
// }

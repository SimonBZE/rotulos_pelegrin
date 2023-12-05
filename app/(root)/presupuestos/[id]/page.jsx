import { Projects } from "@/api";
import { cookies } from "next/headers";
import { Proyecto } from "./Proyecto";
// import { useEffect } from "react";

const fetchData = async (id, token) => {
  // const { req } = context;
  if (!token) {
    throw new Response("Unauthorized", { status: 401 });
  }

  let filter = "?";
  const media =
    "populate[fotos]=*&populate[videos]=*&populate[audios]=*";
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
  const res = await projectsCtrl.getPresupuesto(id, filter, token);
  return res;
};

export default async function Presupuesto({ params }) {
  const cookiesList = cookies();
  if (!cookiesList.has("token")) {
    return;
  }

  const token = cookiesList.get("token");

  let initialValues = {};
  const data = await fetchData(params.id, token.value).then(({ data }) => {
    // console.log(data.attributes?.cerrajeria?.[0]?.adicional);
    initialValues = {
      nombre: data.attributes.nombre,
      cliente: data.attributes.cliente,
      contacto: data.attributes.contacto,
      aprovacion: data.attributes.aprovacion,
      prioridad: data.attributes.prioridad,
      fecha: data.attributes.fecha,
      hora: data.attributes.hora,
      descripcion: data.attributes.descripcion,
      puesta_en_marcha: data.attributes.puesta_en_marcha,
      departamento: data.attributes.departamento,
      diseno: data.attributes.diseno.map(
        ({
          id,
          horas,
          precio,
          cantidad,
          unidades,
          completado,
          contador,
          nombre,
          imagenes,
        }) => ({
          id: id,
          horas: horas,
          precio: precio,
          unidades: unidades,
          cantidad: cantidad,
          completado: completado,
          contador: contador,
          nombre: nombre,
          imagenes: !!imagenes.data
            ? imagenes.data.map((imagen) => {
                return {
                  id: imagen.id,
                  url: imagen.attributes.url,
                };
              })
            : [],
        })
      ),
      impresion: data.attributes.impresion.map(
        ({
          id,
          precio,
          cantidad,
          ancho,
          alto,
          material,
          laminacion,
          completado,
          contador,
          nombre,
          imagenes,
        }) => ({
          id: id,
          nombre: nombre,
          ancho: ancho,
          alto: alto,
          material: material,
          laminacion,
          precio: precio,
          cantidad: cantidad,
          contador: contador,
          completado: completado,
          imagenes: !!imagenes.data
            ? imagenes.data.map((imagen) => {
                return {
                  id: imagen.id,
                  url: imagen.attributes.url,
                };
              })
            : [],
        })
      ),
      corte: data.attributes.corte.map(
        ({
          id,
          precio,
          cantidad,
          ancho,
          alto,
          material,
          completado,
          contador,
          nombre,
          imagenes,
        }) => ({
          id,
          nombre,
          ancho,
          alto,
          material,
          precio,
          cantidad,
          contador,
          completado,
          imagenes: !!imagenes.data
            ? imagenes.data.map((imagen) => {
                return {
                  id: imagen.id,
                  url: imagen.attributes.url,
                };
              })
            : [],
        })
      ),
      cerrajeria: data.attributes.cerrajeria.map(
        ({id,
          precio,
          cantidad,
          horas_fabricacion,
          ancho,
          alto,
          grosor,
          material,
          completado,
          contador,
          nombre,
          imagenes,
          adicional
        }) => ({
          id: id,
          nombre: nombre,
          ancho: ancho,
          alto: alto,
          grosor: grosor,
          material: material,
          horas_fabricacion: horas_fabricacion,
          adicional: !!adicional
          ? adicional.map(({id, nombre, precio}) => {
              return {
                id, 
                nombre, 
                precio
              };
            })
          : [],
          cantidad: cantidad,
          precio: precio,
          contador: contador,
          completado: completado,
          imagenes: !!imagenes.data
            ? imagenes.data.map((imagen) => {
                return {
                  id: imagen.id,
                  url: imagen.attributes.url,
                };
              })
            : [],
        })
      ),
      pintura: data.attributes.pintura.map(
        ({id,
          precio,
          cantidad,          
          ancho,
          alto,          
          material,
          completado,
          contador,
          nombre,
          imagenes,
          lijado,
        }) => ({
          id: id,
          nombre,
          ancho,
          alto,
          lijado,
          material,
          precio,
          cantidad,
          contador,
          completado,
          imagenes: !!imagenes.data
            ? imagenes.data.map((imagen) => {
                return {
                  id: imagen.id,
                  url: imagen.attributes.url,
                };
              })
            : [],
        })
      ),
      montaje: data.attributes.montaje.map(
        ({id,
          completado,
          matricula,
          vehiculo,
          lugar_montaje,
          montadores,
          persona_contacto,
          desplazamiento,
          alquiler_maquinaria,
          tiempo_montaje,
          imagenes,
          adicional,
        }) => ({
          id: id,
          completado,
          tiempo_montaje,
          matricula:!!matricula
          ? matricula.map(({id, matricula}) => {
              return {
                id, 
                matricula
              };
            })
          : [],
          lugar_montaje,
          montadores:[],
          vehiculo: vehiculo,
          persona_contacto,
          desplazamiento,
          alquiler_maquinaria,
          adicional: !!adicional
          ? adicional.map((item) => {
              return {
                id: item.id,
                nombre: item.nombre,
                precio: item.precio
              };
            })
          : [],
          precio: 0,
          cantidad: 1,
          contador:0,
          imagenes: !!imagenes.data
            ? imagenes.data.map((imagen) => {
                return {
                  id: imagen.id,
                  url: imagen.attributes.url,
                };
              })
            : [],
        })
      ),
      videos: !!data.attributes.videos.data
      ? data.attributes.videos.data.map((video) => {
          return {
            id: video.id,
            url: video.attributes.url,
          };
        })
      : [],
      fotos: !!data.attributes.fotos.data
      ? data.attributes.fotos.data.map((foto) => {
          return {
            id: foto.id,
            url: foto.attributes.url,
          };
        })
      : [],
      audios: !!data.attributes.audios.data
      ? data.attributes.audios.data.map((audio) => {
          return {
            id: audio.id,
            url: audio.attributes.url,
          };
        })
      : [],
    };
  });

  return <Proyecto initialValues={initialValues} id={params.id} />;
}

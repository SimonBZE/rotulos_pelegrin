import { createContext, useState, useContext, useCallback, useEffect } from "react";
import { toast } from "react-toastify";

import { Budget, Projects, Comments } from "@/api";

import { useAuth } from "@/hooks/useAuth";

const ProjectContext = createContext();

export const useProjectContext = () => useContext(ProjectContext);

const depart = [
  "diseno",
  "impresion",
  "corte",
  "cerrajeria",
  "pintura",
  "montaje",
];

export const ProjectProvider = ({ children }) => {
  const [proyecto, setProyecto] = useState({});
  const [departamentosActivos, setDepartamentosActivos] = useState([]);
  const [contadorCambiado, setContadorCambiado] = useState(false);
  const budgetCtrl = new Budget();
  const commentsCtrl = new Comments();

  const {user} = useAuth()

  const notify = (mensaje, type = "") =>
    type === "" ? toast(mensaje) : toast[type](mensaje);

  const fetchData = useCallback(async (id) => {
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
      const mensajes = `&populate[mensajes][0]=*&populate[mensajes][populate][1]=media&populate[mensajes][populate][2]=autor`

    filter +=
      media + diseno + impresion + corte + cerrajeria + pintura + montaje + mensajes;
    const projectsCtrl = new Projects();
    const res = await projectsCtrl.getSingleBudget(id, filter);
    return res;
  }, []);

  const departamentosActuales = (proyecto = {}) => {
    depart.forEach((dep) => {
      if (proyecto.attributes[dep].length > 0) {
        setDepartamentosActivos((prevDepartamentosActivos) => [
          ...prevDepartamentosActivos,
          dep,
        ]);
      }
    });
  };

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

  const updateProject = async (data) => {
    
    try {
      const res = await budgetCtrl.updateSingleProject(proyecto.id, data);
      if (!!res.error) throw res;
    } catch (error) {
      console.log(error);
    }
  };

  const sonTodasLasTareasCompletadas = (departamento) => {
    if (!proyecto.attributes[departamento] || proyecto.attributes[departamento].length === 0) {
      return true; // Considera completo si no hay tareas
    }
    return proyecto.attributes[departamento].every((tarea) => tarea.completado);
  };
  
  const cambiarDepartamento = (direccion, mensaje) => {
    const currentIndex = departamentosActivos.indexOf(proyecto.attributes.departamento);
    if (currentIndex === -1) {
      return;
    }
  
    let nextIndex;
    if (direccion === "adelante") {
      nextIndex = Math.min(currentIndex + 1, departamentosActivos.length - 1);
    } else {
      nextIndex = Math.max(currentIndex - 1, 0);
    }
  
    const nextDep = departamentosActivos[nextIndex];
    if (nextDep === proyecto.attributes.departamento) {
      return;
    }
  
    if (direccion === "adelante" && !sonTodasLasTareasCompletadas(proyecto.attributes.departamento)) {
      notify("No puedes avanzar, aún hay tareas pendientes en este departamento.", "error");
      return;
    }
  
    if (direccion === "atras") {
      
      const nuevoMensaje = {"comentario": mensaje,"departamento":nextDep ,"autor":user.id,"presupuesto":proyecto.id, "motivo":"retroceder"}
      commentsCtrl.createComment(nuevoMensaje)
      
      // proyecto.attributes.mensajes.data.attributes
      // const mensaje={attributes:{"comentario": mensaje,"departamento":nextDep ,"autor":2,"presupuesto":proyecto.id, "motivo":"retroceder"}}

      setProyecto((prevProyecto) => ({
        ...prevProyecto,
        attributes: {
          ...prevProyecto.attributes,
          mensajes: {
            ...prevProyecto.attributes.mensajes,
            data: [
              ...prevProyecto.attributes.mensajes.data,
              {attributes:{"comentario": mensaje,"departamento":nextDep ,"autor":2,"presupuesto":proyecto.id, "motivo":"retroceder"}}
            ]
          }
        }
      }));
      notify(`Se ha devuelto el proyecto al departamento de ${nextDep}.`, "success");
      // Aquí podría ir lógica adicional para manejar el retroceso.
    }
  
    updateProject({ departamento: nextDep });
    setProyecto((prevProyecto) => ({
      ...prevProyecto,
      attributes: {
        ...prevProyecto.attributes,
        departamento: nextDep,
      },
    }));
  };
  
  const avanzar = () => cambiarDepartamento("adelante");
  const retroceder = (mensaje) => cambiarDepartamento("atras", mensaje);

  const departamentoCompletados = () => {
    return depart.every( (dep) => {
      return proyecto.attributes[dep].every( (tarea) => tarea.completado )
    } )
  }

  const actualizarEstadoProyecto = (nuevoEstado) => {
    
    if(nuevoEstado === 'terminado' && !departamentoCompletados()) {
      notify("No se puede completar el proyecto: aún hay tareas pendientes.", "error");
      return;
    }   

    setProyecto( (prevProyecto) => ({
      ...prevProyecto,
      attributes: {
        ...prevProyecto.attributes,
        estado: nuevoEstado
      }
    }) )

    updateProject({ estado: nuevoEstado });

  }

  const manejarCambioAIncidencia = (mensaje, motivo) => {
    // Enviar un mensaje de incidencia
    console.log(motivo)
    const nuevoMensaje = {
      "comentario": mensaje,
      "autor": user.id,
      "presupuesto": proyecto.id,
      "motivo": motivo
    };
    commentsCtrl.createComment(nuevoMensaje);

    actualizarEstadoProyecto(motivo)
  
    // Actualizar el estado del proyecto a incidencia
    setProyecto((prevProyecto) => ({
      ...prevProyecto,
      attributes: {
        ...prevProyecto.attributes,
        estado: motivo,
        mensajes: {
          ...prevProyecto.attributes.mensajes,
          data: [
            ...prevProyecto.attributes.mensajes.data,
            { attributes: nuevoMensaje }
          ]
        }
      }
    }));
  
    notify("El estado del proyecto ha cambiado a 'Incidencia'", "success");
  };

  const actualizarEstadoProyectoSiNecesario = useCallback(() => {    
      setProyecto((prevProyecto) => ({
        ...prevProyecto,
        attributes: {
          ...prevProyecto.attributes,
          estado: 'en curso',
        },
      }));
      updateProject({ estado: 'en curso' });
      setContadorCambiado(false);
      console.log(contadorCambiado)
    
  }, [contadorCambiado, proyecto.attributes, updateProject]);
  
  useEffect(() => {
    if (contadorCambiado && proyecto.attributes && proyecto.attributes.estado !== 'completado' && proyecto.attributes.estado !== 'en curso') {
      actualizarEstadoProyectoSiNecesario();
    }
  }, [actualizarEstadoProyectoSiNecesario]);

  const value = {
    proyecto,
    departamentosActivos,
    actualizarEstadoProyecto, 
    fetchData,
    setProyecto,
    departamentosActuales,
    updateProject,
    avanzar,
    retroceder,
    duplicar,
    setContadorCambiado,
    manejarCambioAIncidencia,
  };

  return (
    <ProjectContext.Provider value={value}>{children}</ProjectContext.Provider>
  );
};

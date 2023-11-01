import {useState} from 'react'


export const useProject = (proyecto) => {
  const [nextDep, setNextDep] = useState("")
  const [prevDep, setPrevDep] = useState("")
  const [departStatus, setDepartStatus] = useState({})
  const [departamentosActivos, setDepartamentosActivos] = useState([]);

  const depart = [
    "diseno",
    "impresion",
    "corte",
    "cerrajeria",
    "pintura",
    "montaje",
  ];

  const departamentosActuales = (proyecto = {}) => {
    depart.forEach((dep) => {
      if (proyecto.attributes[dep].length > 0) {
        setDepartamentosActivos((prevDepartamentosActivos) => [
          ...prevDepartamentosActivos,
          dep,
        ]);
      }
    });   
    
    estadoDepartamentos()
  }

  const estadoDepartamentos = () => {
    // console.log('departamentos activos', departamentosActivos)
  }

  

  

  return {
    depart,
    departamentosActivos,
    departStatus,
    departamentosActuales,
    estadoDepartamentos,
  }
}
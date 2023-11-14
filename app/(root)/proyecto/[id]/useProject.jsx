import { Budget } from "@/api";
import { useState } from "react";

const budgetCtrl = new Budget();

export const useProject = (proyecto) => {
  
  const [departStatus, setDepartStatus] = useState({});
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
  };

  const updateProject = async (data) => {
    console.log(data)
    try {
      const res = await budgetCtrl.updateSingleProject(proyecto.id, data);
      if (!!res.error) throw res;
    } catch (error) {
      console.log(error);
    }
  };

  return {
    depart,
    departamentosActivos,
    departStatus,
    departamentosActuales,
    updateProject,
  };
};

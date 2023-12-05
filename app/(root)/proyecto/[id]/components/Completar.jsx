import { useProjectContext } from "@/context/ProjectContext";
import { useState, useEffect, memo } from "react";

const Completar = memo(({ id, currentDep }) => {
  const [completed, setCompleted] = useState(false);
  const { updateProject, setProyecto, proyecto } = useProjectContext();

  useEffect(() => {
    // Establecer el estado inicial de completado basado en los datos del proyecto
    const currentProject = proyecto.attributes[currentDep].find(item => item.id === id);
    if (currentProject) {
      setCompleted(!!currentProject.completado);
    }
  }, [id, currentDep, proyecto.attributes]);

  const updateCompletion = (isCompleted) => {
    const updatedProjectData = proyecto.attributes[currentDep].map(item => {
      if (item.id === id) {
        return { ...item, completado: isCompleted };
      }
      return item;
    });

    // Actualiza el estado de React
    setProyecto(prevProyecto => ({
      ...prevProyecto,
      attributes: { ...prevProyecto.attributes, [currentDep]: updatedProjectData }
    }));

    // Envía la actualización al backend solo con el departamento actualizado
    updateProject({ [currentDep]: updatedProjectData });
  };

  const toggleCompletion = () => {
    const newCompleted = !completed;
    setCompleted(newCompleted);
    updateCompletion(newCompleted);
  };

  const buttonClass = "px-4 py-2 rounded text-white cursor-pointer";
  const completeButtonClass = completed ? "bg-meta-7" : "bg-meta-3";

  if (currentDep === "montaje") {
    return (
      <div className="flex items-center justify-center p-5">
        <button
          className={`${buttonClass} ${completeButtonClass}`}
          onClick={toggleCompletion}
        >
          {completed ? "Marcar como no completado" : "Marcar como completado"}
        </button>
      </div>
    );
  }

  // Resto de la lógica de contador para otros departamentos
  // ...

});

Completar.displayName = "Completar";

export { Completar}
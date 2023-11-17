import { useProjectContext } from "@/context/ProjectContext";
import { useState, useCallback, memo, useEffect } from "react";

const Counter = memo(({ start, max, id, currentDep }) => {
  const [count, setCount] = useState(start);
  const { updateProject, setProyecto, proyecto, setContadorCambiado } = useProjectContext();

  useEffect(() => {
    setCount(start); // Asegura que el contador se actualiza si el inicio cambia
  }, [start]);

  const updateCount = useCallback(
    (newCount) => {
      const updatedProjectData = proyecto.attributes[currentDep].map((item) => {
        if (item.id === id) {
          return { ...item, contador: newCount, completado: newCount === max };
        }
        return item;
      });

      // Actualiza el estado de React
      setProyecto((prevProyecto) => ({
        ...prevProyecto,
        attributes: {
          ...prevProyecto.attributes,
          [currentDep]: updatedProjectData,
        },
      }));

      // Envía la actualización al backend solo con el departamento actualizado
      updateProject({ [currentDep]: updatedProjectData });
      setContadorCambiado(true);
    },
    [id, max, proyecto, currentDep, setProyecto, updateProject]
  );

  const incrementCount = () =>
    setCount((prevCount) => Math.min(prevCount + 1, max));
  const decrementCount = () =>
    setCount((prevCount) => Math.max(prevCount - 1, 0));

  return (
    <div className="flex items-center justify-between px-5 pb-5">
      <div className="flex items-center space-x-2">
        <button
          className="bg-meta-7 text-white px-4 py-2 rounded disabled:bg-bodydark1 cursor-pointer"
          onClick={() => {
            decrementCount();
            updateCount(count - 1);
          }}
          disabled={count <= 0}
        >
          -
        </button>
        <span className="text-lg font-semibold">{count}</span>
        <button
          className="bg-meta-3 text-white px-4 py-2 rounded disabled:bg-bodydark1 cursor-pointer"
          onClick={() => {
            incrementCount();
            updateCount(count + 1);
          }}
          disabled={count >= max}
        >
          +
        </button>
      </div>

      <button
        className="bg-meta-3 text-white px-4 py-2 rounded disabled:bg-bodydark1 cursor-pointer"
        onClick={() => {updateCount(max, true) }}
        disabled={count >= max}
      >
        Completar
      </button>
    </div>
  );
});

export default Counter;

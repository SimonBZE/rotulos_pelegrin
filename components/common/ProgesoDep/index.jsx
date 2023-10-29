import { ProgressBar } from "@/components/ui";

export const ProgresoDep = ({ tareasDep }) => {
  const tareasCompletadas = tareasDep.filter(
    (tarea) => tarea.completado === true
  );
  const tareas = tareasCompletadas.length;
  const porcentaje =
    tareas === 0 ? 0 : (tareas / tareasDep.length) * 100;
  return (
    <div className=" flex justify-end gap-2 items-center flex-col md:flex-row">
      <div className="max-w-[80px]">
        <ProgressBar percentage={porcentaje} />
      </div>
      <div>
        <p>Cantidad</p>
        <p className="labels text-center">
          {tareas} de {tareasDep.length}
        </p>
      </div>
    </div>
  );
};

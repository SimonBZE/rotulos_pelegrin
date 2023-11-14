import Counter from "./Contador";


export const Progreso = ({departamento, updateProject, currentDep}) => {
    console.log(departamento)
  return (
    <div className="flex items-center justify-between px-5 pb-5">
      <Counter start={!!departamento.contador ? departamento.contador : 0} currentDep={currentDep} max={departamento.cantidad} onUpdate={updateProject} id={departamento.id} />
      <a
        href="#"
        className="text-white bg-meta-3 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Completar
      </a>
    </div>
  );
};

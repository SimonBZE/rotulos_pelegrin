import Contador from "./Contador";


export const Progreso = ({departamento, currentDep}) => {
  return (
    <>
      <Contador start={!!departamento.contador ? departamento.contador : 0} currentDep={currentDep} max={departamento.cantidad}  id={departamento.id} />
    </>
  );
};

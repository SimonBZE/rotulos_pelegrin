"use client";

import { Contrasena } from "./components/Contrasena";
import { Informacion } from "./components/Informacion";

const Ajustes = () => {
  return (
    <>
      <div className="mx-auto max-w-270">
        <Informacion />
        <Contrasena />
      </div>
    </>
  );
};

export default Ajustes;

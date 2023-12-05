"use client";
import Image from "next/image";

import { Contrasena } from "./components/Contrasena";
import { Informacion } from "./components/Informacion";
import { ImageUploader } from "@/components/ui";
import { useAuth } from "@/context/AuthContext";

const Ajustes = () => {
  const { user, setUser, login } = useAuth();

  const onUpload = (imagen) => {
    console.log(imagen);
    // setUser({ ...user, foto: imagen })
    // login()
  }
  // console.log(user);
  return (
    <>
      <div className="mx-auto max-w-270">
        <div className="grid grid-cols-1 gap-8">
          <div className="col-span-5 xl:col-span-3">
            <Informacion />
            <Contrasena />
          </div>          
        </div>
      </div>
    </>
  );
};

export default Ajustes;

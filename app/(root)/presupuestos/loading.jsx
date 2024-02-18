import { Spinner } from "@nextui-org/react";


export default function Loading() {
  return (
    <div className="flex h-[calc(100vh-100px)] w-full justify-center items-center"><Spinner label="Cargando..." color="primary" /></div>
  )
}

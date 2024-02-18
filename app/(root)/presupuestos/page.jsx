import { cookies } from "next/headers";
import { Tabla } from "./tabla";


export default async function page({ searchParams: { page, query, status, estado, fecha, fechaEnd } }) {
  const cookiesList = cookies();
  if (!cookiesList.has("token")) {
    return;
  }
  const token = cookiesList.get("token");

  return (
    <>
      {/* <Suspense fallback={<div className="flex h-[calc(100vh-100px)] w-full justify-center items-center"><Spinner label="Cargando..." color="primary" /></div>}> */}
        <Tabla page={page} query={query} status={status} token={token} estado={estado} fecha={fecha} fechaEnd={fechaEnd}/>
      {/* </Suspense> */}
    </>
  );
}

import {cookies} from "next/headers";
import {Tabla} from "./tabla";

export default async function page({searchParams: {query, tipo, page}}) {
  const cookiesList = cookies();

  if(!cookiesList.has("token")) {
    return
  }
  
  const token = cookiesList.get("token")
  
  return (
    <>
      <Tabla token={token} query={query} tipo={tipo} page={page} />
    </>
  )
}

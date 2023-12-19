import { Projects } from "@/api";
import { cookies } from "next/headers";
import { Tabla } from "./tabla";
import { Suspense } from "react";

// import { Table } from "lucide-react";

// const fetchData = async (token, page, query) => {
//   // const { req } = context;
//   if (!token) {
//     throw new Response("Unauthorized", { status: 401 });
//   }
//   let filters = "?";
//   if (page) {
//     filters += `pagination[page]=${page}`;
//   } else {
//     filters = "";
//   }

//   console.log(filters);
//   const projectsCtrl = new Projects();
//   const res = await projectsCtrl.getPresupuestos(token, filters);
//   return res;
// };

export default async function page({ searchParams: { page, query, status, estado } }) {
  const cookiesList = cookies();
  if (!cookiesList.has("token")) {
    return;
  }
  const token = cookiesList.get("token");

  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <Tabla page={page} query={query} status={status} token={token} estado={estado} />
      </Suspense>
    </>
  );
}

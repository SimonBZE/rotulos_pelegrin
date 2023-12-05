import { Projects } from "@/api";
import { cookies } from "next/headers";
import { Tabla } from "./tabla";
// import { Table } from "lucide-react";

const fetchData = async (token) => {
  // const { req } = context;
  if (!token) {
    throw new Response("Unauthorized", { status: 401 });
  }

  const projectsCtrl = new Projects();
  const res = await projectsCtrl.getPresupuestos(token);
  return res;
};

export default async function page(searchParams, query, page) {
  const cookiesList = cookies();
  if (!cookiesList.has("token")) {
    return;
  }

  const token = cookiesList.get("token");

  const data = await fetchData(token.value);

  return (
    <>
      <Tabla data={data.data} meta={data.meta.pagination} />
    </>
  );
}

"use client";
import { Projects } from "@/api";
import { useEffect, useState } from "react";

import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Chip,
  Tooltip,
  Spinner,
} from "@nextui-org/react";

import { CiEdit, CiViewList  } from "react-icons/ci";
import { useRouter } from "next/navigation";
import { Paginacion } from "@/components/common/Paginacion";
import { TopContent } from "./components/TopContant";
// import { Factura } from "./components";
import {colores} from "@/utils"
import { EliminarPresupuesto } from "@/components/Presupuestos/EliminarPresupuesto";
const projectsCtrl = new Projects();
const buildFilters = (page, query, status, estado, fecha, fechaEnd) => {
  const filters = new URLSearchParams();

  filters.append("populate[client]", "*");

  if (page) {
    filters.append("pagination[page]", page);
  }

  if (query) {
    // Suponiendo que `query` puede ser un nombre o un ID
    const numericQuery = query.replace(/\D/g, ""); // Extraer números para el ID
    const textQuery = query;
    // Añadir un filtro OR
    filters.append("filters[$or][0][nombre][$contains]", textQuery);
    filters.append("filters[$or][1][id][$contains]", numericQuery);


    return filters.toString();
  }

  if (status) {
    filters.append("filters[aprovacion]", status);
  }

  if (fecha) {
    filters.append("filters[createdAt][$gte]", fecha);
    filters.append("filters[createdAt][$lte]", fechaEnd);
  }

  if (Array.isArray(estado)) {
    estado.forEach((e) => filters.append("filters[estado][$contains]", e));
  } else if (estado) {
    filters.append("filters[estado][$contains]", estado);
  }

  return filters.toString();
};



const fetchData = async (
  token,
  page,
  query,
  status,
  estado,
  fecha,
  fechaEnd
) => {
  const filters = buildFilters(page, query, status, estado, fecha, fechaEnd);
  console.log(filters)
  
  const res = await projectsCtrl.getPresupuestos(token, `?${filters}`);
  return res;
};




export function Tabla({ token, page, query, status, estado, fecha, fechaEnd }) {
  const [presupuestos, setPresupuestos] = useState([]);
  const [paginacion, setPaginacion] = useState([]);
  const [cargando, setCargando] = useState(true);

  const router = useRouter();

  const getData = async () => {
    setCargando(true);
    const { data: presupuestos, meta: paginacion } = await fetchData(
      token.value,
      page,
      query,
      status,
      estado,
      fecha,
      fechaEnd
    );
    setPresupuestos(presupuestos);
    setPaginacion(paginacion.pagination);
    setCargando(false);
  }

  useEffect(() => {
    getData();
  }, [page, query, status, estado, fecha]);

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    return new Intl.DateTimeFormat("es-ES", options).format(
      new Date(dateString)
    );
  };

  const eliminarPresupuesto = async (id) => {
    try {
      
      const data = await projectsCtrl.deleteBudget(id);
      console.log(data)
      getData();
    } catch (error) {
      return error;
    }
  }

  return (
    <>
      {/* {JSON.stringify(presupuestos)} */}
      <Table
        aria-label="Todos los presupuestos, aprovados y sin aprovar"
        topContent={
          <TopContent
            query={query}
            status={status}
            estado={estado}
            fecha={fecha}
            fechaEnd={fechaEnd}
            cantidad={presupuestos?.length}
          />
        }
        topContentPlacement="outside"
        bottomContent={
          paginacion.pageCount > 0 ? (
            <Paginacion paginacion={paginacion} />
          ) : null
        }
        bottomContentPlacement="outside"
      >
        <TableHeader>
          <TableColumn>ID</TableColumn>
          <TableColumn>Nombre</TableColumn>
          <TableColumn>Cliente</TableColumn>
          <TableColumn>Fecha de creación</TableColumn>
          <TableColumn>Fecha de entrega</TableColumn>
          <TableColumn>Aprovado</TableColumn>
          <TableColumn>Total</TableColumn>
          <TableColumn>Estado</TableColumn>
          <TableColumn>Acciones</TableColumn>
        </TableHeader>
        <TableBody
          items={presupuestos?.id ?? []}
          emptyContent={<p>No hay presupuestos</p>}
          isLoading={cargando}
          loadingContent={<Spinner />}
        >
          {presupuestos?.map((presupuesto) => (
            <TableRow key={presupuesto.id}>
              <TableCell>
                {presupuesto.attributes.idpresupuesto}
                {presupuesto.id}
              </TableCell>
              <TableCell>
                {presupuesto.attributes.nombre}
                {presupuesto.nombre}
              </TableCell>
              <TableCell>
                {presupuesto.attributes.client.data?.attributes?.nombre}
              </TableCell>

              <TableCell>
                {formatDate(presupuesto.attributes.publishedAt)}
              </TableCell>
              <TableCell>{formatDate(presupuesto.attributes.fecha)}</TableCell>
              <TableCell>
                {presupuesto.attributes.aprovacion ? (
                  <p className="text-success font-bold">Si</p>
                ) : (
                  <p className="text-danger font-bold">No</p>
                )}
              </TableCell>
              <TableCell>{presupuesto.attributes.total} €</TableCell>
              <TableCell className="capitalize">
                <Chip
                  size="sm"
                  color={`${colores[[presupuesto.attributes.estado]]}`}
                >
                  {presupuesto.attributes.estado}
                </Chip>
              </TableCell>
              <TableCell className="flex gap-3">
                {/* <Factura /> */}
                <Tooltip content="ver proyecto">
                  <span
                    className="text-xl text-green-600 cursor-pointer"
                    onClick={() =>
                      router.push(`/proyecto/${presupuesto.id}`)
                    }
                  >
                    <CiViewList />
                  </span>
                </Tooltip>
                <Tooltip content="Editar presupuesto">
                  <span
                    className="text-xl text-primary cursor-pointer"
                    onClick={() =>
                      router.push(`/presupuestos/${presupuesto.id}`)
                    }
                  >
                    <CiEdit />
                  </span>
                </Tooltip>
               
                <EliminarPresupuesto id={presupuesto.id} getData={getData} eliminarPresupuesto={eliminarPresupuesto} />
                
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}

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

import { CiEdit, CiTrash } from "react-icons/ci";
import { useRouter } from "next/navigation";
import { Paginacion } from "@/components/common/Paginacion";
import { TopContent } from "./components/TopContant";
import { Factura } from "./components";
import { useDebouncedCallback } from "use-debounce";

const buildFilters = (page, query, status, estado, fecha, fechaEnd) => {
  const filters = new URLSearchParams();

  if (page) {
    filters.append("pagination[page]", page);
  }

  if (query) {
    filters.append("filters[id][$contains]", query.replace(/\D/g, ""));
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

  const projectsCtrl = new Projects();
  const res = await projectsCtrl.getPresupuestos(token, `?${filters}`);
  return res;
};

const colores = {
  "en cola": "default",
  "en curso": "secondary",
  incidencia: "danger",
  "en pausa": "warning",
  terminado: "success",
};

export function Tabla({ token, page, query, status, estado, fecha, fechaEnd }) {
  const [presupuestos, setPresupuestos] = useState([]);
  const [paginacion, setPaginacion] = useState([]);
  const [cargando, setCargando] = useState(true);

  const router = useRouter();

  const getData = useDebouncedCallback(
    async ()  => {
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
    }, 500 )

  useEffect(() => {
    

    getData();
  }, [page, query, status, estado, fecha]);

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    return new Intl.DateTimeFormat("es-ES", options).format(
      new Date(dateString)
    );
  };

  return (
    <Table
      aria-label="Todos los presupuestos, aprovados y sin aprovar"
      topContent={
        <TopContent
          query={query}
          status={status}
          estado={estado}
          fecha={fecha}
          fechaEnd={fechaEnd}
          cantidad={presupuestos.length}
        />
      }
      topContentPlacement="outside"
      bottomContent={
        paginacion.pageCount > 0 ? <Paginacion paginacion={paginacion} /> : null
      }
      bottomContentPlacement="outside"
    >
      <TableHeader>
        <TableColumn>ID</TableColumn>
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
            <TableCell>{presupuesto.attributes.cliente}</TableCell>
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
              <Factura />
              <Tooltip content="Editar presupuesto">
                <span
                  className="text-xl text-primary cursor-pointer"
                  onClick={() => router.push(`/presupuestos/${presupuesto.id}`)}
                >
                  <CiEdit />
                </span>
              </Tooltip>
              <Tooltip color="danger" content="Eliminar presupuesto">
                <span className="text-xl text-[#f31260] cursor-pointer">
                  <CiTrash />
                </span>
              </Tooltip>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

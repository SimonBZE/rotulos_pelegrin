"use client";

import { useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Tab,
  Pagination,
  Tooltip,
} from "@nextui-org/react";
import { IoEyeOutline } from "react-icons/io5";
import { CiEdit, CiTrash } from "react-icons/ci";
import { usePathname, useSearchParams, useRouter } from "next/navigation";

export function Tabla({ data, meta }) {
  const [presupuestos, setPresupuestos] = useState(data);
  const [paginacion, setPaginacion] = useState(meta);

  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  console.log(searchParams.get("search"));

  const createPageUrl = (page) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", page);
    console.log(`${pathname}?${params.toString()}`);
    replace(`${pathname}?${params.toString()}`);
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    return new Intl.DateTimeFormat("es-ES", options).format(
      new Date(dateString)
    );
  };
  
  return (
    <Table
      aria-label="Todos los presupuestos, aprovados y sin aprovar"
      bottomContent={
        paginacion.pageCount > 0 ? (
          <div className="flex w-full justify-center">
            <Pagination
              isCompact
              showControls
              showShadow
              color="primary"
              page={paginacion.page}
              total={paginacion.pageCount}
              onChange={(page) => {
                setPaginacion({ ...paginacion, page: page }),
                  createPageUrl(page);
              }}
            />
          </div>
        ) : null
      }
    >
      <TableHeader>
        <TableColumn>ID</TableColumn>
        <TableColumn>Cliente</TableColumn>
        <TableColumn>Fecha de creación</TableColumn>
        <TableColumn>Fecha de entrega</TableColumn>
        <TableColumn>Aprovado</TableColumn>
        <TableColumn>Total</TableColumn>
        <TableColumn>Acciones</TableColumn>
      </TableHeader>
      <TableBody emptyContent={"No rows to display."}>
        {presupuestos.map((presupuesto) => (
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
            <TableCell className="flex gap-3">
              <Tooltip content="Ver factura">
                <span className="text-xl text-default-500 cursor-pointer">
                  <IoEyeOutline />
                </span>
              </Tooltip>
              <Tooltip content="Editar presupuesto">
                <span className="text-xl text-primary cursor-pointer  ">
                  <CiEdit />
                </span>
              </Tooltip>
              <Tooltip color="danger" content="Eliminar presupuesto">
                <span
                  
                  className="text-xl text-danger cursor-pointer"
                >
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

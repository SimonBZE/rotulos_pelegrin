'use client'

import { IoMdPersonAdd } from "react-icons/io";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  User,
  Chip,
  Spinner,
} from "@nextui-org/react";
import { useState } from "react";
import { AgregarCliente } from "@/components/clientes";

export default function page() {
  const [clientes, setClientes] = useState([]);
  const [cargando, setCargando] = useState(true);
  return (
    <>
      <div className="flex flex-col justify-between mb-3 xsm:flex-row gap-3">
        <h1 className="text-title-md font-semibold text-black dark:text-white">
          Clientes
        </h1>
        <AgregarCliente />
      </div>
      <div>
        <Table
          aria-label="Todos los clientes, aprovados y sin aprovar"
          // topContent={
          //   <TopContent
          //     query={query}
          //     status={status}
          //     estado={estado}
          //     fecha={fecha}
          //     fechaEnd={fechaEnd}
          //     cantidad={clientes.length}
          //   />
          // }
          topContentPlacement="outside"
          // bottomContent={
          //   paginacion.pageCount > 0 ? (
          //     <Paginacion paginacion={paginacion} />
          //   ) : null
          // }
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
            items={clientes?.id ?? []}
            emptyContent={<p>No hay clientes</p>}
            isLoading={cargando}
            loadingContent={<Spinner />}
          >
            {clientes?.map((presupuesto) => (
              <TableRow key={presupuesto.id}>
                <TableCell>
                  {presupuesto.attributes.idpresupuesto}
                  {presupuesto.id}
                </TableCell>
                <TableCell>{presupuesto.attributes.cliente}</TableCell>
                <TableCell>
                  {formatDate(presupuesto.attributes.publishedAt)}
                </TableCell>
                <TableCell>
                  {formatDate(presupuesto.attributes.fecha)}
                </TableCell>
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
                      onClick={() =>
                        router.push(`/clientes/${presupuesto.id}`)
                      }
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
      </div>
    </>
  );
}

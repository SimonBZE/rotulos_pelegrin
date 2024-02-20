"use client";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Chip,
  Spinner,
  Tooltip,
} from "@nextui-org/react";
import { useState, useEffect, useCallback } from "react";
import { AgregarCliente } from "@/components/clientes";
import { Client } from "@/api/client";
import { IoEyeOutline } from "react-icons/io5";
import { EliminarCliente } from "./components/EliminarCliente";
import { EditarCliente } from "@/components/clientes/EditarCliente";
import { TopContent } from "./components/TopContent";
import { useDebouncedCallback } from "use-debounce";
import { Paginacion } from "@/components/common/Paginacion";
import { useRouter } from "next/navigation";

const clientCtrl = new Client();

const buildFilters = (query, tipo, page) => {
  const filters = new URLSearchParams();
  if (tipo && tipo !== "") {
    filters.append("filters[tipo][$contains]", tipo);
  }
  // if (page) {
  //   filters.append("pagination[page]", page);
  // }
  if (page) {
    filters.append("pagination[page]", page);
  }

  if (query) {
    filters.append(`filters[$or][0][nombre][$contains]`, query);
    filters.append(`filters[$or][1][documento][$contains]`, query);
    filters.append(`filters[$or][2][correo][$contains]`, query);

    console.log(filters);
    return filters.toString();
  }

  return filters.toString();
};

const fetchData = async (query, tipo, page) => {
  const filters = buildFilters(query, tipo, page);
  const res = await clientCtrl.getClients(filters);
  return res;
};

export function Tabla({ query, tipo, page }) {
  const [clientes, setClientes] = useState();
  const [cargando, setCargando] = useState(true);
  const [paginacion, setPaginacion] = useState([]);
  const router = useRouter();

  const getClients = useDebouncedCallback(async () => {
    setCargando(true);
    const { data: clientes, meta: pagination } = await fetchData(
      query,
      tipo,
      page, 
      router
    );

    setClientes(clientes);
    setPaginacion(pagination.pagination);
    setCargando(false);
  }, 1000);

  const eliminarCliente = useCallback(async (id) => {
    try {
      const data = await clientCtrl.deleteClient(id);
      getClients();
    } catch (error) {
      return error;
    }
  }, []);

  useEffect(() => {
    getClients();
  }, [query, tipo, page, router]);


  return (
    <>
      
      <div className="flex flex-col justify-between mb-3 xsm:flex-row gap-3">
        <h1 className="text-title-md font-semibold text-black dark:text-white">
          Clientes
        </h1>
        <AgregarCliente getClients={getClients} />
      </div>
      <div>
        <Table
          aria-label="Todos los clientes, aprovados y sin aprovar"
          topContent={
            <TopContent
              query={query}
              tipo={tipo}
              paginacion={paginacion}
            />
          }
          topContentPlacement="outside"
          bottomContent={
            paginacion.pageCount > 1 ? (
              <Paginacion paginacion={paginacion} />
            ) : null
          }
          bottomContentPlacement="outside"
        >
          <TableHeader>
            <TableColumn>Cliente</TableColumn>
            <TableColumn>Documento</TableColumn>
            <TableColumn>Teléfono</TableColumn>
            {/* <TableColumn>Correo</TableColumn> */}
            <TableColumn>Tipo</TableColumn>
            <TableColumn>Acciones</TableColumn>
          </TableHeader>
          <TableBody
            items={clientes?.id ?? []}
            emptyContent={<p>No hay clientes</p>}
            isLoading={cargando}
            loadingContent={<Spinner />}
          >
            {clientes?.map((cliente) => (
              <TableRow key={cliente.id}>
                <TableCell>{cliente.attributes.nombre}</TableCell>
                <TableCell>{cliente.attributes.documento}</TableCell>
                <TableCell>{cliente.attributes.telefono}</TableCell>
                {/* <TableCell>{cliente.attributes.correo}</TableCell> */}
                <TableCell>
                  <Chip
                    color={
                      cliente.attributes.tipo === "empresa"
                        ? "success"
                        : "secondary"
                    }
                  >
                    {cliente.attributes.tipo}
                  </Chip>
                </TableCell>
                <TableCell className="flex gap-3">
                  <Tooltip content="Ver cliente">
                    <span className="text-xl text-default-500 cursor-pointer p-0 m-0">
                      <IoEyeOutline />
                    </span>
                  </Tooltip>
                  <EditarCliente id={cliente.id} getClients={getClients} />
                  <EliminarCliente
                    eliminarCliente={eliminarCliente}
                    id={cliente.id}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
}

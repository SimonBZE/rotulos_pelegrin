"use client";

import { Client } from "@/api";
import { useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Tooltip,
  Chip,
  Spinner,
} from "@nextui-org/react";
import { CiEdit, CiTrash, CiViewList, CiUser, CiPhone } from "react-icons/ci";
import { FaRegAddressCard } from "react-icons/fa6";
import { FaMapMarkerAlt } from "react-icons/fa";
import { EditarCliente } from "@/components/clientes/EditarCliente";
import { colores } from "@/utils";
import { useRouter } from "next/navigation";
import { Projects } from "@/api";
import { EliminarPresupuesto } from "@/components/Presupuestos/EliminarPresupuesto";

const clientCtrl = new Client();
const projectsCtrl = new Projects();

const Cliente = ({ id }) => {
  const [cliente, setCliente] = useState(null); // Inicializa cliente como null para manejar el estado de carga
  const [loading, setLoading] = useState(true); // Estado para manejar la visualización del cargando
  

  const router = useRouter();

  const fetchCliente = async () => {
    try {
      setLoading(true); // Activa el indicador de carga
      const result = await clientCtrl.getClienteTest(id);
      if (result && result.data && result.data.attributes) {
        setCliente(result.data.attributes); // Asigna los datos al estado cliente
      } else {
        setCliente(null); // Si no se encuentran datos, asegura que el cliente es null
      }
    } catch (error) {
      console.error("Error al obtener los datos del cliente:", error);
      setCliente(null); // Maneja los errores limpiando el estado
    } finally {
      setLoading(false); // Desactiva el indicador de carga independientemente del resultado
      
    }
  };

  const reloadCliente = async () => {
    setLoading(true);
    try {
        const result = await clientCtrl.getClienteTest(id);
        if (result && result.data && result.data.attributes) {
            setCliente(result.data.attributes);
        } else {
            setCliente(null);
        }
    } catch (error) {
        console.error("Error al obtener los datos del cliente:", error);
        setCliente(null);
    } finally {
        setLoading(false);
    }
};

  useEffect(() => {
    fetchCliente();
  }, [id]); // Dependencia id para reaccionar a cambios del id

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    return new Intl.DateTimeFormat("es-ES", options).format(
      new Date(dateString)
    );
  };

  const eliminarPresupuesto = async (id) => {
    try {      
      const data = await projectsCtrl.deleteBudget(id);
      
      fetchCliente();
    } catch (error) {
      return error;
    }
  }

  return (
    <div>
      {loading && <h2>Cargando...</h2>}

      {!loading && cliente && (
        <>
          <div className="flex flex-col justify-between mb-3 xsm:flex-row gap-3">
            <h1 className="text-title-md font-semibold text-black dark:text-white">
              Cliente
            </h1>
            
            <EditarCliente id={id} boton={true} actualizarCliente={reloadCliente} />
          </div>
          <div className="flex flex-col sm:flex-row justify-between pb-3 rounded-xl p-3 mb-3 bg-slate-100">
            <div>
              <h2 className="flex items-center gap-1">
                <CiUser />
                {cliente.nombre}
              </h2>
              <p className="flex items-center gap-2">
                {" "}
                <FaRegAddressCard /> {cliente.documento}
              </p>
            </div>
            <div>
              <p className="flex items-center gap-2">
                <CiPhone /> {cliente.telefono}
              </p>
              <p className="flex items-center gap-2">
                <FaMapMarkerAlt /> {cliente.direccion}, {cliente.ciudad},{" "}
                {cliente.cp}, {cliente.region}, {cliente.pais}
              </p>
            </div>
          </div>
          <Table removeWrapper aria-label="Proyectos del cliente">
            <TableHeader>
              <TableColumn>ID</TableColumn>
              <TableColumn>Nombre</TableColumn>
              <TableColumn>Fecha de creación</TableColumn>
              <TableColumn>Fecha de entrega</TableColumn>
              <TableColumn>Aprovado</TableColumn>
              <TableColumn>Total</TableColumn>
              <TableColumn>Estado</TableColumn>
              <TableColumn>Acciones</TableColumn>
            </TableHeader>
            <TableBody
              emptyContent={<p>No hay presupuestos</p>}
              isLoading={loading}
              loadingContent={<Spinner />}
            >
              {cliente?.presupuestos?.data.map((client) => (
                <TableRow key={client.id}>
                  <TableCell>{client.id}</TableCell>
                  <TableCell>{client.attributes.nombre}</TableCell>
                  <TableCell>
                    {formatDate(client.attributes.createdAt)}
                  </TableCell>
                  <TableCell>{client.attributes.fecha}</TableCell>
                  <TableCell>
                    {client.attributes.aprovacion ? (
                      <p className="text-success font-bold">Si</p>
                    ) : (
                      <p className="text-danger font-bold">No</p>
                    )}
                  </TableCell>
                  <TableCell>{client.attributes.total} €</TableCell>
                  <TableCell className="capitalize">
                    <Chip
                      size="sm"
                      color={`${colores[[client.attributes.estado]]}`}
                    >
                      {client.attributes.estado}
                    </Chip>
                  </TableCell>
                  <TableCell className="flex gap-3">
                    <Tooltip content="ver proyecto">
                      <span
                        className="text-xl text-green-600 cursor-pointer"
                        onClick={() => router.push(`/proyecto/${client.id}`)}
                      >
                        <CiViewList />
                      </span>
                    </Tooltip>
                    <Tooltip content="Editar presupuesto">
                      <span
                        className="text-xl text-primary cursor-pointer"
                        onClick={() =>
                          router.push(`/presupuestos/${client.id}`)
                        }
                      >
                        <CiEdit />
                      </span>
                    </Tooltip>
                    
                    <EliminarPresupuesto id={client.id} getData={fetchCliente} eliminarPresupuesto={eliminarPresupuesto} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </>
      )}

      {!loading && !cliente && (
        <h2 className="text-title-lg text-black text-center">
          El cliente no fue encontrado o no existe.
        </h2>
      )}
    </div>
  );
};

export default Cliente;

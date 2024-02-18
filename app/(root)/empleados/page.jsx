"use client";
import { useCallback, useEffect, useState } from "react";
import {Skeleton} from "@nextui-org/react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  User,
  Chip,
} from "@nextui-org/react";



import { User as Empleado } from "@/api/user";
import { ENV } from "@/utils";
import { AgregarEmpleado } from "./components/AgregarEmpleado";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/useToast";
import { ConfirmarEliminarEmpleado } from "./components/ConfirmarEliminarEmpleado";
import { EditarEmpleado } from "./components/EditarEmpleado";

const statusColorMap = {
  false: "success",
  true: "danger",
};

const columns = [
  { name: "NOMBRE", uid: "name" },
  { name: "ROL", uid: "role" },
  { name: "ESTADO", uid: "status" },
  { name: "ACCIONES", uid: "actions" },
];

const userCtrl = new Empleado();

export default function Empleados() {
  const [empleados, setEmpleados] = useState([]);

  const router = useRouter();
  const { user } = useAuth();

  const { notify } = useToast();

  const getUsers = useCallback(async () => {
    try {
      const data = await userCtrl.getAll();
      setEmpleados(data);
    } catch (error) {
      return error;
    }
  }, []);

  const eliminarEmpleado = useCallback(async (id) => {
    if (user.id === id) {
      notify("No puedes eliminar tu propio usuario", "error");
      return;
    }
    try {
      const data = await userCtrl.deleteUser(id);
      getUsers();
    } catch (error) {
      return error;
    }
  }, []);

  useEffect(() => {
    if (user?.rol !== "administrador") {
      router.push("/");
    }
  }, []);

  useEffect(() => {
    async function fetchData() {
      const data = await getUsers();
    }
    fetchData();
  }, []);

  return (
    <>
      <div className="flex flex-col justify-between mb-3 xsm:flex-row gap-3">
        <div>
          <h2 className="text-title-md font-semibold text-black dark:text-white">
            Empleados
          </h2>
        </div>
        <div className="flex gap-3 items-center">
          <AgregarEmpleado getUsers={getUsers} />
        </div>
      </div>
      <Table aria-label="Tabla de empleados">
        <TableHeader columns={columns}>
          {columns.map((column) => (
            <TableColumn key={column.uid}>{column.name}</TableColumn>
          ))}
        </TableHeader>
        <TableBody>
          {empleados?.map((empleado) => (
            // Usuario
            <TableRow key={empleado.id}>
              <TableCell>
                <User
                  avatarProps={{
                    radius: "lg",
                    src: empleado.foto?.url
                      ? `${ENV.SERVER_HOST}${empleado.foto?.url}`
                      : "",
                  }}
                  description={empleado.email}
                  name={
                    <p className="labels">
                      {empleado.firstname} {empleado.lastname}
                    </p>
                  }
                >
                  {empleado.email}
                </User>
              </TableCell>
              <TableCell>
                {/* Rol */}
                <div className="flex flex-col">
                  <p className="text-bold capitalize text-black">
                    {empleado.rol}
                  </p>
                </div>
              </TableCell>
              <TableCell>
                {/* estado */}
                <Chip
                  className="capitalize"
                  color={statusColorMap[empleado.blocked]}
                  size="sm"
                  variant="flat"
                >
                  {!empleado.blocked ? "Activo" : "Inactivo"}
                </Chip>
              </TableCell>
              <TableCell>
                {/* Acciones */}
                <div className="relative flex items-center gap-2">
                  {/* <Tooltip content="Detalles">
                        <span className="text-xl text-default-400 cursor-pointer active:opacity-50">
                          <IoEyeOutline />
                        </span>
                      </Tooltip> */}

                  <EditarEmpleado id={empleado.id} getUsers={getUsers} />

                  {user?.id === empleado.id ? null : (
                    <ConfirmarEliminarEmpleado
                      eliminarEmpleado={eliminarEmpleado}
                      id={empleado.id}
                    />
                  )}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}

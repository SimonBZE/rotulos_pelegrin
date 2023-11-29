"use client";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  User,
  Chip,
  Tooltip,
  Button,
  Spinner,
} from "@nextui-org/react";
import { CiEdit, CiTrash } from "react-icons/ci";
import { IoEyeOutline, IoSearch } from "react-icons/io5";
import { IoMdPersonAdd } from "react-icons/io";
import { columns, users } from "./data";
import { useCallback, useEffect, useState } from "react";
import { User as Empleado } from "@/api/user";
import { ENV } from "@/utils";
import { MyInput } from "@/components/ui";

const statusColorMap = {
  false: "success",
  true: "danger",
};

const userCtrl = new Empleado();

export default function Empleados() {
  const [empleados, setEmpleados] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getUsers = useCallback(async () => {
    try {
      const data = await userCtrl.getAll();
      console.log(data);
      return data;
    } catch (error) {
      return error;
    }
  }, []);

  useEffect(() => {
    async function fetchData() {
      const data = await getUsers();
      setEmpleados(data);
    }

    fetchData();
  }, []);

  return (
    <div>
      {empleados.length < 1 ? (
       <div className="flex justify-center items-center h-[calc(100vh-140px)]">
        
          <Spinner size="xl"/>
              
       </div>
      ) : (
        <>
          <div className="flex flex-col justify-between mb-3 xsm:flex-row gap-3">
            <div>
              <h2 className="text-title-md font-semibold text-black dark:text-white">
                Empleados
              </h2>
            </div>
            <div className="flex gap-3">
              <Button startContent={<IoMdPersonAdd />} color="primary">
                {" "}
                Agregar empleado
              </Button>
              <MyInput
                classNames={{
                  base: "max-w-full sm:max-w-[10rem] h-10",
                  mainWrapper: "h-full",
                  input: "text-small",
                  inputWrapper:
                    "h-full font-normal text-default-500 bg-white dark:bg-default-500/20",
                }}
                placeholder="Buscar empleado"
                size="sm"
                startContent={<IoSearch size={18} />}
                type="search"
              />
            </div>
          </div>
          <Table aria-label="Example table with custom cells">
            <TableHeader columns={columns}>
              {columns.map((column) => (
                <TableColumn key={column.uid}>{column.name}</TableColumn>
              ))}
            </TableHeader>
            <TableBody items={users}>
              {empleados.map((user) => (
                // Usuario
                <TableRow key={user.id}>
                  <TableCell>
                    <User
                      avatarProps={{ radius: "lg", src: user.foto?.url ? `${ENV.SERVER_HOST}${user.foto?.url}` : "" }}
                      description={user.email}
                      name={<p className="labels">{user.firstname} {user.lastname}</p>}
                    >
                      {user.email}
                    </User>
                  </TableCell>
                  <TableCell>
                    {/* Rol */}
                    <div className="flex flex-col">
                      <p className="text-bold capitalize text-black">
                        {user.rol}
                      </p>
                      
                    </div>
                  </TableCell>
                  <TableCell>
                    {/* estado */}
                    <Chip
                      className="capitalize"
                      color={statusColorMap[user.blocked]}
                      size="sm"
                      variant="flat"
                    >
                      {!user.blocked ? "Activo" : "Inactivo"}
                    </Chip>
                  </TableCell>
                  <TableCell>
                    {/* Acciones */}
                    <div className="relative flex items-center gap-2">
                      <Tooltip content="Detalles">
                        <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                          <IoEyeOutline />
                        </span>
                      </Tooltip>
                      <Tooltip content="Editar empleado">
                        <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                          <CiEdit />
                        </span>
                      </Tooltip>
                      <Tooltip color="danger" content="Eliminar empleado">
                        <span className="text-lg text-danger cursor-pointer active:opacity-50">
                          <CiTrash />
                        </span>
                      </Tooltip>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </>
      )}
    </div>
  );
}

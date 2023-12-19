import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
} from "@nextui-org/react";
import { IoSearch, IoChevronDown, IoAddOutline } from "react-icons/io5";
import { useEffect, useState, useMemo } from "react";

const statusOptions = [
  { name: "Aprovado", uid: "aprovado" },
  { name: "Sin aprovar", uid: "no-aprovado" },
];

const estadoProyecto = [
  "incidencia",
  "en curso",
  "en pausa",
  "terminado",
  "en cola",
];

export const TopContent = ({ query, status, estado, cantidad }) => {
  const [statusFilter, setStatusFilter] = useState("all");
  const [estadoFilter, setEstadoFilter] = useState("all");
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const onSearchChange = (query) => {
    const params = new URLSearchParams(searchParams);
    if (query.trim().length > 0) {
      params.set("query", query.trim());
    } else {
      params.delete("query");
    }
    router.replace(`${pathname}?${params.toString()}`);
  };

  const onEstadoChange = (estado) => {
    const params = new URLSearchParams(searchParams);
    setStatusFilter(estado);
    const values = [...estado.values()];
    if (values.length === 2) {
      params.delete("status");
    } else if (values.includes("aprovado")) {
      params.set("status", "true");
    } else if (values.includes("no-aprovado")) {
      params.set("status", "false");
    }

    router.replace(`${pathname}?${params.toString()}`);
  };

  const selectedValue = (estado) => {
    const params = new URLSearchParams(searchParams);
    setEstadoFilter(estado);
    const values = [...estado.values()];

    params.delete("estado"); // Elimina el parámetro "estado" existente

    if (values.length !== 5) {
      // Si no están todos seleccionados
      values.forEach((value) => {
        params.append("estado", value); // Añade cada valor como un nuevo parámetro "estado"
      });
    }

    router.replace(`${pathname}?${params.toString()}`);
  };

  useEffect(() => {
    if (status === "true") {
      onEstadoChange(new Set(["aprovado"]));
    }

    if (status === "false") {
      onEstadoChange(new Set(["no-aprovado"]));
    }

    if (estado) {
      selectedValue(new Set(estado));
    }
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between gap-3 items-end">
        <Input
          isClearable
          className="w-full sm:max-w-[44%]"
          placeholder="Buscar por ID"
          startContent={<IoSearch />}
          value={query || ""}
          onValueChange={onSearchChange}
        />
        <div className="flex gap-3">
          <Dropdown>
            <DropdownTrigger className="hidden sm:flex">
              <Button
                endContent={<IoChevronDown className="text-small" />}
                variant="flat"
              >
                Aprovado
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              disallowEmptySelection
              aria-label="Table Columns"
              closeOnSelect={false}
              selectedKeys={statusFilter}
              selectionMode="multiple"
              onSelectionChange={onEstadoChange}
            >
              {statusOptions.map((status) => (
                <DropdownItem key={status.uid} className="capitalize">
                  {status.name}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>

          {/* Columnas */}
          {/* <Dropdown>
            <DropdownTrigger className="hidden sm:flex">
              <Button
                endContent={<IoChevronDown className="text-small" />}
                variant="flat"
              >
                Columns
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              disallowEmptySelection
              aria-label="Table Columns"
              closeOnSelect={false}
              selectedKeys={estadoFilter}
              selectionMode="multiple"
              // onSelectionChange={setVisibleColumns}
            >
              {columns.map((column) => (
                  <DropdownItem key={column.uid} className="capitalize">
                    {capitalize(column.name)}
                  </DropdownItem>
                ))}
            </DropdownMenu>
          </Dropdown> */}

          <Dropdown>
            <DropdownTrigger className="hidden sm:flex">
              <Button
                endContent={<IoChevronDown className="text-small" />}
                variant="flat"
              >
                Estado
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              disallowEmptySelection
              aria-label="Table Columns"
              closeOnSelect={false}
              selectedKeys={estadoFilter}
              selectionMode="multiple"
              onSelectionChange={selectedValue}
              // onSelectionChange={setVisibleColumns}
            >
              {estadoProyecto.map((estado) => (
                <DropdownItem key={estado} className="capitalize">
                  {estado}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>

          <Button
            color="primary"
            endContent={<IoAddOutline />}
            onClick={() => router.push("/nuevo-proyecto")}
          >
            Crear
          </Button>
        </div>
      </div>
      <div className="flex justify-between items-center">
        <div className="flex gap-3">
          <Dropdown>
            <DropdownTrigger className="flex sm:hidden">
              <Button
                endContent={<IoChevronDown className="text-small" />}
                variant="flat"
              >
                Aprovado
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              disallowEmptySelection
              aria-label="Table Columns"
              closeOnSelect={false}
              selectedKeys={statusFilter}
              selectionMode="multiple"
              onSelectionChange={onEstadoChange}
            >
              {statusOptions.map((status) => (
                <DropdownItem key={status.uid} className="capitalize">
                  {status.name}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
          <Dropdown>
            <DropdownTrigger className="flex sm:hidden">
              <Button
                endContent={<IoChevronDown className="text-small" />}
                variant="flat"
              >
                Estado
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              disallowEmptySelection
              aria-label="Table Columns"
              closeOnSelect={false}
              selectedKeys={estadoFilter}
              selectionMode="multiple"
              onSelectionChange={selectedValue}
              // onSelectionChange={setVisibleColumns}
            >
              {estadoProyecto.map((estado) => (
                <DropdownItem key={estado} className="capitalize">
                  {estado}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
        </div>

        <span className="text-default-400 text-small">
          {cantidad} presupuestos
        </span>
      </div>
    </div>
  );
};

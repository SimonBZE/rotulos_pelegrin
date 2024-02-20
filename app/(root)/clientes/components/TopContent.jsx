import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
} from "@nextui-org/react";
import { IoChevronDown, IoSearch } from "react-icons/io5";
import { useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";

const TipoCliente = [
  "persona",
  "empresa"
]

export const TopContent = ({ query, tipo, paginacion }) => {
  const [tipoFilter, setTipoFilter] = useState("all");
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const onSearchChange = (query) => {
    const params = new URLSearchParams(searchParams);

    if(paginacion.pageCount >= 1 || paginacion.page > paginacion.pageCount){
      params.delete("page")
    }

    if (query.trim().length > 0) {
      params.set("query", query.trim());      
    } else {
      params.delete("query");
    }
    router.replace(`${pathname}?${params.toString()}`);
  };


  const selectedValue = (tipo) => {
    const params = new URLSearchParams(searchParams);
    console.log(tipo)
    setTipoFilter(tipo);
    const values = [...tipo.values()];

    params.delete("tipo"); // Elimina el parámetro "tipo" existente

    if (values.length !== 2) {
      // Si no están todos seleccionados
      values.forEach((value) => {
        params.append("tipo", value); // Añade cada valor como un nuevo parámetro "tipo"
      });
    }
    
    if(paginacion.pageCount <= 1){
      params.delete("page");
    }

    router.replace(`${pathname}?${params.toString()}`);
  };

  useEffect(() => {
    
    if (tipo) {
      selectedValue(new Set(tipo));
    }
  }, []);

  return (
    <>
      <div className="flex flex-col gap-4">
        <div className="flex justify-between gap-3 items-end">
          <Input
            isClearable
            className="w-full sm:max-w-[44%]"
            placeholder="Buscar cliente"
            startContent={<IoSearch />}
            defaultValue={query || ""}
            onValueChange={onSearchChange}
            classNames={{
              inputWrapper: "h-[40px]",
            }}
          />

          <p>Total clientes: {paginacion.total}</p>

          {/* <Dropdown>
            <DropdownTrigger className="hidden sm:flex">
              <Button
                endContent={<IoChevronDown className="text-small" />}
                variant="flat"
              >
                Tipo
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              disallowEmptySelection
              aria-label="Table Columns"
              closeOnSelect={false}
              selectionMode="multiple"
              selectedKeys={tipoFilter}
              onSelectionChange={selectedValue}
            >
              {TipoCliente.map((cliente) => (
                  <DropdownItem key={cliente} className="capitalize">
                    {cliente}
                  </DropdownItem>
                ))}
            </DropdownMenu>
          </Dropdown> */}
        </div>
        <div className="flex gap-3"></div>
      </div>
    </>
  );
};

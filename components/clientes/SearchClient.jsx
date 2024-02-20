import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  Button,
  Input,
} from "@nextui-org/react";

import { MailIcon, SearchIcon } from "lucide-react";
import { useEffect, useState } from "react";

import { Client } from "@/api/client";
import { EditarClientePresupuesto } from "./EditarClientePresupuesto";
import { NuevoClientePresupuesto } from "./NuevoClientePresupuesto";
import { IoSearchOutline } from "react-icons/io5";

const clientCtrl = new Client();

const fetchData = async (busqueda) => {
  let searchWords = `filters[$or][0][nombre][$contains]=${busqueda}&filters[$or][1][documento][$contains]=${busqueda}&filters[$or][2][correo][$contains]=${busqueda}`;

  const res = await clientCtrl.getClients(searchWords);
  return res.data;
};

export const SearchClient = ({ formik, cliente: dataClient = "" }) => {
  const [cargando, setCargando] = useState(false);
  const [clientes, setClientes] = useState([]);
  const [cliente, setCliente] = useState({});
  const [buscador, setBuscador] = useState("");

  const [isOpen, setIsOpen] = useState(false);

  const onSearchChange = async (data) => {
    const cliente = await fetchData(data);
    setClientes(cliente);
    setBuscador(data);
  };

  const actualizarCliente = (datos) => {
    setCliente(datos);
    // formik.
  };

  const handleClick = () => {
    setClientes([]);
    setBuscador("");
  };

  useEffect(() => {
    if (dataClient !== "") {
      formik.setFieldValue("client", dataClient.id);
      const conversion = {
        id: dataClient.id,
        attributes: {
          tipo: dataClient.tipo,
          nombre: dataClient.nombre,
          documento: dataClient.documento,
          telefono: dataClient.telefono,
          correo: dataClient.correo,
          pais: dataClient.pais,
          calle: dataClient.calle,
          ciudad: dataClient.ciudad,
          region: dataClient.region,
          cp: dataClient.cp,
          // Estos campos se añaden estáticamente ya que no están presentes en el objeto original
        },
      };
      setCliente(conversion);
    }
  }, [dataClient]);

  useEffect(() => {
    formik.setFieldValue("client", cliente.id);
  }, [cliente]);

  return (
    <div className="flex items-center">
      {cliente.attributes?.nombre ? (
        <EditarClientePresupuesto
          cliente={cliente}
          actualizarCliente={actualizarCliente}
        />
      ) : (
        <Popover
          isOpen={isOpen}
          placement="bottom"
          onOpenChange={(open) => setIsOpen(open)}
          showArrow
          offset={10}
        >
          <PopoverTrigger>
            <div
              className="flex justify-between gap-3 p-3 items-center cursor-pointer border-1 border-slate-300 rounded-sm"
              onClick={handleClick}
            >
              <IoSearchOutline />
              <p>Buscar cliente</p>

            </div>
          </PopoverTrigger>
          <PopoverContent className="w-[240px] z-1">
            {() => (
              <div className="px-1 py-2 w-full">
                <div className="mt-2 flex flex-col gap-2 w-full max-h-50 overflow-y-auto">
                  <Input
                    startContent={
                      <SearchIcon className="text-black/50 mb-0.5 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0" />
                    }
                    size="sm"
                    variant="bordered"
                    onValueChange={onSearchChange}
                  />
                  {buscador.length < 1 && <p>Empieza a escribir para buscar</p>}

                  {clientes.map((cliente) => (
                    <div
                      className="cursor-pointer "
                      key={cliente.id}
                      onClick={() => setCliente(cliente)}
                    >
                      {cliente.attributes.nombre}
                    </div>
                  ))}
                  {/* {buscador.length > 1 && (
                    <NuevoClientePresupuesto
                      actualizarCliente={actualizarCliente}
                      setIsOpen={setIsOpen}
                    />
                  )} */}
                </div>
              </div>
            )}
          </PopoverContent>
        </Popover>
      )}
      {! cliente.attributes?.nombre && (
        <NuevoClientePresupuesto
          actualizarCliente={actualizarCliente}
          setIsOpen={setIsOpen}
        />
      )}
    </div>
  );
};

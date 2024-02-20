import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
  Tooltip,
} from "@nextui-org/react";

import { ModalEditarCliente } from "./ModalEditarCliente";
 

export const EditarClientePresupuesto = ({ cliente, actualizarCliente }) => {
    const {id} = cliente
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <>
    
      <div className="border-1 border-slate-200 p-3 cursor-pointer relative">
        <div
          className="px-[5px] py-[3] absolute top-1 right-1 rounded-full border-1 text-white bg-black text-xs"
          onClick={() => actualizarCliente({})}
        >
          X
        </div>
        <div onClick={() => onOpen()} className="cursor-pointer">
        <p className="font-bold ">{cliente.attributes?.nombre}</p>
        <p className="text-sm">{cliente.attributes?.documento}</p>
        <p className="text-sm">
          {cliente.attributes?.calle}, {cliente.attributes?.ciudad},{" "}
          {cliente.attributes?.region}, {cliente.attributes?.cp} -{" "}
          {cliente.attributes?.pais}{" "}
        </p>

        </div>
      </div>
      <Modal
        backdrop="blur"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        isDismissable={false}
        size="5xl"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Editar cliente
              </ModalHeader>
              <ModalBody>
                <ModalEditarCliente
                  id={id}
                  actualizarCliente={actualizarCliente}
                  onClose={onClose}
                />
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

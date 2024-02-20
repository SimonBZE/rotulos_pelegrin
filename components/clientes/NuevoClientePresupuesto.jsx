import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    Button,
    useDisclosure,
  } from "@nextui-org/react";
  
  
  import { ModalClientes } from "./ModalClientes";
import { IoPersonAdd } from "react-icons/io5";
  
  export const NuevoClientePresupuesto = ({ getClients, actualizarCliente }) => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    
    const handleClick = () => {
      onOpen()
      // setIsOpen(false)
    }
    return (
      <div>
        
        <div onClick={handleClick} className="flex bg-slate-100 h-[50px] p-3 items-center gap-3 border-1 border-slate-200 rounded-sm cursor-pointer">
        <IoPersonAdd /><p>Crear</p>
  
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
                  Agregar cliente
                </ModalHeader>
                <ModalBody>
                  <ModalClientes onClose={onClose} getClients={getClients} actualizarCliente={actualizarCliente} />
                </ModalBody>
              </>
            )}
          </ModalContent>
        </Modal>
      </div>
    );
  };
  
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
  Tooltip,
  Button,
} from "@nextui-org/react";

import { ModalEditarCliente } from "./ModalEditarCliente";

import { CiEdit } from "react-icons/ci";
import { IoMdPersonAdd } from "react-icons/io";

export const EditarCliente = ({ id, getClients, boton = false, actualizarCliente = 0 }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <>
      {boton ? (
        <Button
          startContent={<IoMdPersonAdd />}
          onClick={() => onOpen()}
          color="primary"
        >
          {" "}
          Editar cliente
        </Button>
      ) : (
        <Tooltip content="Editar cliente">
          <a onClick={() => onOpen()} className="cursor-pointer text-xl">
            <CiEdit />
          </a>
        </Tooltip>
      )}

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
                  getClients={getClients}
                  onClose={onClose}
                  actualizarCliente={actualizarCliente}
                />
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

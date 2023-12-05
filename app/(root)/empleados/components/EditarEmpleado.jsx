import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Tooltip,
} from "@nextui-org/react";
import { IoMdPersonAdd } from "react-icons/io";

import { FormEditarEmpleado } from "./FormEditarEmpleado";
import { CiEdit } from "react-icons/ci";

export const EditarEmpleado = ({ getUsers, id }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <div>
      <Tooltip content="Editar empleado">
        <a onClick={() => onOpen()} className="cursor-pointer text-xl">
          <CiEdit />
        </a>
      </Tooltip>
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
                Agregar empleado
              </ModalHeader>
              <ModalBody>
                <FormEditarEmpleado onClose={onClose} getUsers={getUsers} id={id} />
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

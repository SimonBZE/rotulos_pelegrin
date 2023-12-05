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
import { CiTrash } from "react-icons/ci";

export const ConfirmarEliminarEmpleado = ({ eliminarEmpleado, id }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <>
      <Tooltip color="danger" content="Eliminar empleado">
        <a
          onClick={() => onOpen()}
          className="text-xl text-danger cursor-pointer active:opacity-50"
        >
          <CiTrash />
        </a>
      </Tooltip>
      <Modal backdrop="blur" isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Eliminar empleado
              </ModalHeader>
              <ModalBody>
                <p>Seguro que desea eliminar el empleado</p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cerrar
                </Button>
                <Button color="primary" onClick={() => eliminarEmpleado(id)}>
                  Eliminar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

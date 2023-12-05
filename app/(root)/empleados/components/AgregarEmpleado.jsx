import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { IoMdPersonAdd } from "react-icons/io";
import { FormEmpleado } from "./FormEmpleado";

export const AgregarEmpleado = ({ getUsers }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <div>
      <Button
        startContent={<IoMdPersonAdd />}
        onClick={() => onOpen()}
        color="primary"
      >
        {" "}
        Agregar empleado
      </Button>
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
                <FormEmpleado onClose={onClose} getUsers={getUsers} />
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

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

import { ModalClientes } from "./ModalClientes";

export const AgregarCliente = ({ getUsers }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <div>
      <Button
        startContent={<IoMdPersonAdd />}
        onClick={() => onOpen()}
        color="primary"
      >
        {" "}
        Agregar cliente
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
                Agregar cliente
              </ModalHeader>
              <ModalBody>
                <ModalClientes onClose={onClose} getUsers={getUsers} />
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

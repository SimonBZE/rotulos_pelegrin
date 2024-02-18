import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    useDisclosure,
    Tooltip,
  } from "@nextui-org/react";

  import { ModalEditarCliente } from './ModalEditarCliente'

  import { CiEdit } from "react-icons/ci";

export const EditarCliente = ({id, getClients}) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <>
    <Tooltip content="Editar cliente">
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
                Editar cliente
              </ModalHeader>
              <ModalBody>
                <ModalEditarCliente id={id} getClients={getClients} onClose={onClose} />
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}

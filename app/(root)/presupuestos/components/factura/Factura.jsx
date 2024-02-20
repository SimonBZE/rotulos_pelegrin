import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Checkbox,
  Input,
  Link,
  Tooltip,
} from "@nextui-org/react";
import Image from "next/image";

import { IoEyeOutline } from "react-icons/io5";

export const Factura = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Tooltip content="Ver factura">
        <span
          className="text-xl text-default-500 cursor-pointer p-0 m-0"
          onClick={onOpen}
        >
          <IoEyeOutline />
        </span>
      </Tooltip>
      <Modal 
      classNames={{
        backdrop: "bg-white"
      }}
      isOpen={isOpen} onOpenChange={onOpenChange} height="full" size="full" scrollBehavior="outside">
        <ModalContent>
          {(onClose) => (
            <>
              
              <ModalBody>
                <div className="px-4 sm:px-6 lg:px-8 mx-auto my-4 sm:my-10">
                  <div className="mx-auto">
                    {/* <!-- Card --> */}
                    <div className="flex flex-col p-4 sm:p-10 bg-white shadow-md rounded-xl dark:bg-gray-800">
                      {/* <!-- Grid --> */}
                      <div className="flex justify-between">
                        <div>
                          <Image src="/assets/Pelegrin-design.svg" width={200} height={15} alt="Pelegrin Design" className="w-full h-[15]" />

                          {/* <h1 className="mt-2 text-lg md:text-xl font-semibold text-blue-600 dark:text-white">
                            Preline Inc.
                          </h1> */}
                        </div>
                        {/* <!-- Col --> */}

                        <div className="text-end">
                          <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 dark:text-gray-200">
                            Factura #
                          </h2>
                          <span className="mt-1 block text-gray-500">
                          DICM180
                          </span>

                          <div className="mt-4 not-italic text-gray-800 dark:text-gray-200">
                          <b>ROTULOS PELEGRIN, S.L</b>
                          <br />
                          CL. PARAGUAY PARC.9/14
                            <br />
                            Alcantarilla, 30820
                            <br />
                            Murcia - España
                            <br />
                          </div>
                        </div>
                        {/* <!-- Col --> */}
                      </div>
                      {/* <!-- End Grid --> */}

                      {/* <!-- Grid --> */}
                      <div className="mt-8 grid sm:grid-cols-2 gap-3">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                            Facturado a:
                          </h3>
                          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                            Sara Williams
                          </h3>
                          <div className="mt-2 not-italic text-gray-500">
                            Calle Pintor Pedro Flores, 8,
                            <br />
                            30002, Murcia,
                            <br />
                            España
                            <br />
                          </div>
                        </div>
                        {/* <!-- Col --> */}

                        <div className="sm:text-end space-y-2">
                          {/* <!-- Grid --> */}
                          <div className="grid grid-cols-2 sm:grid-cols-1 gap-3 sm:gap-2">
                            <dl className="grid sm:grid-cols-5 gap-x-3">
                              <dt className="col-span-3 font-semibold text-gray-800 dark:text-gray-200">
                                Fecha de creación:
                              </dt>
                              <dd className="col-span-2 text-gray-500">
                                03/2/2024
                              </dd>
                            </dl>
                            {/* <dl className="grid sm:grid-cols-5 gap-x-3">
                              <dt className="col-span-3 font-semibold text-gray-800 dark:text-gray-200">
                                Fecha de vencimiento:
                              </dt>
                              <dd className="col-span-2 text-gray-500">
                                03/11/2024
                              </dd>
                            </dl> */}
                          </div>
                          {/* <!-- End Grid --> */}
                        </div>
                        {/* <!-- Col --> */}
                      </div>
                      {/* <!-- End Grid --> */}

                      {/* <!-- Table --> */}
                      <div className="mt-6">
                        <div className="border border-gray-200 p-4 rounded-lg space-y-4 dark:border-gray-700">
                          <div className="hidden sm:grid sm:grid-cols-5">
                            <div className="sm:col-span-2 text-xs font-medium text-gray-500 uppercase">
                              Descripción
                            </div>
                            <div className="text-start text-xs font-medium text-gray-500 uppercase">
                              Cant
                            </div>
                            <div className="text-start text-xs font-medium text-gray-500 uppercase">
                              Dto.
                            </div>
                            <div className="text-end text-xs font-medium text-gray-500 uppercase">
                              Precio
                            </div>
                          </div>

                          <div className="hidden sm:block border-b border-gray-200 dark:border-gray-700"></div>

                          <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                            <div className="col-span-full sm:col-span-2">
                              <h5 className="sm:hidden text-xs font-medium text-gray-500 uppercase">
                                Descripción
                              </h5>
                              <p className="font-medium text-gray-800 dark:text-gray-200">
                                Rotulacion impresion digital en puerta
                              </p>
                            </div>
                            <div>
                              <h5 className="sm:hidden text-xs font-medium text-gray-500 uppercase">
                              Dto
                              </h5>
                              <p className="text-gray-800 dark:text-gray-200">
                                2
                              </p>
                            </div>
                            <div>
                              <h5 className="sm:hidden text-xs font-medium text-gray-500 uppercase">
                              Precio
                              </h5>
                              <p className="text-gray-800 dark:text-gray-200">
                                0
                              </p>
                            </div>
                            <div>
                              <h5 className="sm:hidden text-xs font-medium text-gray-500 uppercase">
                              Precio
                              </h5>
                              <p className="sm:text-end text-gray-800 dark:text-gray-200">
                                120,00€
                              </p>
                            </div>
                          </div>

                          <div className="sm:hidden border-b border-gray-200 dark:border-gray-700"></div>

                          <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                            <div className="col-span-full sm:col-span-2">
                              <h5 className="sm:hidden text-xs font-medium text-gray-500 uppercase">
                                Item
                              </h5>
                              <p className="font-medium text-gray-800 dark:text-gray-200">
                                Limpieza y rotulación
                              </p>
                            </div>
                            <div>
                              <h5 className="sm:hidden text-xs font-medium text-gray-500 uppercase">
                                Qty
                              </h5>
                              <p className="text-gray-800 dark:text-gray-200">
                                1
                              </p>
                            </div>
                            <div>
                              <h5 className="sm:hidden text-xs font-medium text-gray-500 uppercase">
                                Rate
                              </h5>
                              <p className="text-gray-800 dark:text-gray-200">
                                0
                              </p>
                            </div>
                            <div>
                              <h5 className="sm:hidden text-xs font-medium text-gray-500 uppercase">
                                Amount
                              </h5>
                              <p className="sm:text-end text-gray-800 dark:text-gray-200">
                                20,00€
                              </p>
                            </div>
                          </div>

                          <div className="sm:hidden border-b border-gray-200 dark:border-gray-700"></div>

                          
                        </div>
                      </div>
                      {/* <!-- End Table --> */}

                      {/* <!-- Flex --> */}
                      <div className="mt-8 flex sm:justify-end">
                        <div className="w-full max-w-2xl sm:text-end space-y-2">
                          {/* <!-- Grid --> */}
                          <div className="grid grid-cols-2 sm:grid-cols-1 gap-3 sm:gap-2">
                            <dl className="grid sm:grid-cols-5 gap-x-3">
                              <dt className="col-span-3 font-semibold text-gray-800 dark:text-gray-200">
                                Subtotal:
                              </dt>
                              <dd className="col-span-2 text-gray-500">
                                140,00€
                              </dd>
                            </dl>

                            <dl className="grid sm:grid-cols-5 gap-x-3">
                              <dt className="col-span-3 font-semibold text-gray-800 dark:text-gray-200">
                                DTO:
                              </dt>
                              <dd className="col-span-2 text-gray-500">
                                0,00€
                              </dd>
                            </dl>

                            <dl className="grid sm:grid-cols-5 gap-x-3">
                              <dt className="col-span-3 font-semibold text-gray-800 dark:text-gray-200">
                                IVA:
                              </dt>
                              <dd className="col-span-2 text-gray-500">
                                29,40€
                              </dd>
                            </dl>

                            <dl className="grid sm:grid-cols-5 gap-x-3">
                              <dt className="col-span-3 font-semibold text-gray-800 dark:text-gray-200">
                                Total
                              </dt>
                              <dd className="col-span-2 text-gray-500">
                                169,40€
                              </dd>
                            </dl>

                            
                          </div>
                          {/* <!-- End Grid --> */}
                        </div>
                      </div>
                      {/* <!-- End Flex --> */}

                      <div className="mt-8 sm:mt-12">
                        <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                          FORMA DE PAGO
                        </h4>
                        <p className="text-gray-500">
                          IBAN ES09 2100 8270 9813 0008 2841
                        </p>
                        <div className="mt-2">
                          <p className="block text-sm font-medium text-gray-800 dark:text-gray-200">
                            NOTA: Los medios de elevacion y permisos administrativos, corren por cuenta del cliente y no van presupuetados. Válidez de este presupuesto 10 días
                          </p>
                          <p className="block text-sm font-medium text-gray-800 dark:text-gray-200">
                            administracion@pelegrindesign.com
                          </p>
                        </div>
                      </div>

                      <p className="mt-5 text-sm text-gray-500">
                        {/* © 2022 Preline. */}
                      </p>
                    </div>
                    {/* <!-- End Card --> */}

                    {/* <!-- Buttons --> */}
                    <div className="mt-6 flex justify-end gap-x-3">
                      <a
                        className="py-2 px-3 inline-flex justify-center items-center gap-2 rounded-lg border font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm dark:bg-gray-800 dark:hover:bg-slate-800 dark:border-gray-700 dark:text-gray-400 dark:hover:text-white dark:focus:ring-offset-gray-800"
                        href="#"
                      >
                        <svg
                          className="flex-shrink-0 w-4 h-4"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                          <polyline points="7 10 12 15 17 10" />
                          <line x1="12" x2="12" y1="15" y2="3" />
                        </svg>
                        Descargar PDF
                      </a>
                      <a
                        className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                        href="#"
                      >
                        <svg
                          className="flex-shrink-0 w-4 h-4"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polyline points="6 9 6 2 18 2 18 9" />
                          <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
                          <rect width="12" height="8" x="6" y="14" />
                        </svg>
                        Imprimir
                      </a>
                    </div>
                    {/* <!-- End Buttons --> */}
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Cerrar
                </Button>
                {/* <Button color="primary" onPress={onClose}>
                  Sign in
                </Button> */}
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

import { MultiModal } from "@/components/common/MultiModal";
import { useProjectContext } from "@/context/ProjectContext";
import { ENV } from "@/utils";
import { useState } from "react";
import Alert from "@/components/common/Alerts";

const motivo = {
  retroceder: "Devuelto al departamento anterior",
  incidencia: "Incidencia en proyecto",
  "en pausa": "Proyecto pausado",
};

export const Mensajes = () => {
  const { proyecto } = useProjectContext();
  const [modalOpen, setModalOpen] = useState(null);

  const handleModalOpen = (id) => {
    setModalOpen(id);
    console.log(id);
  };

  const handleModalClose = () => {
    setModalOpen(null);
  };
  
  return (
    <div>
      
      <div className="rounded-xl mt-5 p-5 border border-stroke bg-white shadow-default">
        <div>
          <p className="labels">Actualizaciones de estado</p>
        </div>
        <div className="md:flex">
          <div className="w-full p-4">
            {proyecto.attributes.mensajes.data.map((mensaje) => {
              const fecha = mensaje.attributes?.publishedAt ? new Date(mensaje.attributes.publishedAt) : new (Date);
              return (
                <div key={mensaje.id} className="mb-10">
                  {mensaje.attributes?.media?.data && (
                    <div className="flex flex-wrap gap-3 mb-3 bg-gray-2 p-3 rounded-xl shadow-2">
                      {mensaje.attributes?.media?.data?.map((imagen) => (
                        <div key={imagen.id} className={`flex-none`}>
                          <a
                            onClick={() => handleModalOpen(imagen.id)}
                            className="cursor-pointer"
                          >
                            <img
                              src={`${ENV.SERVER_HOST}${imagen.attributes.url}`}
                              alt="Imagen adjunta"
                              className="w-26 h-26 object-cover rounded-md"
                            />
                          </a>
                          <MultiModal
                            isOpen={modalOpen === imagen.id}
                            close={handleModalClose}
                            width="w-auto max-w-[90vw]"
                            height="h-auto max-h-[90vh]"
                          >
                            <img
                              src={`${ENV.SERVER_HOST}${imagen.attributes.url}`}
                              alt="Imagen adjunta"
                              className="rounded-lg max-h-[90vh]"
                            />
                          </MultiModal>
                        </div>
                      ))}
                    </div>
                  )}
                  {mensaje.attributes.motivo ? (
                    <Alert
                      date={fecha.toLocaleString("es-Es")}
                      type={mensaje.attributes.motivo}
                      title={
                        mensaje.attributes.motivo
                          ? motivo[mensaje.attributes.motivo]
                          : "Sin motivo"
                      }
                      message={mensaje.attributes.comentario}
                      nombre={`${mensaje.attributes.autor.data.attributes.firstname} ${mensaje.attributes.autor.data.attributes.lastname}`}
                      departamento={`Para ${mensaje.attributes.departamento}`}
                    />
                  ) : (
                    <>
                      <div className="flex justify-between mt-5">
                        <span className="text-sm font-light text-meta-4 flex gap-3 items-center">
                          {mensaje.attributes.autor.data.attributes.firstname}{" "}
                          {mensaje.attributes.autor.data.attributes.lastname}
                          <div className="bg-meta-5 rounded-full px-2 py-1 text-white">
                            Notificación para {mensaje.attributes.departamento}
                          </div>
                        </span>
                        <span className="text-sm">
                          {fecha.toLocaleString("es-Es")}
                        </span>
                      </div>
                      <p className="text-md font-medium mt-2">
                        {mensaje.attributes.comentario}
                      </p>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

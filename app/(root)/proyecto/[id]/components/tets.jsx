import { useState } from "react";
import { ENV } from "@/utils";
// import { MultiModal } from "@/components/common/MultiModal";

const motivo = {
  retroceder: "Devuelto al departamento anterior",
  incidencia: "Incidencia en proyecto",
  "en pausa": "Proyecto pausado",
};

export const Mensaje = ({ proyecto, Alert, user }) => {
  const [modalOpen, setModalOpen] = useState(null);

  const handleModalOpen = (id) => {
    setModalOpen(id);
  };

  const handleModalClose = () => {
    setModalOpen(null);
  };
  return (
    <>
      {proyecto.attributes.mensajes.data.map((mensaje) => {
        const fecha = mensaje.attributes?.publishedAt
          ? new Date(mensaje.attributes.publishedAt)
          : new Date();
        return (
          <div key={mensaje.id} className="mb-10">
            {mensaje.attributes?.media?.data && (
              <div
                className={`flex flex-wrap gap-3 mb-3 p-3 ${
                  user?.username ===
                  mensaje?.attributes?.autor.data?.attributes.username
                    ? "justify-end"
                    : "justify-start"
                }`}
              >
                {mensaje?.attributes?.media?.data?.map((imagen) => (
                  <div
                    key={imagen.id}
                    className={`rounded-xl bg-gray-2 shadow-2`}
                  >
                    <a
                      onClick={() => handleModalOpen(imagen.id)}
                      className="cursor-pointer"
                      href={`${ENV.SERVER_HOST}${imagen.attributes.url}`}
                      target="_blank"
                    >
                      <img
                        src={`${ENV.SERVER_HOST}${imagen.attributes.url}`}
                        alt="Imagen adjunta"
                        className="w-26 h-26 object-cover rounded-md"
                        target="_blank"
                      />
                    </a>
                    {/* <MultiModal
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
                    </MultiModal> */}
                  </div>
                ))}
              </div>
            )}
            {mensaje.attributes.motivo ? (
              <Alert
                date={fecha.toLocaleString("es-Es")}
                type={mensaje.attributes.motivo}
                title={motivo[mensaje.attributes.motivo] || "Sin motivo"}
                message={mensaje.attributes.comentario}
                nombre={
                  mensaje.attributes.autor?.data?.attributes?.firstname
                    ? `${mensaje.attributes?.autor?.data?.attributes.firstname} ${mensaje.attributes.autor.data.attributes.lastname}`
                    : "Yo"
                }
                departamento={`De ${mensaje?.attributes?.departamento}`}
              />
            ) : (
              <>
                {user?.username ===
                mensaje.attributes.autor?.data?.attributes.username ? (
                  <div className="ml-auto max-w-125">
                    {mensaje.attributes.comentario !== "" && (
                      <>
                        <div className="mb-2.5 rounded-2xl rounded-tl-none bg-gray py-3 px-5 dark:bg-boxdark-2">
                          <p>{mensaje.attributes.comentario}</p>
                        </div>
                        <p className="text-xs">
                          {fecha.toLocaleString("es-Es")}
                        </p>
                      </>
                    )}
                  </div>
                ) : (
                  <div className="max-w-125">
                    <p className="mb-2.5 text-sm font-medium">
                      {mensaje.attributes?.autor?.data?.attributes.firstname}{" "}
                      {mensaje.attributes?.autor?.data?.attributes.lastname}
                    </p>
                    {mensaje.attributes.comentario !== "" && (
                      <>
                        <div className="mb-2.5 rounded-2xl rounded-tl-none bg-gray py-3 px-5 dark:bg-boxdark-2">
                          <p>{mensaje.attributes.comentario}</p>
                        </div>
                        <p className="text-xs">
                          {fecha.toLocaleString("es-Es")}
                        </p>
                      </>
                    )}
                  </div>
                )}
              </>
            )}
          </div>
        );
      })}
    </>
  );
};

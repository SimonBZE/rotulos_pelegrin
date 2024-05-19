import { MultiModal } from "@/components/common/MultiModal";
import { useProjectContext } from "@/context/ProjectContext";
import { ENV } from "@/utils";
import { useEffect, useRef, useState } from "react";
import Alert from "@/components/common/Alerts";
import { useAuth } from "@/context/AuthContext";
import { Comments } from "@/api";
import useSubirImagenes from "@/hooks/useSubirImagenes";
import { FaRegPaperPlane, FaPaperclip } from "react-icons/fa";

const motivo = {
  retroceder: "Devuelto al departamento anterior",
  incidencia: "Incidencia en proyecto",
  "en pausa": "Proyecto pausado",
};

const commentsCtrl = new Comments();

const initialValues = {
  mensaje: "",
  imagenes: [],
};

export const Mensajes = () => {
  const { proyecto, setProyecto } = useProjectContext();
  const [modalOpen, setModalOpen] = useState(null);
  const [form, setForm] = useState(initialValues);
  const [validForm, setValidForm] = useState(false);
  const fileInputRef = useRef(null);
  const { user } = useAuth();

  const { images, setImages, handleFileChange, handleImageRemove, loading } =
    useSubirImagenes();

  const mensajesRef = useRef(null);

  // Efecto para ajustar la posición de desplazamiento
  useEffect(() => {
    if (mensajesRef.current) {
      const { scrollHeight, clientHeight } = mensajesRef.current;
      mensajesRef.current.scrollTop = scrollHeight - clientHeight;
    }
  }, [proyecto.attributes.mensajes]);

  const handleModalOpen = (id) => {
    setModalOpen(id);
  };

  const handleModalClose = () => {
    setModalOpen(null);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Previene la acción por defecto
      e.stopPropagation(); // Detiene la propagación del evento
    }
  };

  const updateForm = (e) => {
    const newMessage = e.target.value;
    setForm({ ...form, mensaje: newMessage });
    setValidForm(newMessage.trim() !== "");
  };

  const sendMessage = (e) => {
    e.preventDefault();

    if (!form.mensaje.trim()) {
      return;
    }

    const media = images.imageInput?.map((imagen) => ({
      id: imagen.id,
      attributes: {
        url: imagen.url,
      },
    }));

    const data = {
      comentario: form.mensaje,
      media: form.imagenes,
      presupuesto: proyecto.id,
      autor: user.id,
      departamento: proyecto.attributes.departamento,
      media,
    };

    console.log(media);

    commentsCtrl.createComment(data);
    setImages({});

    setForm(initialValues);

    setProyecto((prevProyecto) => ({
      ...prevProyecto,
      attributes: {
        ...prevProyecto.attributes,
        mensajes: {
          ...prevProyecto.attributes.mensajes,
          data: [
            ...prevProyecto.attributes.mensajes.data,
            {
              attributes: {
                comentario: form.mensaje,
                autor: user.id,
                presupuesto: proyecto.id,
                autor: {
                  data: {
                    attributes: {
                      username: user.username,
                      firstname: user.firstname,
                      lastname: user.lastname,
                    },
                  },
                },
                media: { data: media },
              },
            },
          ],
        },
      },
    }));
  };
  return (
    <div>
      <div
        className="border-b border-stroke pt-5 px-5 max-h-[500px] bg-white rounded-xl mt-5 overflow-hidden overflow-y-scroll"
        ref={mensajesRef}
      >
        <div>
          <p className="labels">Actualizaciones de estado</p>
        </div>
        <div className="">
          <div className="w-full p-4">
            {proyecto.attributes.mensajes.data.map((mensaje, index) => {
              const fecha = mensaje.attributes?.publishedAt
                ? new Date(mensaje.attributes.publishedAt)
                : new Date();
              return (
                <div
                  key={mensaje.id ? mensaje.id : index + 500}
                  className="mb-10"
                >
                  {mensaje.attributes.media?.data && (
                    <div
                      className={`flex flex-wrap gap-3 mb-3 p-3 ${
                        user?.username ===
                        mensaje.attributes.autor.data?.attributes.username
                          ? "justify-end"
                          : "justify-start"
                      }`}
                    >
                      {mensaje.attributes.media?.data?.map((imagen) => (
                        <div
                          key={imagen.id}
                          className={`rounded-xl bg-gray-2 shadow-2`}
                        >
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
                      nombre={
                        mensaje.attributes.autor.data?.attributes?.firstname
                          ? `${mensaje.attributes.autor.data?.attributes.firstname} ${mensaje.attributes.autor.data.attributes.lastname}`
                          : "Yo"
                      }
                      departamento={
                        mensaje.attributes.departamento &&
                        `Para ${mensaje.attributes.departamento}`
                      }
                    />
                  ) : (
                    <>
                      {user?.username ===
                      mensaje.attributes.autor.data?.attributes.username ? (
                        <div className="ml-auto max-w-125">
                          <div className="mb-2.5 rounded-2xl rounded-br-none bg-primary py-3 px-5">
                            <p className="text-white">
                              {mensaje.attributes.comentario}
                            </p>
                          </div>
                          <p className="text-right text-xs">
                            {fecha.toLocaleString("es-Es")}
                          </p>
                        </div>
                      ) : (
                        <div className="max-w-125">
                          <p className="mb-2.5 text-sm font-medium">
                            {
                              mensaje.attributes.autor.data?.attributes
                                .firstname
                            }{" "}
                            {mensaje.attributes.autor.data?.attributes.lastname}
                          </p>
                          <div className="mb-2.5 rounded-2xl rounded-tl-none bg-gray py-3 px-5 dark:bg-boxdark-2">
                            <p>{mensaje.attributes.comentario}</p>
                          </div>
                          <p className="text-xs">
                            {fecha.toLocaleString("es-Es")}
                          </p>
                        </div>
                      )}
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="bottom-0 border-t border-stroke bg-white py-5 px-6 dark:border-strokedark dark:bg-boxdark relative">
        {loading && <p>Cargando imágenes...</p>}
        <div className="flex flex-wrap gap-3 mb-3 bg-gray-2 p-3 rounded-xl shadow-2 absolute bottom-[70px] z-90">
          {images.imageInput &&
            images.imageInput.map((image, index) => (
              <div key={index} className={`flex-none relative`}>
                <img
                  src={`http://127.0.0.1:1337${image.url}`}
                  alt={`Imagen cargada ${index}`}
                  className="w-26 h-26 object-cover rounded-md"
                />
                <button
                  type="button"
                  onClick={() => handleImageRemove("imageInput", image.id)}
                  className="rounded-full bg-black text-white w-5 h-5 flex items-center justify-center absolute -top-1 -right-1"
                >
                  X
                </button>
              </div>
            ))}
        </div>
        <form
          className="flex items-center justify-between space-x-4.5"
          onSubmit={sendMessage}
        >
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Mensaje"
              className="h-13 w-full rounded-md border border-stroke bg-gray pl-5 pr-19 text-black placeholder-body outline-none focus:border-primary dark:border-strokedark dark:bg-boxdark-2 dark:text-white"
              value={form.mensaje}
              onChange={updateForm}
              onKeyDown={handleKeyDown}
            />
            <div
              className="absolute right-5 top-1/2 inline-flex -translate-y-1/2 items-center justify-end space-x-4"
              onClick={() => fileInputRef.current.click()}
            >
              <input
                ref={fileInputRef}
                type="file"
                className="hidden"
                multiple
                onChange={(e) => {
                  e.stopPropagation();
                  handleFileChange(e, "imageInput");
                }}
                accept="image/png, image/jpeg, image/jpg, image/gif" // Acepta solo imágenes PNG, JPEG, JPG y GIF
              />
              <a className="hover:text-primary">
                <FaPaperclip />
              </a>
            </div>
          </div>

          <button
            type="submit"
            className={`flex h-13 w-full max-w-13 items-center justify-center rounded-md ${
              validForm
                ? "bg-primary text-white hover:bg-opacity-90"
                : "bg-gray text-graydark cursor-not-allowed"
            }`}
            disabled={!validForm}
          >
            <FaRegPaperPlane />
          </button>
        </form>
      </div>
    </div>
  );
};

import { MultiModal } from "@/components/common/MultiModal";
import { useProjectContext } from "@/context/ProjectContext";
import { ENV } from "@/utils";
import { useEffect, useRef, useState } from "react";
import Alert from "@/components/common/Alerts";
import { useAuth } from "@/context/AuthContext";
import { Comments } from "@/api";
import useSubirImagenes from "@/hooks/useSubirImagenes";

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
      }
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
                <div key={mensaje.id ? mensaje.id : index + 500} className="mb-10">
                  {mensaje.attributes.media?.data && (
                    <div
                      className={`flex flex-wrap gap-3 mb-3 p-3 ${
                        user.username ===
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
                      
                      departamento={mensaje.attributes.departamento && `Para ${mensaje.attributes.departamento}`}
                    />
                  ) : (
                    <>
                      {user.username ===
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
                            {mensaje.attributes.autor.data?.attributes.firstname}{" "}
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
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  className="fill-current"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M11.835 1.79102C11.2378 1.79102 10.6651 2.02824 10.2428 2.45051L3.3503 9.34302C2.64657 10.0467 2.25122 11.0012 2.25122 11.9964C2.25122 12.9917 2.64657 13.9461 3.3503 14.6499C4.05403 15.3536 5.0085 15.7489 6.00372 15.7489C6.99895 15.7489 7.95341 15.3536 8.65714 14.6499L15.5496 7.75736C15.8425 7.46446 16.3174 7.46446 16.6103 7.75736C16.9032 8.05025 16.9032 8.52512 16.6103 8.81802L9.7178 15.7105C8.73277 16.6956 7.39677 17.2489 6.00372 17.2489C4.61067 17.2489 3.27468 16.6956 2.28964 15.7105C1.30461 14.7255 0.751221 13.3895 0.751221 11.9964C0.751221 10.6034 1.30461 9.26739 2.28964 8.28236L9.18214 1.38985C9.88572 0.686279 10.84 0.291016 11.835 0.291016C12.83 0.291016 13.7842 0.686279 14.4878 1.38985C15.1914 2.09343 15.5866 3.04768 15.5866 4.04268C15.5866 5.03769 15.1914 5.99194 14.4878 6.69552L7.5878 13.588C7.16569 14.0101 6.59318 14.2473 5.99622 14.2473C5.39926 14.2473 4.82676 14.0101 4.40464 13.588C3.98253 13.1659 3.74539 12.5934 3.74539 11.9964C3.74539 11.3995 3.98253 10.827 4.40464 10.4049L10.7725 4.04454C11.0655 3.75182 11.5404 3.7521 11.8331 4.04517C12.1258 4.33823 12.1256 4.81311 11.8325 5.10583L5.4653 11.4655C5.32469 11.6063 5.24539 11.7974 5.24539 11.9964C5.24539 12.1956 5.32449 12.3865 5.4653 12.5274C5.60611 12.6682 5.79709 12.7473 5.99622 12.7473C6.19535 12.7473 6.38633 12.6682 6.52714 12.5274L13.4271 5.63486C13.8492 5.21261 14.0866 4.63973 14.0866 4.04268C14.0866 3.4455 13.8494 2.87278 13.4271 2.45051C13.0049 2.02824 12.4321 1.79102 11.835 1.79102Z"
                  />
                </svg>
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
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M22 2L11 13"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M22 2L15 22L11 13L2 9L22 2Z"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
};

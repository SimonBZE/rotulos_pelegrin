import { useProjectContext } from "@/context/ProjectContext";
import { useAuth } from "@/context/AuthContext";
import { useEffect, useRef, useState } from "react";
import { Comments } from "@/api";
import { FaRegPaperPlane, FaPaperclip } from "react-icons/fa";
import useSubirImagenes from "@/hooks/useSubirImagenes";

import Alert from "@/components/common/Alerts";
import socket from "@/utils/socket";
import { ENV } from "@/utils";
import { Mensaje } from "./Mensaje";
import { CircularProgress } from "@nextui-org/react";

const commentsCtrl = new Comments();

const initialValues = {
  mensaje: "",
  imagenes: [],
};

export const Mensajes = ({ chatOpen }) => {
  const { proyecto, setProyecto } = useProjectContext();
  const [form, setForm] = useState(initialValues);
  const [validForm, setValidForm] = useState(false);
  const fileInputRef = useRef(null);
  const { user } = useAuth();
  const { images, setImages, handleFileChange, handleImageRemove, loading } =
    useSubirImagenes();
  const mensajesRef = useRef(null);

  // Ajustar el scroll al final de la lista de mensajes
  useEffect(() => {
    if (mensajesRef.current) {
      const { scrollHeight, clientHeight } = mensajesRef.current;
      mensajesRef.current.scrollTop = scrollHeight - clientHeight;
    }
  }, [proyecto.attributes.mensajes, chatOpen]);

  // Manejo de nuevos mensajes a través de sockets
  useEffect(() => {
    const handleNewMessage = (message) => {
      setProyecto((prevProyecto) => ({
        ...prevProyecto,
        attributes: {
          ...prevProyecto.attributes,
          mensajes: {
            ...prevProyecto.attributes.mensajes,
            data: [...prevProyecto.attributes.mensajes.data, message],
          },
        },
      }));
    };

    socket.on("NEW_MESSAGE", handleNewMessage);

    return () => {
      socket.off("NEW_MESSAGE", handleNewMessage);
    };
  }, [setProyecto]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (validForm) {
        sendMessage(e);
      }
    }
  };

  const updateForm = (e) => {
    const newMessage = e.target.value;
    setForm({ ...form, mensaje: newMessage });
    setValidForm(newMessage.trim() !== "" || images.imageInput?.length > 0);
  };

  const sendMessage = async (e) => {
    e.preventDefault();

    if (!form.mensaje.trim() && images.imageInput?.length === 0) return;

    const media = images.imageInput?.map((imagen) => ({
      id: imagen.id,
      attributes: { url: imagen.url },
    }));

    const data = {
      comentario: form.mensaje,
      media: form.imagenes,
      presupuesto: proyecto.id,
      autor: user.id,
      departamento: proyecto.attributes.departamento,
      media,
    };

    try {
      const response = await commentsCtrl.createComment(data);

      if (response.error) {
        console.error("Error creating message:", response.error);
        return;
      }

      // Agregar el autor completo al mensaje antes de emitirlo por socket
      const messageWithAuthor = {
        ...response.data,
        attributes: {
          ...response.data.attributes,
          autor: {
            data: {
              attributes: {
                username: user.username,
                firstname: user.firstname,
                lastname: user.lastname,
              },
            },
          },
        },
      };

      socket.emit("NEW_MESSAGE", messageWithAuthor);

      setForm(initialValues);
      setImages({});
      setValidForm(false);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div className="flex flex-col h-full border border-stroke bg-white rounded-xl mt-5 overflow-hidden">
      <div className="flex-1 overflow-y-scroll p-5" ref={mensajesRef}>
        <div className="">
          <div className="w-full p-4">
            <Mensaje proyecto={proyecto} Alert={Alert} user={user} />
          </div>
        </div>
      </div>
      <div className="py-3 px-3 border-t border-stroke relative">
        {loading && <CircularProgress aria-label="Loading..." />}
        {images.imageInput && (
          <div className="flex flex-wrap gap-3 mb-3 bg-gray-2 p-3 rounded-xl shadow-2 absolute bottom-[70px] z-90">
            {images.imageInput.map((image, index) => (
              <div key={index} className={`flex-none relative`}>
                <img
                  src={`${ENV.SERVER_HOST}${image.url}`}
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
        )}

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
                  // setValidForm(
                  //   e.target.files?.length > 0 || form.mensaje.trim() !== ""
                  // ); // Actualizar el estado de validForm al agregar imágenes
                  
                }}
                accept="image/png, image/jpeg, image/jpg, image/gif"
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

export default Mensajes;

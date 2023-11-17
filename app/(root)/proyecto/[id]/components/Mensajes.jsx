import { useProjectContext } from "@/context/ProjectContext";
import { ENV } from "@/utils";

export const Mensajes = () => {
  const { proyecto } = useProjectContext();
  console.log(proyecto.attributes.mensajes);
  return (
    <div>
      <div className="rounded-xl mt-5 p-5 border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div>
          <p className="labels">Actualizaciones de estado</p>
        </div>
        <div className="md:flex">
          <div className="w-full p-4">
            {proyecto.attributes.mensajes.data.map((mensaje) => (
              <div key={mensaje.id} className="mb-10">
                <div className="flex mt-4">
                  {mensaje.attributes?.media?.data?.map((imagen) => (
                    <div key={imagen.id}>
                      <img
                        src={`${ENV.SERVER_HOST}${imagen.attributes.url}`}
                        alt="Imagen adjunta"
                        className="rounded-lg w-full h-48 object-cover"
                      />
                    </div>
                  ))}
                </div>
                <div className="flex justify-between mt-5">
                  <span className="text-sm font-light text-meta-4">
                    {mensaje.attributes.autor.data.attributes.firstname}{" "}
                    {mensaje.attributes.autor.data.attributes.lastname}
                  </span>
                  <span className="text-sm font-light">
                    {mensaje.attributes.publishedAt}
                  </span>
                </div>
                <p className="text-md font-medium mt-2">
                  {mensaje.attributes.comentario}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

import { useState } from "react";

export const ModalRetroceder = ({ close, retroceder }) => {
    const [form, setForm] = useState("")

    const handleChange = (e) => {
        setForm(e.target.value)
    }


  const duplicarProyecto = async () => {
    await retroceder(form);
    close()
  };

  return (
    <>
      {/* Aquí insertas el contenido de tu modal */}
      <h2 className="text-2xl font-bold mb-2 text-black">
        ¿Enviar al departamento anterior?
      </h2>
      <p className="mb-4">
        Especifica la razón por la que devuelves el proyecto al departamento anterior, puedes adjuntar fotos para aclarar más el error
      </p>
      <div className="mb-5">
        
        <textarea
          className="formulario mt-2"
          id="name"
          value={form}
          onChange={handleChange}
        />
      </div>

      <div className="flex items-center justify-between">
        <button
          onClick={close}
          className="bg-black text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="button"
        >
          Cancelar
        </button>
        <button
          onClick={duplicarProyecto}
          className="bg-success text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="button"
        >
          Enviar
        </button>
      </div>
    </>
  );
};

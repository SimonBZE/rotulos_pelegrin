import { useState } from "react";

export const ModalDuplicar = ({ close, duplicar }) => {
    const [form, setForm] = useState("")

    const handleChange = (e) => {
        setForm(e.target.value)
    }


  const duplicarProyecto = async () => {
    await duplicar(form);
    close()
  };

  return (
    <>
      {/* Aquí insertas el contenido de tu modal */}
      <h2 className="text-2xl font-bold mb-2 text-black">
        ¿Quieres duplicar este proyecto?
      </h2>
      <p className="mb-4">
        Escribe el nombre con el cual vas a identificar esta copia
      </p>
      <div className="mb-5">
        <label className="labels" htmlFor="name">
          Nombre del proyecto
        </label>
        <input
          className="formulario mt-2"
          id="name"
          type="text"
          value={form}
          onChange={handleChange}
        />
      </div>

      <div className="flex items-center justify-between">
        <button
          onClick={duplicarProyecto}
          className="bg-primary text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="button"
        >
          Duplicar
        </button>
      </div>
    </>
  );
};

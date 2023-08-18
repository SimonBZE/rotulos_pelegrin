import Image from "next/image";

const multimedia = [
  {
    nombre: "Vídeos",
    imagen: "/assets/Videos.svg",
    numero: "2 archivos",
    color: "#f0efff",
  },
  {
    nombre: "Fotos",
    imagen: "/assets/fotos.svg",
    numero: "1 archivo",
    color: "#eaf6ff",
  },
  {
    nombre: "Audios",
    imagen: "/assets/Audios.svg",
    numero: "2 archivo",
    color: "#ffefef",
  },
];

export const Sumaries = () => {
  return (
    <div className="rounded-xl mt-5 py-5 px-5 md:p-10 border max-w-screen-md m-auto border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <h3 className="labels text-lg">Contenido</h3>
      <div className="flex justify-center items-center gap-3 mt-5">
        {multimedia.map(({ nombre, imagen, numero, color }) => (
          <div key={nombre} className="text-center">
            <div
              className={`p-7 rounded-3xl flex justify-center`}
              style={{background: color}}
            >
              <Image
                src={imagen}
                alt="presupuestos"
                width={100}
                height={100}
                className="w-9 h-9 sm:w-10 sm:h-10"
              />
            </div>
            <p className=" text-black mt-2 text-base font-bold">{nombre}</p>
            <p className="text-xs">{numero}</p>
          </div>
        ))}
      </div>

      <table className="table-fixed w-full mt-5">
        <tbody>
          <tr>
            <td className="labels">Diseño</td>
            <td className="text-right labels">150 €</td>
          </tr>
          <tr>
            <td className="labels">Impresión</td>
            <td className="text-right labels">340 €</td>
          </tr>
          <tr>
            <td className="labels">Corte</td>
            <td className="text-right labels">140 €</td>
          </tr>
          <tr>
            <td className="labels">Pintura</td>
            <td className="text-right labels">340 €</td>
          </tr>
          <tr>
            <td className="labels">Montaje</td>
            <td className="text-right labels">400 €</td>
          </tr>
        </tbody>
      </table>
      <div className="text-right mt-6">
        <p className="labels text-base">TOTAL: 2300 €</p>
      </div>
    </div>
  );
};

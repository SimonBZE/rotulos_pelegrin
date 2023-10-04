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

export const Sumaries = ({ total, formik }) => {
  return (
    <div className="rounded-xl mt-5 py-5 px-5 md:p-10 border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <h3 className="labels text-lg">Contenido</h3>
      <div className="flex justify-center md:justify-start items-center gap-3 mt-5">
        {multimedia.map(({ nombre, imagen, numero, color }) => (
          <div key={nombre} className="text-center">
            <div
              className={`p-7 rounded-3xl flex justify-center`}
              style={{ background: color }}
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
          {total.diseno > 0 && (
            <tr>
              <td className="labels">Diseño</td>
              <td className="text-right labels">{total.diseno} €</td>
            </tr>
          )}

          {total.impresion > 0 && (
            <tr>
              <td className="labels">Impresión</td>
              <td className="text-right labels">{total.impresion} €</td>
            </tr>
          )}

          {total.corte > 0 && (
            <tr>
              <td className="labels">Corte</td>
              <td className="text-right labels">{total.corte} €</td>
            </tr>
          )}

          {total.pintura > 0 && (
            <tr>
              <td className="labels">Pintura</td>
              <td className="text-right labels">{total.pintura} €</td>
            </tr>
          )}

          {total.montaje > 0 && (
            <tr>
              <td className="labels">Montaje</td>
              <td className="text-right labels">{total.montaje} €</td>
            </tr>
          )}

          {formik.values.puesta_en_marcha && <tr>
              <td className="labels">Puesta en marcha</td>
              <td className="text-right labels">50 €</td>
            </tr>}
        </tbody>
      </table>
      <div className="text-right mt-6">
        <p className="labels text-base">TOTAL: {total.totalGeneral + (formik.values.puesta_en_marcha ? 50 : 0)} €</p>
      </div>
    </div>
  );
};

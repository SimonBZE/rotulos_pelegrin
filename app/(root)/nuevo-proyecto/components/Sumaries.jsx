import Image from "next/image";
import { useEffect, useState } from "react";

const multimedia = [
  {
    nombre: "Vídeos",
    field:'videos',
    imagen: "/assets/Videos.svg",
    numero: "2 archivos",
    color: "#f0efff",
  },
  {
    nombre: "Fotos",
    field:'fotos',
    imagen: "/assets/fotos.svg",
    numero: "1 archivo",
    color: "#eaf6ff",
  },
  {
    nombre: "Audios",
    field:'audios',
    imagen: "/assets/Audios.svg",
    numero: "2 archivo",
    color: "#ffefef",
  },
];

const componentNames = [
  "diseno",
  "impresion",
  "corte",
  "cerrajeria",
  "pintura",
  "montaje",
];


export const Sumaries = ({ formik, files }) => {

  const [total, setTotal] = useState({
    diseño: 0,
    impresión: 0,
    corte: 0,
    pintura: 0,
    montaje: 0,
    cerrajeria: 0,
    total: 0,
  });

  useEffect(() => {
    let totalDesign = formik.values.diseno.reduce(
      (acc, curr) => acc + (curr.precio || 0),
      0
    );
    let totalPrint = formik.values.impresion.reduce(
      (acc, curr) => acc + (curr.precio || 0),
      0
    );
    let totalCut = formik.values.corte.reduce(
      (acc, curr) => acc + (curr.precio || 0),
      0
    );

    let totalLockSmith = formik.values.cerrajeria.reduce(
      (acc, curr) => acc + (curr.precio || 0), 0
    )

    let totalPaint = formik.values.pintura.reduce(
      (acc, curr) => acc + (curr.precio || 0), 0
    )

    let totalMounting = formik.values.montaje.reduce(
      (acc, curr) => acc + (curr.precio || 0), 0
    )



    // Suma los totales de cada componente para obtener el total general
    let totalSum = totalDesign + totalPrint + totalCut + totalLockSmith + totalPaint + totalMounting;

    

    // Actualiza el estado con el total
    setTotal({
      ...total,
      diseño: totalDesign,
      impresión: totalPrint,
      corte: totalCut,
      cerrajeria: totalLockSmith,
      pintura: totalPaint,
      montaje: totalMounting,
      total: totalSum,
    });

    
    
  }, [formik.values]);

  useEffect( () => {
    formik.values.total = total.total
  }, [total] )

  
  return (
    <div className="rounded-xl mt-5 py-5 px-5 md:p-10 border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <h3 className="labels text-lg">Contenido</h3>
      <div className="flex justify-center md:justify-start items-center gap-3 mt-5">
        {multimedia.map(({ nombre, imagen, numero, color, field }) => (
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
            <p className="text-xs">{files[field]?.length > 0 ?  files[field]?.length : 0}</p>
          </div>
        ))}
      </div>

      <table className="table-fixed w-full mt-5">
        <tbody>
        {Object.entries(total)
      .filter(([componentName, price]) => price > 0 && componentName!=="total")
      .map(([componentName, price]) => (
        <tr key={componentName}>
          <td className="labels capitalize">{componentName}</td>
          <td className="text-right labels">{price} €</td>
        </tr>
      ))}

          

          {formik.values.puesta_en_marcha && <tr>
              <td className="labels">Puesta en marcha</td>
              <td className="text-right labels">50 €</td>
            </tr>}
        </tbody>
      </table>
      <div className="text-right mt-6">
        <p className="labels text-base">TOTAL: {total.total + (formik.values.puesta_en_marcha ? 50 : 0)} €</p>
      </div>
    </div>
  );
};

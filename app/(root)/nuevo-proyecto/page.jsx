import Image from "next/image";

export default function NuevoProyecto() {

  const servicios=[
    {
      nombre: 'Diseño',
      color: '#6E5FFF',
      imagen: './assets/Diseno.svg'
    },
    {
      nombre: 'Impresión',
      color: '#2FA7FF',
      imagen: './assets/Impresion.svg'
    },
    {
      nombre: 'Corte',
      color: '#FF5F5F',
      imagen: './assets/Corte.svg'
    },
    {
      nombre: 'Cerrajería',
      color: '#00D7E2',
      imagen: './assets/Cerrajeria.svg'
    },
    {
      nombre: 'Pintura',
      color: '#8AC111',
      imagen: './assets/Pintura.svg'
    }
,
    {
      nombre: 'Montaje',
      color: '#FFA008',
      imagen: './assets/Montaje.svg'
    }
  ]

  return (
    <>
      <div className="flex justify-between mt-5 items-end px-5">
        <div>
          <h2 className="text-title-md font-semibold text-black dark:text-white">
            PRESUPUESTO
          </h2>
          <p className="text-primary font-bold">PRDCM00003</p>
          <p className="font-bold text-base">PLACA METACRILATO</p>
          <p className="text-sm">CLIENTE: ALEMAN CARS</p>
          <p className="text-sm">CONTACTO: 975 65 65 54</p>
        </div>

        <div>
          <div className="flex flex-col items-end justify-end">
            <label htmlFor="aprovacion" className="ml-2 text-base font-bold text-black">
              Aprovación
            </label>
            <input
              id="aprovacion"
              type="checkbox"
              className="w-7 h-7 accent-primary"
            />

            <label
              htmlFor="aprovacion"
              className="ml-2 text-base font-bold text-black mt-5"
            >
              Prioridad
            </label>
            <select
              className="bg-white relative w-full appearance-none rounded border border-stroke bg-transparent py-2 px-6 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input"
              name=""
              id=""
            >
              <option value="baja">Baja</option>
              <option value="media">Media</option>
              <option value="alta">Alta</option>
            </select>
          </div>
        </div>
      </div>
      <div className="rounded-xl mt-5 p-5 border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        {/* Date */}
        <div className="flex gap-2 items-center">
          <label className="font-bold text-black" htmlFor="fecha">
            Fecha
          </label>
          <input
            id="fecha"
            className="custom-input-date custom-input-date-1 rounded border-[1.5px] border-stroke bg-transparent py-2 px-5 font-medium outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
            type="date"
          />
        </div>

        {/* Descripcion */}
        <div className="mt-5">
          <label className="font-bold text-black" htmlFor="descripcion">
            Descripcion
          </label>
          <textarea
            rows={3}
            placeholder="Describe el proyecto"
            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:bg-form-input"
          ></textarea>
        </div>

        {/* Servicios */}
        <div className='grid grid-cols-3 gap-5 mt-5'>
        {servicios.map( ({nombre, color, imagen}) =>(
          <div className='text-center max-w-35'>
            <div className="p-7 rounded-3xl flex flex-col items-center justify-center" style={{backgroundColor: color+"20"}}>
              <Image src={imagen} alt="presupuestos" width={100} height={100} className='w-10 h-10 sm:w-10 sm:h-10' />
              <p className=' text-black mt-2 text-sm font-bold'>{nombre}</p>
            </div>            
          </div>
        ) )}
        </div>

          {/* Puesta en marcha */}
          <div className="flex gap-2 mt-5 justify-between">
            <div className="flex items-center gap-3">
              <label htmlFor="en_marcha" className="font-bold text-black">Puesta en marcha</label>
              <input
              id="en_marcha"
              type="checkbox"
              className="w-5 h-5 accent-primary"
            />
              
            </div>
            <p className="font-bold text-black dark:text-whiten">50€</p>
          </div>

      </div>
    </>
  );
}

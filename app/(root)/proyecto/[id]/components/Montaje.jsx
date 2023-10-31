import { GridImages } from "./GridImages";
import { ProjectHeader } from "./ProjectHeader";

export const Montaje = ({data}) => {
  console.log(data);
  return (
    <div className="grid lg:grid-cols-2 gap-5">
      {data.map((item) => (
        <div key={item.id} className="flex flex-col gap-5 shadow-3">
          <ProjectHeader item={item} />
          
          <div className="flex flex-col justify-between px-3">
            <div className="flex  gap-1">
              <p className="labels"> Alquiler de maquinaria</p>
              <p>{item.alquiler_maquinaria} €</p>
            </div>
            <div className="flex gap-1">
              <p className="labels">Desplazamiento: </p>
              <p>{item.desplazamiento} €</p>
            </div>
            <div className="flex gap-1">
              <p className="labels">Tiempo de montaje: </p>
              <p>{item.tiempo_montaje} m</p>
            </div>
          </div>

          {!!item.adicional && (
            <div className="flex px-3">
              <div className="overflow-x-auto  sm:rounded-lg min-w-full">
                <table className="w-full text-sm text-left text-graydark">
                  <thead className="text-xs text-graydark uppercase bg-gray">
                    <tr>
                      <th scope="col" className="px-6 py-3">
                        Nombre
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Precio
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {item.adicional.map((adicional) => (
                      <tr key={adicional.id} className="bg-white">
                        <td className="px-6 py-4">{adicional.nombre}</td>
                        <td className="px-6 py-4">{adicional.precio}€</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          <GridImages item={item} className="px-3" />

          {/* {!!item.imagenes.data && <SliderImages imagenes={item.imagenes} />} */}
        </div>
      ))}
    </div>
  )
}

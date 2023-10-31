import { GridImages } from "./GridImages";
import { ProjectHeader } from "./ProjectHeader";

export const Pintura = ({ data }) => {
  
  return (
    <div className="grid lg:grid-cols-2 gap-5">
      {data.map((item) => (
        <div key={item.id} className="flex flex-col gap-5 shadow-3">
          <ProjectHeader item={item} />
          <div className="flex justify-between px-3">
            <div className="flex gap-1">
              <p className="labels">Nombre: </p>
              <p>{item.nombre}</p>
            </div>
          </div>
          <div className="flex justify-between px-3">
            <div className="flex gap-1">
              <p className="labels">Ancho: </p>
              <p>{item.ancho} m</p>
            </div>
            <div className="flex gap-1">
              <p className="labels">Alto: </p>
              <p>{item.alto} m</p>
            </div>
            <div className="flex gap-1">
              <p className="labels">M Cuadrados: </p>
              <p>{item.metro_cuadrados} m</p>
            </div>
          </div>
          <div className="flex px-3 justify-between">
            <div className="flex gap-1">
              <p className="labels">Material: </p>
              <p>{item.material}</p>
            </div>
            <div className="flex gap-1 items-center">
              <p className="labels ">Lijado: </p>
              {item.lijado ? <div className="w-5 h-5 bg-primary flex items-center justify-center">✔️</div> : <div className="w-5 h-5" style={{border: "solid 1px black"}}></div>}
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
  );
};

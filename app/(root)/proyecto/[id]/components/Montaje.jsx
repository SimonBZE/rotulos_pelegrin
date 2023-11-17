import { GridImages } from "./GridImages";
import { Completar } from "./Completar";
import { ProjectHeader } from "./ProjectHeader";

export const Montaje = ({ data, departamento, departamentoActual }) => {
  
  return (
    <div className="grid lg:grid-cols-2 gap-5">
      {data.map((item) => (
        <div key={item.id} className="flex flex-col gap-5 shadow-3">
          <ProjectHeader item={item} />

          <div className="flex flex-col justify-between px-3">
            <div className="flex  gap-1">
              <p className="labels"> Lugar del montaje</p>
              <p>{item.lugar_montaje}</p>
            </div>
            <div className="flex gap-1 items-center">
              <p className="labels">Montadores: </p>
              <p  className="flex flex-wrap gap-2">{item.montadores.map( montador => <span key={montador.id} className="px-2 py-1 rounded bg-secondary">{montador.montador} </span>)}</p>
            </div>
            <div className="flex  gap-1 mt-2 items-center">
              <p className="labels">Matriculas: </p>
              <p className="flex gap-2 flex-wrap ">{item.matricula.map( item => <span key={item.id} className="px-2 py-1 rounded bg-secondary">{item.matricula} </span>)}</p>
            </div>
          </div>

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

          {!!item.adicional?.[0]?.id && (
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
          {/* {departamento === departamentoActual && <Progreso currentDep={departamento} departamento={item} /> } */}
          
          {departamento === departamentoActual && <Completar currentDep={departamento}  id={item.id} /> }
        </div>
      ))}
    </div>
  );
};

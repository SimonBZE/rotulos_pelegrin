import { GridImages } from "./GridImages"
import { Progreso } from "./Progreso"
import { ProjectHeader } from "./ProjectHeader"


export const Corte = ({data, departamento, departamentoActual}) => {
  
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
          <div className="flex items-center gap-1">
            <p className="text-lg font-extrabold">{item.cantidad}</p>
            <p className="labels">Und. </p>
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
        </div>
        <div className="flex px-3">
          <div className="flex gap-1">
            <p className="labels">Material: </p>
            <p>{item.material}</p>
          </div>
        </div>

        <GridImages item={item} className="px-3" />
        {departamento === departamentoActual && <Progreso departamento={item} /> }
        {/* {!!item.imagenes.data && <SliderImages imagenes={item.imagenes} />} */}
      </div>
    ))}
  </div>
  )
}

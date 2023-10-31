import { GridImages } from "./GridImages";
import { ProjectHeader } from "./ProjectHeader";

export const Impresion = ({ data }) => {
  
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
          <div className="flex justify-between px-3">
            <div className="flex gap-1">
              <p className="labels">Material: </p>
              <p>{item.material}</p>
            </div>
            <div className="flex gap-1">
              <p className="labels capitalize">Laminación: </p>
              <p className="capitalize">{item.laminacion}</p>
            </div>
          </div>

          <GridImages item={item} className="px-3" />

          {/* {!!item.imagenes.data && <SliderImages imagenes={item.imagenes} />} */}
        </div>
      ))}
    </div>
  );
};

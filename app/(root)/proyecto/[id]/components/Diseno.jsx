import { GridImages } from "./GridImages";
import { ProjectHeader } from "./ProjectHeader";

export const Diseno = ({ data }) => {
  return (
    <div className="grid lg:grid-cols-2 gap-5">
      {data.map((item) => (
        <div key={item.id} className="flex flex-col shadow-3 gap-2">
          <ProjectHeader item={item} />
          <div className="flex justify-between px-5">
            <div className="flex">
              <p className="labels">Horas: </p>
              <p>{item.horas}</p>
            </div>
          </div>
          <GridImages item={item} className="p-5"/>
        </div>
      ))}
    </div>
  );
};

import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/common/Tabs/TabOne";
import { Cerrajeria, Corte, Diseno, Impresion, Montaje, Pintura } from "./";

const departamentoComponentes = {
  diseno: Diseno,
  impresion: Impresion,
  corte: Corte,
  cerrajeria: Cerrajeria,
  pintura: Pintura,
  montaje: Montaje,
};

export const ProjectTabs = ({ departamentosActivos, proyecto }) => {
  // console.log(proyecto.attributes)
  return (
    <div className="mt-5 bg">
      {/* {JSON.stringify(data)} */}
      <Tabs defaultValue={proyecto.attributes.departamento} className="w-full">
        <TabsList>
          {departamentosActivos.map((departamento) => (
            <TabsTrigger
              key={departamento}
              value={departamento}
              className="capitalize"
            >
              {departamento}
            </TabsTrigger>
          ))}
        </TabsList>
        {departamentosActivos.map((departamento, index) => {
          const DepartamentoComponente = departamentoComponentes[departamento];
          return DepartamentoComponente ? (
            <TabsContent key={departamento} value={departamento}>
              <DepartamentoComponente data={proyecto.attributes[departamento]} />
            </TabsContent>
          ) : null; // O manejar el caso de un departamento no definido
        })}
      </Tabs>
    </div>
  );
};

import {CardPresupuesto} from './CardPresupuesto'

export const ListaPresupuesto = ({ proyectos }) => {
    return (
      <div>
        <h2 className="text-xl font-bold mb-4 text-black">Presupuestos</h2>
        {proyectos.map((proyecto) => (
          <CardPresupuesto key={proyecto.id} proyecto={proyecto.attributes} />
        ))}
      </div>
    );
  };

export const ProjectHeader = ({item}) => {
  return (
    <div
      className="flex justify-between py-2 px-5"
      style={{ background: item.completado ? "#008f4c59" : "#eae6ca50"  }}
    >
      <div className="flex">
        <p className="labels">Unidades: </p>
        <p>
          {item.contador}/{item.cantidad}
        </p>
      </div>
      <div className="flex">
        <p className="labels">Estado: </p>
        <p>{item.completado ? " Completado" : " Sin terminar" }</p>
      </div>
    </div>
  );
};

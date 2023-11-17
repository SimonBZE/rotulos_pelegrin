export const ProjectHeader = ({ item }) => {
  return (
    <div
      className="flex justify-between py-2 px-5"
      style={{ background: item.completado ? "#008f4c59" : "#eae6ca50" }}
    >
      <div className="flex gap-2">
        {!!item.cantidad ? (
          <>
            <p className="labels">Und: </p>
            <p>
              {!!item.contador ? item.contador : 0}/{item.cantidad}
            </p>
          </>
        ) : null}
      </div>
      <div className="flex gap-2">
        <p className="labels">Estado: </p>
        <p>{item.completado ? "Completado" : "Incompleto"}</p>
      </div>
    </div>
  );
};

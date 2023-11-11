export const CardPresupuesto = ({ proyecto }) => {
  const fecha = new Date(proyecto.fecha);
  const creacion = new Date(proyecto.publishedAt);
  return (
    <div
      className={`bg-white p-6 shadow-lg rounded-lg mb-4 flex justify-between items-cente`}
      style={{ background: proyecto.prioridad ? "#ff000030" : "#fff" }}
    >
      <div>
        <h3 className="text-lg font-bold">{proyecto.nombre}</h3>
        <p className="text-gray-600">
          <b>Cliente:</b> {proyecto.cliente} <b>Tel:</b> {proyecto.contacto}
        </p>
        <p className="text-gray-500">
          <b>Fecha entrega:</b> {fecha.toLocaleDateString("es-ES")} 🕑{" "}
          {proyecto.hora?.slice(0, 5)}
        </p>
        <p className="text-gray-500">
          <b>Fecha creación:</b> {creacion.toLocaleDateString("es-ES")}
        </p>
      </div>
      <div className="flex flex-col items-end gap-3">
        <span className="text-sm capitalize">{proyecto.estado}</span>
        <div className="flex items-center gap-3">
          <label htmlFor="aprovado" className="labels">
            Aprovado
          </label>
          <input
            id="aprovado"
            type="checkbox"
            className="w-6 h-6 accent-primary"
            name="aprovado"
            checked={proyecto.aprovacion}
            readOnly
          />
        </div>
        <div className="flex items-center gap-3">
          <label htmlFor="prioridad" className="labels">
            Prioridad
          </label>
          <input
            id="prioridad"
            type="checkbox"
            className="w-6 h-6 accent-primary"
            name="prioridad"
            checked={proyecto.prioridad}
            readOnly
          />
        </div>
        <div className="flex items-center gap-3">
          <label htmlFor="total" className="labels">
            total
          </label>
          {proyecto.total}
        </div>
      </div>
    </div>
  );
};

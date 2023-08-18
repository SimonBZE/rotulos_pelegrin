import { CardHeader } from "./CardHeader";

export const Design = ({ index, data, handleChange, handleRemove }) => {
  return (
    <div className="rounded-md bg-[#6E5FFF30] mt-5 p-3">
      <CardHeader handleRemove={handleRemove} />

      <div className="flex justify-between items-center">
        <h3 className="font-bold text-black text-lg">Diseño</h3>
        <div className="flex items-center">
          <input
            type="number"
            name=""
            id="unidades"
            className="formulario w-12 h-9"
          />
          <label htmlFor="unidades" className="labels ml-2">
            Unid.
          </label>
        </div>
      </div>
      <div
        className="mt-2"
        style={{ borderBottom: "1px solid rgba(0,0,0,.2)" }}
      ></div>
      <div className="mt-2">
        <label htmlFor="" className="labels">
          Horas de diseño
        </label>
        <input
          type="number"
          className="formulario"
          name={`Diseno`}
          data-index={index}
          data-field="horas"
          value={data.horas}
          onChange={(e) =>
            handleChange(
              e.target.name,
              Number(e.target.getAttribute("data-index")),
              e.target.getAttribute("data-field"),
              e.target.value
            )
          }
          placeholder="Horas"
        />
      </div>
      <div className="flex justify-end mt-2 items-center">
        <input
          className="formulario w-15 h-9 bg-transparent border-[#00000000] border-b-[#00000030]"
          type="number"
          name={`Diseno`}
          data-index={index}
          data-field="precio"
          value={data.precio}
          onChange={(e) =>
            handleChange(
              e.target.name,
              Number(e.target.getAttribute("data-index")),
              e.target.getAttribute("data-field"),
              e.target.value
            )
          }
          placeholder="Precio"
        />
        <label htmlFor="unidades ml-2" className="labels ml-2">
          €
        </label>
      </div>
    </div>
  );
};

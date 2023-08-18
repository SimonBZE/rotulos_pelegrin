import { CardHeader } from "./CardHeader";

export const Print = ({ data, handleChange, handleRemove, index }) => {
  return (
    <div className="rounded-md bg-[#2FA7FF30] mt-5 p-3">
      <CardHeader handleRemove={handleRemove} />

      <div className="flex items-center">
        <label htmlFor="unidades" className="labels ml-2">
          Nombre
        </label>

        <input
          type="text"
          id="unidades"
          className="formulario ml-2 h-9"
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
        />
      </div>
    </div>
  );
};

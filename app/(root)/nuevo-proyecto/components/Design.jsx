import ImageUploader from "@/components/common/ImageUploader";
import { CardHeader } from "./CardHeader";

export const Design = ({ index, data, onChange, onRemove }) => {
  return (
    <div className="rounded-md bg-[#6E5FFF30] mt-5 p-3">
      <CardHeader title="Diseño" onRemove={onRemove} />

      <div className="flex justify-between items-center">
        <div className="flex flex-col">
          <label htmlFor="horas" className="labels">
            Horas de diseño
          </label>
          <input
          id='horas'
            type="number"
            className="formulario"
            name={`Diseno`}
            data-index={index}
            data-field="horas"
            value={data.horas || ""}
            onChange={(e) => onChange("Diseno", index, "horas", e.target.value)}
            placeholder="Horas"
          />
        </div>
        <div>
          <div className="flex flex-col">
          <label htmlFor="unidades" className="labels">
              Unid.
            </label>
            <input
              type="number"
              name=""
              id="unidades"
              className="formulario w-12"
            />
            
          </div>
        </div>
      </div>

      {/* Imagenes */}
      <ImageUploader 
        onImagesChange={(imageURLs) => {
          onChange('Diseno', index, 'imagenes', imageURLs);
        }}
      />

      
      <div className="flex justify-end mt-4 items-center">
        <input
          className="formulario w-16 h-9 bg-transparent border-[#00000000] border-b-[#00000030]"
          type="number"
          name={`Diseno`}
          data-index={index}
          data-field="precio"
          value={data.precio || ""}
          onChange={(e) => onChange("Diseno", index, "precio", e.target.value)}
          placeholder="Precio"
        />
        <label htmlFor="unidades ml-2" className="labels ml-2">
          €
        </label>
      </div>
    </div>
  );
};

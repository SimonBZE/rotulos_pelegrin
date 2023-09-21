import ImageUploader from "@/components/common/ImageUploader";
import { CardHeader } from "./CardHeader";

export const Design = ({ index, data, onChange, onRemove, errors }) => {
  // console.log(errors.diseno[index].horas)
  return (
    <div className="rounded-md bg-[#6E5FFF30] mt-5 p-3">
      <CardHeader title="Diseño" onRemove={onRemove} />

      <div className="flex items-center gap-2 justify-center">
        <div className="flex w-9/12 flex-col">
          <label htmlFor="horas" className="labels ">
            Horas de diseño
          </label>
          <input
          id='horas'
            type="number"
            className="formulario"
            name={`diseno`}
            data-index={index}
            data-field="horas"
            value={data.horas || ""}
            onChange={(e) => onChange("diseno", index, "horas", e.target.value)}
            placeholder="Horas"
          />
          {errors.diseno[index].horas && <p className="text-red-500">{errors.diseno[index].horas}</p>}

        </div>
        <div>
          <div className="flex flex-col items-end">
          <label htmlFor="unidades" className="labels">
              Unid.
            </label>
            <input
              type="number"
              name="unidades"
              id="unidades"
              onChange={(e) => onChange("diseno", index, "unidades", e.target.value)}
              className="formulario w-1/2"
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
          onChange={(e) => onChange("diseno", index, "precio", e.target.value)}
          placeholder="Precio"
        />
        <label htmlFor="unidades ml-2" className="labels ml-2">
          €
        </label>
      </div>
    </div>
  );
};

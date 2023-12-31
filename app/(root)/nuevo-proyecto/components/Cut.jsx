import ImageUploader from "@/components/common/ImageUploader";
import { CardHeader } from "./CardHeader";

export const Cut = ({ index, data, onChange, onRemove }) => {
  return (
    <div className="rounded-md bg-[#FF5F5F30] mt-5 p-3">
      <CardHeader title={"Corte"} onRemove={onRemove} />

      <div className="flex items-center">
        <label htmlFor="nombre" className="labels ml-2">
          Nombre
        </label>

        <input
          type="text"
          id="nombre"
          className="formulario ml-2"
          name={`Corte`}
          data-index={index}
          data-field="nombre"
          value={data.nombre || ""}
          onChange={(e) => onChange("Corte", index, "nombre", e.target.value)}
        />
      </div>
      <div className="flex justify-between mt-5">
        <div>
          <label className="labels mr-2" htmlFor="ancho">
            Ancho
          </label>
          <input
            type="number"
            id="ancho"
            className="formulario w-14"
            name="Corte"
            data-index={index}
            value={data.ancho || ""}
            onChange={(e) => onChange("Corte", index, "ancho", e.target.value)}
          />
        </div>
        <div>
          <label className="labels mr-2" htmlFor="alto">
            Alto
          </label>
          <input
            type="number"
            id="alto"
            className="formulario w-14"
            name="Corte"
            data-index={index}
            value={data.alto || ""}
            onChange={(e) => onChange("Corte", index, "alto", e.target.value)}
          />
        </div>
        <div>
          <label className="labels mr-2" htmlFor="profundo">
            Profundo
          </label>
          <input
            type="number"
            id="profundo"
            className="formulario w-14"
            name="Corte"
            value={data.profundo || ""}
            onChange={(e) =>
              onChange("Corte", index, "profundo", e.target.value)
            }
          />
        </div>
      </div>
      <div className="flex flex-col mt-5">
        <label className="labels" htmlFor="material">
          Material
        </label>
        <select
          name="Corte"
          id="material"
          className="formulario"
          value={data.material || ""}
          onChange={(e) => onChange("Corte", index, "material", e.target.value)}
        >
          <option disabled value="default">
            Selecciona uno
          </option>
          <option value="Vinilo x5 pro master">Vinilo x5 pro master</option>
          <option value="Vinilo x7 pro master">Vinilo x6 pro master</option>
          <option value="Vinilo x8 pro master">Vinilo x7 pro master</option>
        </select>
      </div>

      <div className="flex flex-col mt-5">
        <label className="labels" htmlFor="laminacion">
          Laminación
        </label>
        <select
          name="Corte"
          id="laminacion"
          className="formulario"
          value={data.laminacion || ""}
          onChange={(e) =>
            onChange("Corte", index, "laminacion", e.target.value)
          }
        >
          <option disabled value="default">
            Selecciona uno
          </option>
          <option value="Vinilo x5 pro master">5 años</option>
          <option value="Vinilo x6 pro master">6 años</option>
          <option value="Vinilo x7 pro master">7 años</option>
        </select>
      </div>

      {/* Imagenes */}
      <ImageUploader
        onImagesChange={(imageURLs) => {
          onChange("Corte", index, "imagenes", imageURLs);
        }}
      />

      {/* Precio */}
      <div className="flex justify-end mt-4 items-center">
        <input
          className="formulario w-16 h-9 bg-transparent border-[#00000000] border-b-[#00000030]"
          type="number"
          name={`Corte`}
          data-index={index}
          data-field="precio"
          value={data.precio || ""}
          onChange={(e) => onChange("Corte", index, "precio", e.target.value)}
          placeholder="Precio"
        />
        <label htmlFor="unidades ml-2" className="labels ml-2">
          €
        </label>
      </div>
    </div>
  );
};

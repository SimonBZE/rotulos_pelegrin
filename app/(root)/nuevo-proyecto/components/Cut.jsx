import { Field, ErrorMessage } from "formik";
import { CardHeader } from ".";
import ImageGrid from "@/components/common/ImageGrid";
import ImageViewer from "@/components/common/ImageViewer";

export const Cut = ({ index, onRemove, handleFileChange, images, handleImageRemove }) => {
  return (
    <div className="rounded-md bg-[#FF5F5F30] mt-5 p-3">
      <CardHeader title={"corte"} onRemove={onRemove} />

      <div className="flex items-center flex-wrap gap-2">
        <label htmlFor="nombre" className="labels pl-2">
          Nombre
        </label>

        <Field
          type="text"
          className="formulario max-w-full"
          name={`corte[${index}].nombre`}
        />
      </div>
      <div className="flex justify-between mt-5">
        <div>
          <label className="labels mr-2" htmlFor="ancho">
            Ancho
          </label>
          <Field
            type="number"
            className="formulario w-14"
            name={`corte[${index}].ancho`}
          />
        </div>
        <div>
          <label className="labels mr-2" htmlFor="alto">
            Alto
          </label>
          <Field
            type="number"
            className="formulario w-14"
            name={`corte[${index}].alto`}
          />
        </div>
        <div>
          <label className="labels mr-2" htmlFor="profundo">
            Profundo
          </label>
          <Field
            type="number"
            className="formulario w-14"
            name={`corte[${index}].profundo`}
          />
        </div>
      </div>
      <div className="flex flex-col mt-5">
        <label className="labels" htmlFor="material">
          Material
        </label>
        <Field as="select"
          id="material"
          className="formulario"
          name={`corte[${index}].material`}
        >
          <option disabled value="default">
            Selecciona uno
          </option>
          <option value="Vinilo x5 pro master">Vinilo x5 pro master</option>
          <option value="Vinilo x7 pro master">Vinilo x6 pro master</option>
          <option value="Vinilo x8 pro master">Vinilo x7 pro master</option>
        </Field>
      </div>

      <div className="flex flex-col mt-5">
        <label className="labels" htmlFor="laminacion">
          Laminación
        </label>
        <Field  as="select"
          id="laminacion"
          className="formulario"
          name={`corte[${index}].laminacion`}
        >
          <option disabled value="default">
            Selecciona uno
          </option>
          <option value="Vinilo x5 pro master">5 años</option>
          <option value="Vinilo x6 pro master">6 años</option>
          <option value="Vinilo x7 pro master">7 años</option>
        </Field>
      </div>

      {/* Imagenes */}
      <ImageViewer
        serviceName="corte"
        index={index}
        handleFileChange={handleFileChange}
        images={images}
        handleImageRemove={handleImageRemove}
      />

      {/* Precio */}
      <div className="flex justify-end mt-4 items-center">
        <Field
          className="formulario w-16 h-9 bg-transparent border-[#00000000] border-b-[#00000030]"
          type="number"
          name={`corte[${index}].precio`}
          placeholder="Precio"
        />
        <label htmlFor="precio" className="labels ml-2">
          €
        </label>
      </div>
    </div>
  );
};

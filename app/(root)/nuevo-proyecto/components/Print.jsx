import { Field, ErrorMessage } from "formik";
import { CardHeader } from "./CardHeader";
import ImageGrid from "@/components/common/ImageGrid";
import ImageViewer from "@/components/common/ImageViewer";

export const Print = ({
  index,
  onRemove,
  handleFileChange,
  images,
  handleImageRemove,
}) => {
  return (
    <div className="rounded-md bg-[#2FA7FF30] mt-5 p-3">
      <CardHeader title={"Impresión"} onRemove={onRemove} />

      <div className="flex items-center">
        <label htmlFor="nombre" className="labels ml-2">
          Nombre
        </label>

        <Field
          type="text"
          id="nombre"
          className="formulario ml-2"
          name={`impresion[${index}].nombre`}
        />
      </div>
      <div className="flex justify-between mt-5">
        <div>
          <label className="labels mr-2" htmlFor="ancho">
            Ancho
          </label>
          <Field
            type="number"
            id="ancho"
            className="formulario w-14"
            name={`impresion[${index}].ancho`}
          />
        </div>
        <div>
          <label className="labels mr-2" htmlFor="alto">
            Alto
          </label>
          <Field
            type="number"
            id="alto"
            className="formulario w-14"
            name={`impresion[${index}].alto`}
          />
        </div>
        <div>
          <label className="labels mr-2" htmlFor="profundo">
            Profundo
          </label>
          <Field
            type="number"
            id="profundo"
            className="formulario w-14"
            name={`impresion[${index}].profundo`}
          />
        </div>
      </div>
      <div className="flex flex-col mt-5">
        <label className="labels" htmlFor="material">
          Material
        </label>
        <Field
          as="select"
          id="material"
          className="formulario"
          name={`impresion[${index}].material`}
        >
          <option>Selecciona uno</option>
          <option value="Vinilo x5 pro master">Vinilo x5 pro master</option>
          <option value="Vinilo x7 pro master">Vinilo x6 pro master</option>
          <option value="Vinilo x8 pro master">Vinilo x7 pro master</option>
        </Field>
      </div>

      <div className="flex flex-col mt-5">
        <label className="labels" htmlFor="laminacion">
          Laminación
        </label>
        <Field
          as="select"
          id="laminacion"
          name={`impresion[${index}].laminacion`}
          className="formulario"
        >
          <option>Selecciona uno</option>
          <option value="5 años">5 años</option>
          <option value="6 años">6 años</option>
          <option value="7 años">7 años</option>
        </Field>
      </div>

      <ImageViewer
        serviceName="impresion"
        index={index}
        handleFileChange={handleFileChange}
        images={images}
        handleImageRemove={handleImageRemove}
      />

      {/* Precio */}
      <div className="flex justify-end mt-4 items-center">
        <Field
          id="precio"
          className="formulario w-16 h-9 bg-transparent border-[#00000000] border-b-[#00000030]"
          type="number"
          name={`impresion[${index}].precio`}
          placeholder="Precio"
        />
        <label htmlFor="precio" className="labels ml-2">
          €
        </label>
      </div>
    </div>
  );
};

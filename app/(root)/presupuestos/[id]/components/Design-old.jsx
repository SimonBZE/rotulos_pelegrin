import { Field, ErrorMessage } from "formik";
import ImageUploader from "@/components/common/ImageUploader";
import { CardHeader } from "./CardHeader";

export const DesignFormik = ({ index, data, onChange, onRemove }) => {
  return (
    <div className="rounded-md bg-[#6E5FFF30] mt-5 p-3">
      <CardHeader title="Diseño" onRemove={onRemove} />

      <div className="flex items-center gap-2 justify-center">
        <div className="flex w-9/12 flex-col">
          <label htmlFor={`diseno[${index}].horas`} className="labels ">
            Horas de diseño
          </label>
          <Field
            id={`diseno[${index}].horas`}
            type="number"
            className="formulario"
            name={`diseno[${index}].horas`}
            placeholder="Horas"
          />
          <ErrorMessage name={`diseno[${index}].horas`} component="div" className="error-message" />
        </div>
        <div>
          <div className="flex flex-col items-end">
            <label htmlFor={`diseno[${index}].unidades`} className="labels">
              Unid.
            </label>
            <Field
              type="number"
              name={`diseno[${index}].unidades`}
              className="formulario w-1/2"
            />
            <ErrorMessage name={`diseno[${index}].unidades`} component="div" className="error-message" />
          </div>
        </div>
      </div>

      {/* Imagenes */}
      {/* <ImageUploader 
        onImagesChange={(imageURLs) => {
          onChange('Diseno', index, 'imagenes', imageURLs);
        }}
      /> */}

      <div className="flex justify-end mt-4 items-center">
        <Field
          type="number"
          name={`diseno[${index}].precio`}
          className="formulario w-1/2"
        />
        <ErrorMessage name={`diseno[${index}].precio`} component="div" className="error-message" />
        <label htmlFor={`diseno[${index}].precio`} className="labels ml-2">
          €
        </label>
      </div>
    </div>
  );
};

import { Field, ErrorMessage, formik } from "formik";

export const Dinero = ({ index, arrayHelpers, onRemove, handleFileChange }) => {
  return (
    <div>
      <Field
        className="formulario"
        type="number"
        name={`dinero[${index}].horas`}
      />

      <Field
        className="formulario"
        type="number"
        name={`dinero[${index}].unidades`}
      />

      <input
        type="file"
        name={`dinero[${index}].imagenes`}
        data-name={`dinero[${index}].imagenes`}
        multiple
        onChange={(e) => handleFileChange(e, `dinero`, index )}
      />

      <Field
        className="formulario w-16 h-9 bg-transparent border-[#00000000] border-b-[#00000030]"
        type="number"
        name={`dinero[${index}].precio`}
      />
    </div>
  );
};

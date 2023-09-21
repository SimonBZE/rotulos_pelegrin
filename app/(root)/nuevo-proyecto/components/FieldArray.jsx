import { Field, ErrorMessage } from "formik";
import { CardHeader } from ".";

const FieldDesign = ({ index, arrayHelpers, onRemove }) => {
  const handleImageChange = (e, setFieldValue) => {
    const files = Array.from(e.target.files);
    const imageFiles = files.filter((file) =>
      ["image/jpeg", "image/png", "image/gif"].includes(file.type)
    );
    setFieldValue(`diseno[${index}].imagenes`, imageFiles);
  };

  return (
    <div className="rounded-md bg-[#6E5FFF30] mt-5 p-3">
      <CardHeader title="Diseño" onRemove={onRemove} />

      <div className="flex items-center gap-2 justify-center">
        <div className="flex flex-col ">
          <label className="labels">Horas:</label>
          <Field
            className="formulario"
            type="number"
            name={`diseno[${index}].horas`}
          />
          <ErrorMessage name={`diseno[${index}].horas`} />
        </div>

        <div className="flex w-9/12 flex-col items-end">
          <label className="labels">Cantidad:</label>
          <Field
            className="formulario"
            type="number"
            name={`diseno[${index}].unidades`}
          />
          <ErrorMessage name={`diseno[${index}].unidades`} />
        </div>
      </div>

      {/* Imagenes */}
      <div>
        <label>Imágenes:</label>
        <input
          type="file"
          multiple
          accept=".jpg,.png,.gif"
          onChange={(e) =>
            handleImageChange(e, arrayHelpers.form.setFieldValue)
          }
        />
        <ErrorMessage name={`diseno[${index}].imagenes`} />
      </div>

      <div className="flex justify-end mt-4 items-center">
        <Field
          className="formulario w-16 h-9 bg-transparent border-[#00000000] border-b-[#00000030]"
          type="number"
          name={`diseno[${index}].precio`}
        />
        <label className="labels ml-2">€</label>
        <ErrorMessage name={`diseno[${index}].precio`} />
      </div>
    </div>
  );
};

export default FieldDesign;

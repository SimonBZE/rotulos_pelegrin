import { Field, ErrorMessage } from "formik";
import { CardHeader } from ".";
import ImageViewer from "@/components/common/ImageViewer";

export const Design = ({
  index,
  onRemove,
  handleFileChange,
  images,
  handleImageRemove,
  formik
}) => {
  return (
    <div className="rounded-md bg-[#6E5FFF30] mt-5 p-3">
      <CardHeader title="Diseño" onRemove={onRemove} />

      <div className="flex items-center gap-2 justify-center">
        <div className="flex flex-col ">
          <label className="labels">Horas:</label>
          <Field
            className={`formulario ${
              formik?.touched?.diseno &&
              formik?.touched?.diseno[index] &&
              formik?.touched?.diseno[index]?.horas &&
              formik?.errors?.diseno &&
              formik?.errors?.diseno[index] &&
              formik?.errors?.diseno[index]?.horas
                ? "border-primary"
                : ""
            }`}
            type="number"
            name={`diseno[${index}].horas`}
          />
          <ErrorMessage
            name={`diseno[${index}].horas`}
            component="div"
            className="text-primary"
          />
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

      <ImageViewer
        serviceName="diseno"
        index={index}
        handleFileChange={handleFileChange}
        images={images}
        handleImageRemove={handleImageRemove}
      />

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

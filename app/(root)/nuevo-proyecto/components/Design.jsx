import { Field, ErrorMessage } from "formik";
import { CardHeader, Pricing } from ".";
import ImageViewer from "@/components/common/ImageViewer";

export const Design = ({
  index,
  onRemove,
  handleFileChange,
  images,
  handleImageRemove,
  formik,
  loadingImage,
}) => {
  return (
    <div className="rounded-md bg-[#6E5FFF30] mt-5 p-3">
      <CardHeader title="Diseño" onRemove={onRemove} />

      <div className="flex items-center gap-2 justify-center">
        <div className="flex flex-col ">
          <label className="labels">Horas:</label>
          <Field
            className={`formulario ${
              formik.touched.diseno?.[index]?.horas && formik.errors.diseno?.[index]?.horas
                ? "border-danger border-2"
                : ""
            }`}
            type="number"
            name={`diseno[${index}].horas`}
          />
        </div>

        <div className="flex w-9/12 flex-col items-end">
          <label className="labels">Cantidad:</label>
          <Field
            className={`formulario ${
              formik.touched.diseno?.[index]?.unidades && formik.errors.diseno?.[index]?.unidades
                ? "border-danger border-2"
                : ""
            }`}
            type="number"
            name={`diseno[${index}].unidades`}
          />
        </div>
      </div>

      <ImageViewer
        serviceName="diseno"
        index={index}
        handleFileChange={handleFileChange}
        images={images}
        handleImageRemove={handleImageRemove}
        loadingImage={loadingImage}
      />

      <Pricing index={index} service={"diseno"} formik={formik} />
    </div>
  );
};

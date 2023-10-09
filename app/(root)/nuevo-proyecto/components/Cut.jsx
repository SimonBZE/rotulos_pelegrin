import { Field, ErrorMessage } from "formik";
import { CardHeader, Pricing } from ".";
import ImageGrid from "@/components/common/ImageGrid";
import ImageViewer from "@/components/common/ImageViewer";

export const Cut = ({
  index,
  onRemove,
  handleFileChange,
  images,
  handleImageRemove,
  formik,
}) => {
  return (
    <div className="rounded-md bg-[#FF5F5F30] mt-5 p-3">
      <CardHeader title={"corte"} onRemove={onRemove} />

      <div className="flex items-center flex-wrap gap-2">
        <label htmlFor="nombre" className="labels pl-2">
          Nombre
        </label>

        <Field
          type="text"
          className={`formulario max-w-full ${
            formik.touched.corte?.[index]?.nombre && formik.errors.corte?.[index]?.nombre
              ? "errores"
              : ""
          }`}
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
            className={`formulario w-14 ${
              formik.touched.corte?.[index]?.ancho && formik.errors.corte?.[index]?.ancho
                ? "errores"
                : ""
            }`}
            name={`corte[${index}].ancho`}
          />
        </div>
        <div>
          <label className="labels mr-2" htmlFor="alto">
            Alto
          </label>
          <Field
            type="number"
            className={`formulario w-14 ${
              formik.touched.corte?.[index]?.alto && formik.errors.corte?.[index]?.alto
                ? "errores"
                : ""
            }`}
            name={`corte[${index}].alto`}
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
          className={`formulario ${
            formik.touched.corte?.[index]?.material && formik.errors.corte?.[index]?.material
              ? "errores"
              : ""
          }`}
          name={`corte[${index}].material`}
        >
          <option defaultValue hidden>Selecciona uno</option>
          <option value="Vinilo x5 pro master">Vinilo x5 pro master</option>
          <option value="Vinilo x7 pro master">Vinilo x6 pro master</option>
          <option value="Vinilo x8 pro master">Vinilo x7 pro master</option>
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
      
      <Pricing index={index} service={"corte"} formik={formik} />
      
    </div>
  );
};

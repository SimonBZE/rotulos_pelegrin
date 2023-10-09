import { Field, ErrorMessage } from "formik";
import { CardHeader } from "./CardHeader";
import ImageViewer from "@/components/common/ImageViewer";
import { Pricing } from ".";

export const Paint = ({
  index,
  onRemove,
  handleFileChange,
  images,
  handleImageRemove,
  formik,
}) => {
  return (
    <div className="rounded-md bg-[#8AC11130] mt-5 p-3">
      <CardHeader title={"Pintura"} onRemove={onRemove} />

      <div className="flex items-center flex-wrap gap-2">
        <label htmlFor="nombre" className="labels">
          Nombre
        </label>

        <Field
          type="text"
          id="nombre"
          className={`formulario ${
            formik.touched.pintura?.[index]?.nombre && formik.errors.pintura?.[index]?.nombre
              ? "errores"
              : ""
          }`}
          name={`pintura[${index}].nombre`}
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
            className={`formulario w-14 ${
              formik.touched.pintura?.[index]?.ancho && formik.errors.pintura?.[index]?.ancho
                ? "errores"
                : ""
            }`}
            name={`pintura[${index}].ancho`}
          />
        </div>
        <div>
          <label className="labels mr-2" htmlFor="alto">
            Alto
          </label>
          <Field
            type="number"
            id="alto"
            className={`formulario w-14 ${
              formik.touched.pintura?.[index]?.alto && formik.errors.pintura?.[index]?.alto
                ? "errores"
                : ""
            }`}
            name={`pintura[${index}].alto`}
          />
        </div>
      </div>
      <div className="flex items-center gap-2 mt-5">
        <label className="labels" htmlFor="lijado">Lijado:</label>
        <Field 
          type="checkbox"
          id="lijado"
          className={`w-9 h-9 accent-primary border-none ${
            formik.touched.pintura?.[index]?.lijado && formik.errors.pintura?.[index]?.lijado
              ? "errores"
              : ""
          }`}
          name={`pintura[${index}].lijado`}
        />
      </div>
      <div className="flex flex-col mt-5">
        <label className="labels" htmlFor="material">
          Material
        </label>
        <Field
          as="select"
          id="material"
          className={`formulario ${
            formik.touched.pintura?.[index]?.material && formik.errors.pintura?.[index]?.material
              ? "errores"
              : ""
          }`}
          name={`pintura[${index}].material`}
        >
          <option hidden defaultValue>
            Selecciona uno
          </option>
          <option value="Vinilo x5 pro master">Vinilo x5 pro master</option>
          <option value="Vinilo x7 pro master">Vinilo x6 pro master</option>
          <option value="Vinilo x8 pro master">Vinilo x7 pro master</option>
        </Field>
      </div>
      {/* Imagenes */}
      <ImageViewer
        serviceName="pintura"
        index={index}
        handleFileChange={handleFileChange}
        images={images}
        handleImageRemove={handleImageRemove}
      />

      {/* Precio */}
      <Pricing index={index} service={"pintura"} formik={formik} />
    </div>
  );
};

import { Field, ErrorMessage } from "formik";
import { CardHeader } from "./CardHeader";
import ImageViewer from "@/components/common/ImageViewer";
import { Pricing } from ".";

export const Mounting = ({ 
  index,
  onRemove,
  handleFileChange,
  images,
  handleImageRemove,
  FieldArray,
  formik,
  loadingImage
 }) => {
  return (
    <div className="rounded-md bg-[#FFA00830] mt-5 p-3">
      <CardHeader title={"Montaje"} onRemove={onRemove} />

      <div className="flex items-center justify-between">
        <label htmlFor="tiempo_montaje" className="labels">
          Tiempo de montaje
        </label>

        <Field
          type="number"
          id="tiempo_montaje"
          className={`formulario w-14 ${
            formik.touched.montaje?.[index]?.tiempo_montaje && formik.errors.montaje?.[index]?.tiempo_montaje
              ? "errores"
              : ""
          }`}
          name={`montaje[${index}].tiempo_montaje`}
        />
      </div>
      <div className="flex justify-between mt-5">        
          <label className="labels" htmlFor="desplazamiento">
           Desplazamiento
          </label>
          <Field
            type="number"
            id="desplazamiento"
            className={`formulario w-14 ${
              formik.touched.montaje?.[index]?.desplazamiento && formik.errors.montaje?.[index]?.desplazamiento
                ? "errores"
                : ""
            }`}
            name={`montaje[${index}].desplazamiento`}
          />        
      </div>
      <div className="flex mt-5 justify-between">
        <label className="labels" htmlFor="alquiler_maquinaria">
          Alquiler de maquinaria
        </label>
        <Field
          type="number"
          id="alquiler_maquinaria"
          className={`formulario w-14 ${
            formik.touched.montaje?.[index]?.alquiler_maquinaria && formik.errors.montaje?.[index]?.alquiler_maquinaria
              ? "errores"
              : ""
          }`}
          name={`montaje[${index}].alquiler_maquinaria`}
        />
      </div>

      <FieldArray
        name={`montaje[${index}].adicional`}
        render={(arrayHelpersAdicional) => (
          <div>
            <div
              className="my-3"
              style={{ borderBottom: "1px solid rgba(0,0,0,.1)" }}
            ></div>
            <div className="flex gap-2 items-center mb-3 justify-between">
              <p className="labels w-[50%]">Otros</p>
              <a
                className="cursor-pointer bg-primary text-white rounded-2xl px-2 py-1"
                onClick={() =>
                  arrayHelpersAdicional.push({ nombre: "", precio: 0 })
                }
              >
                Añadir
              </a>
            </div>
            {arrayHelpersAdicional.form.values.montaje[index].adicional.map(
              (_, adicionalIndex) => (
                <div key={adicionalIndex} className="mt-5">
                  <div className="flex gap-2 items-center">
                    <Field
                      name={`montaje[${index}].adicional[${adicionalIndex}].nombre`}
                      placeholder="Nombre"
                      className={`formulario ${
                        formik.touched.montaje?.[index]?.adicional?.[adicionalIndex]?.nombre && formik.errors.montaje?.[index]?.adicional?.[adicionalIndex]?.nombre
                          ? "errores"
                          : ""
                      }`}
                    />
                    <Field
                      name={`montaje[${index}].adicional[${adicionalIndex}].precio`}
                      placeholder="Precio"
                      type="number"
                      className={`formulario w-17 ${
                        formik.touched.montaje?.[index]?.adicional?.[adicionalIndex]?.precio && formik.errors.montaje?.[index]?.adicional?.[adicionalIndex]?.precio
                          ? "errores"
                          : ""
                      }`}
                    />
                    <a
                      href="#"
                      className="rounded-full px-[8px] py-[3px] text-xs cursor-pointer bg-black text-white"
                      onClick={() =>
                        arrayHelpersAdicional.remove(adicionalIndex)
                      }
                    >
                      X
                    </a>
                  </div>
                </div>
              )
            )}
            <div
              className="my-3"
              style={{ borderBottom: "1px solid rgba(0,0,0,.1)" }}
            ></div>
          </div>
        )}
      />

      

      {/* Imagenes */}
      <ImageViewer
        serviceName="montaje"
        index={index}
        handleFileChange={handleFileChange}
        images={images}
        handleImageRemove={handleImageRemove}
        loadingImage={loadingImage}      
      />

      {/* Precio */}
      <Pricing index={index} service={"montaje"} formik={formik} />
    </div>
  );
};

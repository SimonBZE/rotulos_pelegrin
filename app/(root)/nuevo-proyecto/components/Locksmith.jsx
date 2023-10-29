import { Field } from "formik";
import { CardHeader, Pricing } from ".";
import ImageViewer from "@/components/common/ImageViewer";
import { useEffect, useState } from "react";
import Loader from "@/components/common/Loader";

export const Locksmith = ({
  index,
  onRemove,
  handleFileChange,
  images,
  handleImageRemove,
  FieldArray,
  formik,
  loadingImage,
  preciosServicios
}) => {
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if(!preciosServicios?.cerrajeria) {
      return
    } 
    const material = preciosServicios.cerrajeria.material[formik.values?.cerrajeria?.[index].material] || 0;    
    const metros_cuadrados = formik.values?.cerrajeria?.[index].ancho * formik.values?.cerrajeria?.[index].alto || 0;   
    const totalAdicional = formik.values?.cerrajeria?.[index].adicional.reduce( (total, item) => total + item.precio, 0 );
    const totalHoras = formik.values?.cerrajeria?.[index].horas_fabricacion * preciosServicios.cerrajeria.horas;
    const newTotal = (((material) * metros_cuadrados) * formik.values?.cerrajeria?.[index].cantidad) + totalAdicional + totalHoras || 0;

    // Actualiza el estado 'total' con el nuevo valor calculado
    setTotal(newTotal);
    
    // Asigna el nuevoTotal al precio en formik.values.cerrajeria[index]
    formik.values.cerrajeria[index].precio = newTotal;
    if(loading){
      setLoading(false)
    }

  }, [preciosServicios, formik.values.cerrajeria[index]]);

  return (
    <>
      {loading ? <div className="h-100 flex justify-center items-center"><Loader tamano={50}/></div> :
      <div className="rounded-md bg-[#00D7E230] mt-5 p-3">
      <CardHeader title={"Cerrajería"} onRemove={onRemove} />

      <div className="flex items-center">
        <label htmlFor="nombre" className="labels ml-2">
          Nombre
        </label>

        <Field
          type="text"
          id="nombre"
          className={`formulario ml-2 ${
            formik.touched.cerrajeria?.[index]?.nombre && formik.errors.cerrajeria?.[index]?.nombre
              ? "errores"
              : ""
          }`}
          name={`cerrajeria[${index}].nombre`}
        />
      </div>
      <div className="flex justify-between mt-5 gap-3">
        <div>
          <label className="labels mr-2" htmlFor="ancho">
            Ancho
          </label>
          <Field
            type="number"
            id="ancho"
            className={`formulario w-full ${
              formik.touched.cerrajeria?.[index]?.ancho && formik.errors.cerrajeria?.[index]?.ancho
                ? "errores"
                : ""
            }`}
            name={`cerrajeria[${index}].ancho`}
          />
        </div>
        <div>
          <label className="labels mr-2" htmlFor="alto">
            Alto
          </label>
          <Field
            type="number"
            id="alto"
            className={`formulario w-full ${
              formik.touched.cerrajeria?.[index]?.alto && formik.errors.cerrajeria?.[index]?.alto
                ? "errores"
                : ""
            }`}
            name={`cerrajeria[${index}].alto`}
          />
        </div>
        <div>
          <label className="labels mr-2" htmlFor="profundo">
            Grosor
          </label>
          <Field
            type="number"
            id="grosor"
            className={`formulario w-full ${
              formik.touched.cerrajeria?.[index]?.grosor && formik.errors.cerrajeria?.[index]?.grosor
                ? "errores"
                : ""
            }`}
            name={`cerrajeria[${index}].grosor`}
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
            formik.touched.cerrajeria?.[index]?.material && formik.errors.cerrajeria?.[index]?.material
              ? "errores"
              : ""
          }`}
          name={`cerrajeria[${index}].material`}
        >
          <option defaultValue hidden>
            Selecciona uno
          </option>
          {Object.keys(preciosServicios.cerrajeria.material).map((opcion) => (
              <option key={opcion} value={opcion}>
                {opcion}
              </option>
            ))
          }
        </Field>
      </div>

      <div className="flex justify-between mt-5 items-center">
        <label className="labels" htmlFor="horas_fabricacion">
          Horas de fabricacion
        </label>
        <Field
          type="number"
          id="horas_fabricacion"
          className={`formulario w-16 ${
            formik.touched.cerrajeria?.[index]?.horas_fabricacion && formik.errors.cerrajeria?.[index]?.horas_fabricacion
              ? "errores"
              : ""
          }`}
          name={`cerrajeria[${index}].horas_fabricacion`}
        />
      </div>

      <FieldArray
        name={`cerrajeria[${index}].adicional`}
        render={(arrayHelpersAdicional) => (
          <div>
            <div
              className="my-3"
              style={{ borderBottom: "1px solid rgba(0,0,0,.1)" }}
            ></div>
            <div className="flex gap-2 items-center mb-3 justify-between">
              <p className="labels w-[50%]">Adicional</p>
              <p className="labels">Precio</p>
              <a
                className="cursor-pointer bg-primary text-white rounded-2xl px-2 py-1"
                onClick={() =>
                  arrayHelpersAdicional.push({ nombre: "", precio: 0 })
                }
              >
                Añadir
              </a>
            </div>
            {arrayHelpersAdicional.form.values.cerrajeria[index].adicional.map(
              (_, adicionalIndex) => (
                <div key={adicionalIndex} className="mt-5">
                  <div className="flex gap-2 items-center">
                    <Field
                      name={`cerrajeria[${index}].adicional[${adicionalIndex}].nombre`}
                      placeholder="Nombre"
                      className={`formulario ${
                        formik.touched.cerrajeria?.[index]?.adicional?.[adicionalIndex]?.nombre && formik.errors.cerrajeria?.[index]?.adicional?.[adicionalIndex]?.nombre
                          ? "errores"
                          : ""
                      }`}
                    />
                    <Field
                      name={`cerrajeria[${index}].adicional[${adicionalIndex}].precio`}
                      placeholder="Precio"
                      type="number"
                      className={`formulario w-17 ${
                        formik.touched.cerrajeria?.[index]?.adicional?.[adicionalIndex]?.precio && formik.errors.cerrajeria?.[index]?.adicional?.[adicionalIndex]?.precio
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
        serviceName="cerrajeria"
        index={index}
        handleFileChange={handleFileChange}
        images={images}
        handleImageRemove={handleImageRemove}
        loadingImage={loadingImage}
      />

      {/* Precio */}
      <Pricing index={index} service={"cerrajeria"} formik={formik} total={total} />
    </div>
    }
    </>
    
  );
};

import { Field } from "formik";
import { CardHeader } from "./CardHeader";
import ImageViewer from "@/components/common/ImageViewer";
import { Pricing } from ".";
import { useEffect, useState } from "react";
import Loader from "@/components/common/Loader";

export const Paint = ({
  index,
  onRemove,
  handleFileChange,
  images,
  handleImageRemove,
  formik,
  loadingImage,
  preciosServicios,
  FieldArray
}) => {
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!preciosServicios?.pintura) {
      return;
    }
    const material =
      preciosServicios.pintura.material[
        formik.values?.pintura?.[index].material
      ] || 0;
    const metros_cuadrados =
      formik.values?.pintura?.[index].ancho *
        formik.values?.pintura?.[index].alto || 0;
    const lijado = formik.values.pintura?.[index]?.lijado ? 50 : 0;
    const totalAdicional = formik.values?.pintura?.[index].adicional?.reduce( (total, item) => total + item.precio, 0 );
    const newTotal =
      ((material * metros_cuadrados + metros_cuadrados * lijado) + totalAdicional) *
        formik.values?.pintura?.[index].cantidad || 0;

    // Actualiza el estado 'total' con el nuevo valor calculado
    setTotal(newTotal);

    // Asigna el nuevoTotal al precio en formik.values.pintura[index]
    formik.values.pintura[index].precio = newTotal;
    if (loading) {
      setLoading(false);
    }
  }, [preciosServicios, formik.values.pintura[index]]);

  return (
    <>
      {loading ? (
        <div className="h-100 flex justify-center items-center">
          <Loader tamano={50} />
        </div>
      ) : (
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
                formik.touched.pintura?.[index]?.nombre &&
                formik.errors.pintura?.[index]?.nombre
                  ? "errores"
                  : ""
              }`}
              name={`pintura[${index}].nombre`}
            />
          </div>
          <div className="flex justify-between mt-5 gap-5">
            <div>
              <label className="labels mr-2" htmlFor="ancho">
                Ancho
              </label>
              <Field
                type="number"
                id="ancho"
                className={`formulario w-full ${
                  formik.touched.pintura?.[index]?.ancho &&
                  formik.errors.pintura?.[index]?.ancho
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
                className={`formulario w-full ${
                  formik.touched.pintura?.[index]?.alto &&
                  formik.errors.pintura?.[index]?.alto
                    ? "errores"
                    : ""
                }`}
                name={`pintura[${index}].alto`}
              />
            </div>
          </div>
          <div className="flex items-center gap-2 mt-5">
            <label className="labels" htmlFor="lijado">
              Lijado:
            </label>
            <Field
              type="checkbox"
              id="lijado"
              className={`w-9 h-9 accent-primary border-none ${
                formik.touched.pintura?.[index]?.lijado &&
                formik.errors.pintura?.[index]?.lijado
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
                formik.touched.pintura?.[index]?.material &&
                formik.errors.pintura?.[index]?.material
                  ? "errores"
                  : ""
              }`}
              name={`pintura[${index}].material`}
            >
              <option hidden defaultValue>
                Selecciona uno
              </option>
              {Object.keys(preciosServicios.pintura.material).map((opcion) => (
                <option key={opcion} value={opcion}>
                  {opcion}
                </option>
              ))}
            </Field>
          </div>

          <FieldArray
        name={`pintura[${index}].adicional`}
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
            {arrayHelpersAdicional.form.values.pintura[index].adicional?.map(
              (_, adicionalIndex) => (
                <div key={adicionalIndex} className="mt-5">
                  <div className="flex gap-2 items-center">
                    <Field
                      name={`pintura[${index}].adicional[${adicionalIndex}].nombre`}
                      placeholder="Nombre"
                      className={`formulario ${
                        formik.touched.pintura?.[index]?.adicional?.[adicionalIndex]?.nombre && formik.errors.pintura?.[index]?.adicional?.[adicionalIndex]?.nombre
                          ? "errores"
                          : ""
                      }`}
                    />
                    <Field
                      name={`pintura[${index}].adicional[${adicionalIndex}].precio`}
                      placeholder="Precio"
                      type="number"
                      className={`formulario w-17 ${
                        formik.touched.pintura?.[index]?.adicional?.[adicionalIndex]?.precio && formik.errors.pintura?.[index]?.adicional?.[adicionalIndex]?.precio
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
            serviceName="pintura"
            index={index}
            handleFileChange={handleFileChange}
            images={images}
            handleImageRemove={handleImageRemove}
            loadingImage={loadingImage}
            formik={formik}
          />

          {/* Precio */}
          <Pricing
            index={index}
            service={"pintura"}
            formik={formik}
            total={total}
          />
        </div>
      )}
    </>
  );
};

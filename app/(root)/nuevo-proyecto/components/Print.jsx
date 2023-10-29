import { Field } from "formik";
import { CardHeader } from "./CardHeader";
import ImageViewer from "@/components/common/ImageViewer";
import { Pricing } from ".";
import { useEffect, useState } from "react";
import Loader from "@/components/common/Loader";

// precios()

export const Print = ({
  index,
  onRemove,
  handleFileChange,
  images,
  handleImageRemove,
  formik,
  loadingImage,
  preciosServicios
}) => {
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if(!preciosServicios?.impresion) {
      return
    } 
    const material = preciosServicios.impresion.vinilo[formik.values?.impresion?.[index].material] || 0;    
    const laminado = preciosServicios.impresion.laminado[formik.values?.impresion?.[index].laminacion] || 0;    
    const metros_cuadrados = formik.values?.impresion?.[index].ancho * formik.values?.impresion?.[index].alto || 0;    
    const newTotal = ((material + laminado) * metros_cuadrados) * formik.values?.impresion?.[index].cantidad || 0;

    // Actualiza el estado 'total' con el nuevo valor calculado
    setTotal(newTotal);
    
    // Asigna el nuevoTotal al precio en formik.values.impresion[index]
    formik.values.impresion[index].precio = newTotal;

    if (
      formik.values?.impresion?.[index].laminacion === "Sin laminar" &&
      formik.values?.impresion?.[index].material !== "3 a 5 años"
    ) {
      formik.setFieldValue(
        `impresion[${index}].material`,
        "3 a 5 años"
      );
    }
    if(loading){
      setLoading(false)
    }
  }, [preciosServicios, formik.values.impresion[index]]);
  
  return (
    <>
    {loading ? <div className="h-100 flex justify-center items-center"><Loader tamano={50}/></div> :
    <div className="rounded-md bg-[#2FA7FF30] mt-5 p-3">
    <CardHeader title={"Impresión"} onRemove={onRemove} />
    
    <div className="flex items-center">
      <label htmlFor="nombre" className="labels ml-2">
        Nombre
      </label>

      <Field
        type="text"
        id="nombre"
        className={`formulario ml-2 ${
          formik.touched.impresion?.[index]?.nombre && formik.errors.impresion?.[index]?.nombre
            ? "errores"
            : ""
        }`}
        name={`impresion[${index}].nombre`}
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
          // className="formulario w-14"
          className={`formulario w-full ${
            formik.touched.impresion?.[index]?.ancho && formik.errors.impresion?.[index]?.ancho
              ? "errores"
              : ""
          }`}
          name={`impresion[${index}].ancho`}
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
            formik.touched.impresion?.[index]?.alto && formik.errors.impresion?.[index]?.alto
              ? "errores"
              : ""
          }`}
          name={`impresion[${index}].alto`}
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
          formik.touched.impresion?.[index]?.material && formik.errors.impresion?.[index]?.material
            ? "errores"
            : ""
        }`}
        name={`impresion[${index}].material`}
      >
        <option defaultValue hidden>Selecciona uno</option>
        {Object.keys(preciosServicios.impresion.vinilo).map((opcion) => (
            <option key={opcion} value={opcion}>
              {opcion}
            </option>
          ))      
        }
        
      </Field>
    </div>

    <div className="flex flex-col mt-5">
      <label className="labels" htmlFor="laminacion">
        Laminación
      </label>
      <Field
        as="select"
        id="laminacion"
        name={`impresion[${index}].laminacion`}
        className={`formulario ${
          formik.touched.impresion?.[index]?.laminacion && formik.errors.impresion?.[index]?.laminacion
            ? "errores"
            : ""
        }`}
      >
        <option defaultValue hidden>Selecciona uno</option>
        {Object.keys(preciosServicios.impresion.laminado).map((opcion) => (
            <option key={opcion} value={opcion}>
              {opcion}
            </option>
          ))
        }
      </Field>
    </div>

    <ImageViewer
      serviceName="impresion"
      index={index}
      handleFileChange={handleFileChange}
      images={images}
      handleImageRemove={handleImageRemove}
      loadingImage={loadingImage}
    />

    {/* Precio */}
    <Pricing index={index} service={"impresion"} formik={formik} total={total} />
  </div>
  
  }
    
    </>

  );
};

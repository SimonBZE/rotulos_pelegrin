import { Field } from "formik";
import { CardHeader, Pricing } from ".";
import ImageViewer from "@/components/common/ImageViewer";
import { useEffect, useState } from "react";
import Loader from "@/components/common/Loader";


export const Cut = ({
  index,
  onRemove,
  handleFileChange,
  images,
  handleImageRemove,
  formik,
  loadingImage,
  preciosServicios,
}) => {

  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if(!preciosServicios?.corte) {
      return
    } 
    const material = preciosServicios.corte.material[formik.values?.corte?.[index].material] || 0;    
    const metros_cuadrados = formik.values?.corte?.[index].ancho * formik.values?.corte?.[index].alto || 0;    
    const newTotal = ((material) * metros_cuadrados) * formik.values?.corte?.[index].cantidad || 0;

    // Actualiza el estado 'total' con el nuevo valor calculado
    setTotal(newTotal);
    
    // Asigna el nuevoTotal al precio en formik.values.corte[index]
    formik.values.corte[index].precio = newTotal;
    if(loading){
      setLoading(false)
    }

  }, [preciosServicios, formik.values.corte[index]]);
  
  return (
    <>
      {loading ? <div className="h-100 flex justify-center items-center"><Loader tamano={50}/></div> :
    
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
      <div className="flex justify-between mt-5 gap-5">
        <div>
          <label className="labels mr-2" htmlFor="ancho">
            Ancho
          </label>
          <Field
            type="number"
            className={`formulario w-full ${
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
            className={`formulario w-full ${
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
          {Object.keys(preciosServicios.corte.material).map((opcion) => (
              <option key={opcion} value={opcion}>
                {opcion}
              </option>
            ))
          }
        </Field>
      </div>

      {/* Imagenes */}
      {/* <ImageViewer
        serviceName="corte"
        index={index}
        handleFileChange={handleFileChange}
        images={images}
        handleImageRemove={handleImageRemove}
        loadingImage={loadingImage}
      /> */}
      <ImageViewer
        serviceName="corte"
        index={index}
        handleFileChange={handleFileChange}
        images={images}
        handleImageRemove={handleImageRemove}
        loadingImage={loadingImage}
        formik={formik}
      />

      {/* Precio */}
      
      <Pricing index={index} service={"corte"} formik={formik} total={total}/>
      
    </div>
}
    </>
  );
};

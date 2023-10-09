import { Field, ErrorMessage } from "formik";


export const Pricing = ({ index, service, formik }) => {
  
  return (
    <div className="flex justify-between mt-4 items-center">
      <div>
        <label htmlFor="cantidad" className="labels ml-2">
          Und.
        </label>
        <Field
        className={`formulario w-16 ml-2 ${
          formik.touched[service]?.[index]?.cantidad && formik.errors[service]?.[index]?.cantidad
            ? "border-danger border-2"
            : ""
        }`}
          // className="formulario w-16 ml-2"
          type="number"
          name={`${service}[${index}].cantidad`}
          placeholder="cantidad"
        />
      </div>
      <div>
        <Field
          // className="formulario w-16 h-9 bg-transparent border-[#00000000] border-b-[#00000030]"
          className={`formulario w-16 ml-2 ${
            formik.touched[service]?.[index]?.precio && formik.errors[service]?.[index]?.precio
              ? "border-danger border-2"
              : ""
          }`}
          type="number"
          name={`${service}[${index}].precio`}
          placeholder="Precio"
        />        
        <label htmlFor="precio" className="labels ml-2">
          €
        </label>
        
      </div>
    </div>
  );
};

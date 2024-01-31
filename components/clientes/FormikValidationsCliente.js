import * as Yup from "yup";

export const initialValues = {
    nombre: "",
    apellido:"",
    razon_social:"",
    tipo_documento:"",
    direccion:[],
    presupuestos: [],
    foto:[],
    vat: "",
    nif: "",
    telefono: "",
    correo: "",
}

export const direccion = {
    pais: "",
    direccion: "",
    ciudad: "",
    region: "",
    cp: "",    
}

const postalCodeRegex = /^[0-9]{5}$/;

  export const direccionSchema = Yup.object().shape({
    pais: Yup.string().required("El pais es requerido"),
    direccion: Yup.string().required("La direccion es requerida"),
    ciudad: Yup.string().required("La ciudad es requerida"),
    region: Yup.string().required("La region es requerida"),
    cp: Yup.string().matches(postalCodeRegex, 'El código postal no es válido').required('El código postal es obligatorio')
  })

export const presupuestos = {
    id:"",
}

export const foto = {
    id:"",
}

export const validationSchema = Yup.object({
    nombre: Yup.string().required("El nombre es obligatorio"),
    apellido: Yup.string().required("El apellido es obligatorio"),
    razon_social: Yup.string().required("Debe indicar el nombre de la empresa"),
    correo: Yup.string().email("El correo no es válido").required("El correo es obligatorio"),
    foto: Yup.mixed(),
});
import * as Yup from "yup";

export const initialValues = {
  nombre: "",
  tipo: "",
  documento: "",
  direccion: [],
  presupuestos: [],
  telefono: "",
  correo: "",
  pais: "",
  calle: "",
  ciudad: "",
  region: "",
  cp: "",
};

// export const direccion = {
//     pais: "",
//     calle: "",
//     ciudad: "",
//     region: "",
//     cp: "",
//     telefonod: "",
// }

const postalCodeRegex = /^[0-9]{5}$/;

// export const direccionSchema = Yup.object().shape({
//   pais: Yup.string().required("El pais es requerido"),
//   calle: Yup.string().required("La calle es requerida"),
//   ciudad: Yup.string().required("La ciudad es requerida"),
//   region: Yup.string().required("La region es requerida"),
//   cp: Yup.string()
//     .matches(postalCodeRegex, "El código postal no es válido")
//     .required("El código postal es obligatorio"),
//   telefonod: Yup.string()
//     .matches(
//       /^\+?\d(\s?\d\s?)*$/,
//       "El número telefónico debe tener 10 dígitos y solo contener números."
//     )
//     .required("El número telefónico es requerido."),
// });

// export const presupuestos = {
//   id: "",
// };

export const validationSchema = Yup.object({
  nombre: Yup.string().required("El nombre es obligatorio"),
  documento: Yup.string().required("Debe indicar el nombre de la empresa"),
  correo: Yup.string().email("El correo no es válido"),
  telefono: Yup.string()
    .matches(
      /^\+?\d(\s?\d\s?)*$/,
      "El número telefónico debe tener 10 dígitos y solo contener números."
    )
    .required("El número telefónico es requerido."),
  tipo: Yup.string().required("Debe especificar si es persona o empresa"),
  pais: Yup.string(),
  calle: Yup.string(),
  ciudad: Yup.string(),
  region: Yup.string(),
  cp: Yup.string()
    .matches(
      /^[0-9a-zA-Z]+$/,
      "El código postal solo puede contener letras y números."
    )
    .min(5, "El código postal debe tener al menos 5 caracteres.")
    .max(10, "El código postal no puede tener más de 10 caracteres.")
    .notRequired(), // Indica que este campo no es obligatorio
});

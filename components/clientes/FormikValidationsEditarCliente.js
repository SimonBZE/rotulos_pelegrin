import * as Yup from "yup";

export const initialValues = {
  firstname: "",
  lastname: "",
  email: "",
  rol: "",
  foto: [],
};

export const foto = {
  id: "",
};

export const validationSchema = Yup.object({
  firstname: Yup.string().required("El nombre es obligatorio"),
  lastname: Yup.string().required("El apellido es obligatorio"),
  email: Yup.string()
    .email("El correo no es válido")
    .required("El correo es obligatorio"),
  rol: Yup.string().required("El rol es obligatorio"),
  foto: Yup.mixed(),
});

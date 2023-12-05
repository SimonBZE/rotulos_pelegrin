import * as Yup from "yup";

export const initialValues = {
    firstname: "",
    lastname:"",
    username:"",
    email:"",
    password:"",
    role:"",
    rol:"",
    foto:[]
}

export const foto = {
    id:"",
}

export const validationSchema = Yup.object({
    firstname: Yup.string().required("El nombre es obligatorio"),
    lastname: Yup.string().required("El apellido es obligatorio"),
    username: Yup.string().required("El nombre de usuario es obligatorio"),
    email: Yup.string().email("El correo no es válido").required("El correo es obligatorio"),
    password: Yup.string().required("La contraseña es obligatoria").min(6, "La contraseña debe tener al menos 6 caracteres"),
    role: Yup.string().required("El rol es obligatorio"),
    rol: Yup.string().required("El rol es obligatorio"),
    foto: Yup.mixed(),
});
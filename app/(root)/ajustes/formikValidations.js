import * as Yup from 'yup';

export const validationSchema= Yup.object({
    email: Yup.string().email('No es un correo válido').required(true),
    firstname: Yup.string().required('El nombre es obligatorio'),
    lastname: Yup.string().required('El apellido es obligatorio'),
})

import * as Yup from 'yup';

export const validationSchema= Yup.object({
    email: Yup.string().email('No es un correo válido').required(true),
    firstname: Yup.string().required('El nombre es obligatorio'),
    lastname: Yup.string().required('El apellido es obligatorio'),
})

export const passwordValidationSchema = Yup.object({
    currentPassword: Yup.string().required('La contraseña actual es obligatoria'),
    password: Yup.string().required('La contraseña es obligatoria').min(6, 'La contraseña debe tener al menos 6 caracteres'),
    passwordConfirmation: Yup.string().oneOf([Yup.ref('password'), null], 'Las contraseñas deben coincidir').required('La confirmación de la contraseña es obligatoria'),
})

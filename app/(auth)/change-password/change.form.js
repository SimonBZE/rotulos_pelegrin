import * as Yup from 'yup'

export function initialValues() {
    return {
        password:"",
        passwordConfirmation:"",
    }
}

export function validationSchema(){
    return Yup.object({
        password: Yup.string().min(6, 'La contraseña debe tener al menos 6 caracteres').required(true),
        passwordConfirmation: Yup.string().oneOf([Yup.ref('password'), null], 'Las contraseñas deben coincidir').required(true),
    })
}
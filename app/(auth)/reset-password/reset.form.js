import * as Yup from 'yup'

export function initialValues() {
    return {
        email: '',
    }
}

export function validationSchema(){
    return Yup.object({
        email: Yup.string().email('No es un correo válido').required(true),
    })
}
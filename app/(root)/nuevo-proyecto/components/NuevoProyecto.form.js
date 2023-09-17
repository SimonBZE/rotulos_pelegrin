import * as Yup from 'yup';

export function initialValues() {
    return {
        nombre: "",
        presupuesto: "",
        cliente: "",
        contacto: "",
        aprovacion: "",
        prioridad: "",
        Descripcion: "",
        Diseno: [],
        Impresion: [],
        Corte: [],
        cerrajeria: [],
        pintura: [],
        Montaje: [],
    }
}

export function validationSchema(){
    return Yup.object({
        nombre: Yup.string().required(true),
        presupuesto: Yup.string().required(true),
        cliente: Yup.string().required(true),
        contacto: Yup.number().min(7, 'muy corto').required(true),
        aprovacion: Yup.boolean().required(true),
        prioridad: Yup.string().required(true),
        Descripcion: Yup.string().required(true),
    })
}
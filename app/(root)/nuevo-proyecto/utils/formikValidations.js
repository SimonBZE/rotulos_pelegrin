import * as Yup from "yup";

export const initialValues = {
  nombre: "",
  cliente: "",
  contacto: "",
  aprovacion: false,
  prioridad: "",
  fecha: "",
  descripcion: "",
  puesta_en_marcha: false,
  diseno: [],
  impresion: [],
  corte: [],
  cerrajeria: [],
  pintura: [],
  montaje: [],
  cover: [],
};

export const disenoSchema = Yup.object().shape({
  horas: Yup.number()
    .required("Horas es requerido")
    .min(1, "Debe ser al menos 1 hora"),
  unidades: Yup.number()
    .required("Unidades es requerido")
    .min(1, "Debe ser al menos 1 unidad"),
  precio: Yup.number()
    .required("Precio es requerido")
    .min(0, "El precio no puede ser negativo"),
});

export const printSchema = Yup.object().shape({
  nombre: Yup.string(),
  ancho: Yup.string(),
  alto: Yup.string(),
  profundo: Yup.string(),
  material: Yup.string(),
  laminacion: Yup.string(),
  imagenes: Yup.mixed(),
  precio: Yup.number(),
});

export const cutSchema = Yup.object().shape({
  nombre: Yup.string(),
  ancho: Yup.number(),
  alto: Yup.number(),
  profundo: Yup.number(),
  material: Yup.string(),
  laminacion: Yup.string(),
  imagenes: Yup.mixed(),
  precio: Yup.number(),
});

export const newDesign = {
  unidades: "",
  horas: "",
  precio: "",
  imagenes: [],
};

export const newPrint = {
  nombre: "",
  ancho: "",
  alto: "",
  profundo: "",
  material: "",
  laminacion: "",
  imagenes: [],
  precio: "",
};

export const newCut = {
  nombre: "",
  ancho: "",
  alto: "",
  profundo: "",
  material: "",
  laminacion: "",
  imagenes: [],
  precio: "",
};

export const validationSchema = Yup.object({
  nombre: Yup.string().required("Debe añadir un nombre al presupuesto"),
  cliente: Yup.string().required("Debe añadir el nombre del cliente"),
  contacto: Yup.number().required("Debe añadir un número de contacto"),
  aprovacion: Yup.boolean(),
  prioridad: Yup.string().required("Debe elegir el nivel de prioridad"),
  fecha: Yup.date().required("Debe establecer una fecha de entrega"),
  descripcion: Yup.string(),
  puesta_en_marcha: Yup.boolean(),
  diseno: Yup.array().of(disenoSchema),
  impresion: Yup.array().of(printSchema),
  corte: Yup.array().of(cutSchema),
  cover: Yup.mixed(),
});

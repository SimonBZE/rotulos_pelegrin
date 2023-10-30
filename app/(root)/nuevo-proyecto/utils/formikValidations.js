import * as Yup from "yup";

export const initialValues = {
  nombre: "",
  cliente: "",
  contacto: "",
  aprovacion: false,
  prioridad: "",
  fecha: "",
  hora:"",
  descripcion: "",
  puesta_en_marcha: false,
  departamento:"",
  diseno: [],
  impresion: [],
  corte: [],
  cerrajeria: [],
  pintura: [],
  montaje: [],
  videos: [],
  fotos: [],
  audios: [],
};

export const disenoSchema = Yup.object().shape({
  horas: Yup.number()
    .required("Horas es requerido")
    .min(1, "Debe ser al menos 1 hora"),
  unidades: Yup.number()
    .required("Unidades es requerido")
    .min(1, "Debe ser al menos 1 unidad"),
  cantidad: Yup.number()
    .required("Cantidad es requerido")
    .min(1, "Debe ser al menos 1 unidad"),
  precio: Yup.number()
    .required("Precio es requerido")
    .min(0, "El precio no puede ser negativo"),
});

export const printSchema = Yup.object().shape({
  nombre: Yup.string().required("Debe agregar un nombre"),
  ancho: Yup.number()
    .required("Debe agregar un ancho")
    .moreThan(0, 'Ancho debe ser mayor que 0'),
  alto: Yup.number()
    .required("Debe de agregar un alto")
    .moreThan(0, 'Alto debe ser mayor que 0'),
  material: Yup.string().required("Debe elegir un material"),
  laminacion: Yup.string(),
  imagenes: Yup.mixed(),
  precio: Yup.number()
    .required("Precio no puede estar vacio")
    .min(0, "Precio no puede ser negativo"),
  cantidad: Yup.number().required('Debe poner una cantidad').min(1, 'Debe ser al menos 1 unidad')
});

export const cutSchema = Yup.object().shape({
  nombre: Yup.string().required("Debe agregar un nombre"),
  alto: Yup.number()
    .required("Alto es requerido")
    .moreThan(0, 'Alto debe ser mayor que 0'),
  ancho: Yup.number()
    .required("Ancho es requerido")
    .moreThan(0, 'Ancho debe ser mayor que 0'),
  material: Yup.string().required("Debe de elegir un material"),
  cantidad: Yup.number()
    .required("Corte: Cantidad es requerido")
    .min(1, "No puede ser inferior a 1"),
  imagenes: Yup.mixed(),
  precio: Yup.number()
    .required("Corte: El precio es un valor requerido")
    .min(0, "No se permiten valores negativos"),
});

export const lockAditionalSchema = Yup.object().shape({
  nombre: Yup.string().required("Nombre es requerido"),
  precio: Yup.number()
    .required("Precio es requerido")
    .min(0, "Precio no puede ser negativo"),
});

export const locksmithSchema = Yup.object().shape({
  nombre: Yup.string().required("Debe agregar un nombre"),
  ancho: Yup.number()
    .required("Ancho es requerido")
    .moreThan(0, 'Ancho debe ser mayor que 0'),
  alto: Yup.number()
    .required("Alto es requerido")
    .moreThan(0, 'Alto debe ser mayor que 0'),
  grosor: Yup.number()
    .required("Grosor es requerido")
    .moreThan(0, 'Grosor debe ser mayor que 0'),
  material: Yup.string().required("Debe de elegir un material"),
  horas_fabricacion: Yup.number()
    .required("Es requerido")
    .min(0.1, "Horas no pueden ser inferiores a 1"),
  cantidad: Yup.number().required('Debe ingresar una cantidad').min(1, 'La cantidad minima es 1')
    .required("Cantidad es requerido")
    .min(1, "No puede ser inferior a 1"),
  precio: Yup.number().required("Debe de tener un precio").min(0, "Precio no puede ser negativo")
    .required("Cantidad es requerido")
    .min(0, "No se permiten valores negativos"),
  adicional: Yup.array().of(lockAditionalSchema),
  imagenes: Yup.mixed(),
});

export const paintSchema = Yup.object().shape({
  nombre: Yup.string().required("Nombre es requerido"),
  ancho: Yup.number()
    .required("Ancho es requedido")
    .moreThan(0, 'Ancho debe ser mayor que 0'),
  alto: Yup.number()
    .required("Alto es requerido")
    .moreThan(0, 'Alto debe ser mayor que 0'),
  lijado: Yup.boolean(),
  material: Yup.string().required("Material es requerido"),
  precio: Yup.number()
    .required("Precio es requerido")
    .min(0, "Precio no puede ser negativo"),
  cantidad: Yup.number()
    .required("Cantidad es requerida")
    .min(1, "La cantidad minima es 1"),
});

export const mountingAditionalSchema = Yup.object().shape({
  nombre: Yup.string().required("Debe especificar un nombre"),
  precio: Yup.number()
    .required("Debe indicar el precio")
    .min(1, "1€ es el valor mínimo"),
});

export const mountingSchema = Yup.object().shape({
  tiempo_montaje: Yup.number()
    .required("Debe indicar el tiempo de montaje")
    .min(1, "tiempo de montaje no puede ser inferior a 1 hora"),
  desplazamiento: Yup.number()
    .required("Debe indicar el tiempo de desplazamiento")
    .min(0, "tiempo de desplazamiento no puede ser negativo"),
  imagenes: Yup.mixed(),
  precio: Yup.number()
    .required("Debe indicar el total")
    .min(0, "Total no puede ser negativo"),
  cantidad: Yup.number()
  .required("Cantidad es requerida")
  .min(1, "La cantidad minima es 1"),
  alquiler_maquinaria: Yup.number().min(0, 'No puede ser negativo'),
  adicional: Yup.array().of(mountingAditionalSchema),
});

export const newDesign = {
  unidades: "",
  horas: "",
  precio: 0,
  imagenes: [],
  cantidad: 1,
};

export const newPrint = {
  nombre: "",
  ancho: "",
  alto: "",
  material: "",
  imagenes: [],
  precio: 0,
  cantidad: 1,
};

export const newCut = {
  nombre: "",
  alto: "",
  ancho: "",
  material: "",
  imagenes: [],
  precio: 0,
  cantidad: 1,
};

export const newLockSmith = {
  nombre: "",
  ancho: "",
  alto: "",
  grosor: "",
  material: "",
  horas_fabricacion: "",
  adicional: [],
  cantidad: 1,
  precio: 0,
  imagenes: [],
};

export const newLockAditional = {
  nombre: "",
  precio: 0,
};

export const newPaint = {
  nombre: "",
  ancho: "",
  alto: "",
  lijado: false,
  material: "",
  precio: 0,
  cantidad: 1,
};

export const newMounting = {
  tiempo_montaje: "",
  desplazamiento: "",
  alquiler_maquinaria: 0,
  adicional: [],
  imagenes: [],
  precio: 0,
  cantidad: 1,
};

export const newMountingAditional = {
  nombre: "",
  precio: 0,
};

export const validationSchema = Yup.object({
  nombre: Yup.string().required("Debe añadir un nombre al presupuesto"),
  cliente: Yup.string().required("Debe añadir el nombre del cliente"),
  contacto: Yup.string().required("Debe añadir un número de contacto").min(8, 'Debe tener minimo 8 caracteres'),
  aprovacion: Yup.boolean(),
  prioridad: Yup.string().required("Debe elegir el nivel de prioridad"),
  fecha: Yup.date().required("Debe establecer una fecha de entrega"),
  hora: Yup.string().required("Debe establecer una hora de entrega"),
  descripcion: Yup.string(),
  puesta_en_marcha: Yup.boolean(),
  departamento: Yup.string(),
  diseno: Yup.array().of(disenoSchema),
  impresion: Yup.array().of(printSchema),
  corte: Yup.array().of(cutSchema),
  cerrajeria: Yup.array().of(locksmithSchema),
  pintura: Yup.array().of(paintSchema),
  montaje: Yup.array().of(mountingSchema),
  videos: Yup.mixed(),
  fotos: Yup.mixed(),
  audios: Yup.mixed(),
});

import { useEffect, useState } from "react";
import {
  Button,
  Select,
  SelectItem,
  Input,
} from "@nextui-org/react";
import { useFormik } from "formik";
import { initialValues, validationSchema } from "./FormikValidationsCliente";
import { Client } from "@/api/client";
import { toast } from "react-toastify";

import { TipoCliente } from "@/utils/menus";
import { paises } from "@/utils/paises"

const clientCtrl = new Client();

export const ModalEditarCliente = ({ onClose, id, getClients:updateClient }) => {
  const [cliente, setCliente] = useState({});

  const getClient = async () => {
    try {
      const { data } = await clientCtrl.getClient(id);
      setCliente(data);
      formik.setValues({
        nombre: data.attributes.nombre || "",
        tipo: data.attributes.tipo || "",
        correo: data.attributes.correo || "",
        documento: data.attributes.documento || "",
        pais: data.attributes.pais || "",
        calle: data.attributes.calle || "",
        ciudad: data.attributes.ciudad || "",
        region: data.attributes.region || "",
        cp: data.attributes.cp || "",
        telefono: data.attributes.telefono || "",
      })
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  useEffect(() => {
    if (!cliente.id) {
      getClient(id);
    }
  }, [cliente.id, id]);

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (formData) => {
      try {
        const data = await clientCtrl.updateClient(formData, id);
        updateClient()
        onClose();    
        notify("Cliente actualizado", "success");
        
        
      } catch (error) {
        console.log(error);
        notify("Error al actualizar", "error");
      }
    },
  });

  const notify = (mensaje, type = "") =>
    type === "" ? toast(mensaje) : toast[type](mensaje);
  return (
    <div>
      
      <form className="flex flex-col gap-3" onSubmit={formik.handleSubmit}>
        <div className="flex flex-col sm:flex-row gap-3">
          <Input
            variant="bordered"
            type="text"
            name="nombre"
            label="Nombre"
            value={formik.values.nombre}
            onChange={formik.handleChange}
            isInvalid={
              formik.touched.nombre && formik.errors.nombre ? true : false
            }
          />

          <Input
            variant="bordered"
            type="text"
            name="documento"
            label="NIF del contacto"
            value={formik.values.documento}
            onChange={formik.handleChange}
            isInvalid={
              formik.touched.documento && formik.errors.documento ? true : false
            }
          />
    
          <Select
            variant="bordered"
            label="Empresa o persona"
            className="md:w-[50%]"
            name="tipo"
            selectedKeys={formik.values.tipo ? [formik.values.tipo] : ""}
            value={formik.values.tipo}
            onChange={formik.handleChange}
            isInvalid={formik.touched.tipo && formik.errors.tipo ? true : false}
          >
            {TipoCliente.map((tipo) => (
              <SelectItem className="capitalize" key={tipo} value={tipo}>
                {tipo}
              </SelectItem>
            ))}
          </Select>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <Input
            variant="bordered"
            type="email"
            name="correo"
            label="Correo electrónico"
            value={formik.values.correo}
            onChange={formik.handleChange}
            className="md:w-[50%]"
            isInvalid={
              formik.touched.correo && formik.errors.correo ? true : false
            }
          />
          <Input
            variant="bordered"
            type="text"
            label="Teléfono"
            name="telefono"
            value={formik.values.telefono}
            onChange={formik.handleChange}
            className="md:w-[50%]"
            isInvalid={
              formik.touched.telefono && formik.errors.telefono ? true : false
            }
          />
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <Input
            variant="bordered"
            type="text"
            name="calle"
            label="Dirección"
            value={formik.values.calle}
            onChange={formik.handleChange}
            isInvalid={
              formik.touched.calle && formik.errors.calle ? true : false
            }
          />
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <Input
            variant="bordered"
            type="text"
            name="ciudad"
            label="Ciudad"
            className="md:w-[50%]"
            value={formik.values.ciudad}
            onChange={formik.handleChange}
            isInvalid={
              formik.touched.ciudad && formik.errors.ciudad ? true : false
            }
          />
          <Input
            variant="bordered"
            type="text"
            name="cp"
            label="Código postal"
            className="md:w-[50%]"
            value={formik.values.cp}
            onChange={formik.handleChange}
            isInvalid={formik.touched.cp && formik.errors.cp ? true : false}
          />
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <Input
            variant="bordered"
            type="text"
            name="region"
            label="Provincia"
            className="md:w-[50%]"
            value={formik.values.region}
            onChange={formik.handleChange}
            isInvalid={
              formik.touched.region && formik.errors.region ? true : false
            }
          />
          <Select
            variant="bordered"
            label="País"
            className="md:w-[50%] capitalize"
            name="pais"
            value={formik.values.pais}
            selectedKeys={formik.values.pais ? [formik.values.pais] : ""}
            onChange={(e) => formik.setFieldValue('pais', e.target.value)}
            isInvalid={formik.touched.tipo && formik.errors.tipo ? true : false}
          >
            {paises.map(({ name: pais }) => (
              <SelectItem className="capitalize" key={pais} value={pais}>
                {pais}
              </SelectItem>
            ))}
          </Select>
        </div>
        <div className="flex gap-3 justify-end my-3">
          <Button color="danger" onClick={onClose}>
            Cancelar
          </Button>
          <Button type="submit" color="primary">
            Guardar
          </Button>
        </div>
      </form>
    </div>
  );
};

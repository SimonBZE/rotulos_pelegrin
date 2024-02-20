import { Button, Select, SelectItem, Input } from "@nextui-org/react";
import { useFormik } from "formik";
import { initialValues, validationSchema } from "./FormikValidationsCliente";
import { Client } from "@/api/client";
import { toast } from "react-toastify";

import { TipoCliente } from "@/utils/menus";
import { paises } from "@/utils/paises"

const clientCtrl = new Client();

export const ModalClientes = ({ onClose, getClients = "", actualizarCliente = ""}) => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (formData) => {
      try {
        const data = await clientCtrl.createClient(formData);

        
        if (data.error) {
          console.log(data);
          throw error;
        }
        notify("Se ha creado el usuario", "success");
        if(getClients !=="") {
          getClients();
        }

        if(actualizarCliente !== ""){
          actualizarCliente(data.data)

        }
          
        

        onClose();
      } catch (error) {
        console.log(error);
        notify("El cliente ya existe", "error");
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
            onChange={formik.handleChange}
            isInvalid={
              formik.touched.documento && formik.errors.documento ? true : false
            }
          />

          <Select
            variant="bordered"
            label="Empresa o persona"
            className="md:w-[50%] capitalize"
            name="tipo"
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
            
            onChange={formik.handleChange}
            isInvalid={formik.touched.tipo && formik.errors.tipo ? true : false}
          >
            {paises.map(({name:pais}) => (
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

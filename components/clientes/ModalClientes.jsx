import { useEffect, useState } from "react";
import { Button, Select, SelectItem, Input } from "@nextui-org/react";
import { useFormik } from "formik";
import { initialValues, validationSchema } from "./FormikValidationsCliente";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { User } from "@/api/user";
import { toast } from "react-toastify";
import { ImageUploader } from "@/components/ui";

import { roles } from "@/utils/menus";

const userCtrl = new User();

export const ModalClientes = ({ onClose, getUsers }) => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (formData) => {
      try {
        const data = await userCtrl.createUser(formData);
        if (!data.id) {
          throw error;
        }
        notify("Se ha creado el usuario", "success");
        getUsers()
        onClose();
      } catch (error) {
        console.log(error);
        notify("El correo o usuario ya existen", "error");
      }
    },
  });

  useEffect(() => {
    if (formik.errors.correo) return;
    const correo = formik.values.correo;
    const match = correo.match(/^(.+)@/);
    if (match) {
      const name = match[1];
      {
        formik.values.username = name;
        formik.values.role = 1;
        formik.values.confirmed = true;
      } // Esto imprimirá el nombre antes del @
    }
  }, [formik.values.correo]);

  const onUpload = (data) => {
    formik.values.foto = data;
  }

  const notify = (mensaje, type = "") =>
    type === "" ? toast(mensaje) : toast[type](mensaje);
  return (
    <div>
      <form className="flex flex-col gap-3" onSubmit={formik.handleSubmit}>
        <div className="flex flex-col sm:flex-row gap-3">
            <ImageUploader onUpload={onUpload} />
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <Input
            variant="bordered"
            type="text"
            name="firstname"
            label="Nombre"
            onChange={formik.handleChange}
            isInvalid={
              formik.touched.firstname && formik.errors.firstname ? true : false
            }
          />
          <Input
            variant="bordered"
            type="text"
            name="lastname"
            label="Apellido"
            onChange={formik.handleChange}
            isInvalid={
              formik.touched.lastname && formik.errors.lastname ? true : false
            }
          />
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
          <Select
            variant="bordered"
            label="Selecciona el departamento"
            className="md:w-[50%] capitalize"
            name="rol"
            isInvalid={formik.touched.rol && formik.errors.rol ? true : false}
            onChange={formik.handleChange}
          >
            {roles.map((rol) => (
              <SelectItem key={rol} value={rol} className="capitalize">
                {rol}
              </SelectItem>
            ))}
          </Select>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <Input
            variant="bordered"
            endContent={
              <button
                className="focus:outline-none"
                type="button"
                onClick={toggleVisibility}
              >
                {isVisible ? (
                  <IoEyeOffOutline className="text-2xl text-default-400 pointer-events-none" />
                ) : (
                  <IoEyeOutline className="text-2xl text-default-400 pointer-events-none" />
                )}
              </button>
            }
            type={isVisible ? "text" : "password"}
            name="password"
            label="Contraseña"
            onChange={formik.handleChange}
            isInvalid={
              formik.touched.password && formik.errors.password ? true : false
            }
          />
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

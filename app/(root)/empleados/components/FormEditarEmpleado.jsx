import { useCallback, useEffect, useState } from "react";
import { Button, Select, SelectItem, Input, user } from "@nextui-org/react";
import { useFormik } from "formik";
import { initialValues, validationSchema } from "./FormikValidationsEditarEmpleado";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { User } from "@/api/user";
import { toast } from "react-toastify";
import { ImageUploader } from "@/components/ui";

import { roles } from "@/utils/menus";

const userCtrl = new User();

export const FormEditarEmpleado = ({ onClose, getUsers, id }) => {
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);
  const [empleado, setEmpleado] = useState({});

  const getUser = async () => {
    try {
      const data = await userCtrl.getUser(id);
      setEmpleado(data);
      formik.values.firstname = data.firstname;
      formik.values.lastname = data.lastname;
      formik.values.email = data.email;
      formik.values.rol = data.rol;
      formik.values.foto = {
        id: data.foto.id,
        url: data.foto.url,
      };
    } catch (error) {
      return error;
    }
  };

  useEffect(() => {
    if (!empleado.id) {
      getUser(id);
    }
  }, [empleado.id, getUser, id]);

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (formData) => {
      try {
        const data = await userCtrl.updateMe(formData, id);
        if(!data.id){
            throw error;
        }
        notify("Empleado actualizado", "success");
        getUsers();
        onClose();
      } catch (error) {
        console.log(error);
        notify("Error al actualizar", "error");
      }
    },
  });

  useEffect(() => {
    if (formik.errors.email) return;
    const email = formik.values.email;
    const match = email.match(/^(.+)@/);
    if (match) {
      const name = match[1];
      {
        formik.values.role = 1;
      } // Esto imprimirá el nombre antes del @
    }
  }, [formik.values.email, formik.errors.email, formik.values]);

  const onUpload = (data) => {
    formik.values.foto = data;
  };

  const notify = (mensaje, type = "") =>
    type === "" ? toast(mensaje) : toast[type](mensaje);
  return (
    <div>
      <form className="flex flex-col gap-3" onSubmit={formik.handleSubmit}>
        <div className="flex flex-col sm:flex-row gap-3">
          <ImageUploader onUpload={onUpload} foto={formik.values.foto } />
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <Input
            variant="bordered"
            type="text"
            name="firstname"
            label="Nombre"
            value={formik.values.firstname}
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
            value={formik.values.lastname}
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
            name="email"
            label="Correo electrónico"
            value={formik.values.email}
            onChange={formik.handleChange}
            className="md:w-[50%]"
            isInvalid={
              formik.touched.email && formik.errors.email ? true : false
            }
          />
          <Select
            variant="bordered"
            label="Selecciona el departamento"
            className="md:w-[50%] capitalize"
            name="rol"
            selectedKeys={
              roles.includes(formik.values.rol) ? [formik.values.rol] : []
            }
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
        {/* <div className="flex flex-col sm:flex-row gap-3">
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
        </div> */}
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

import { useFormik } from "formik";
import { passwordValidationSchema } from "../formikValidations";
import { RiLockPasswordLine } from "react-icons/ri";
import { toast } from "react-toastify";
import { User as Me } from "@/api/user";
import { useState, useEffect } from "react";

const authUserCtrl = new Me();

const initialValues = {
  currentPassword: "",
  password: "",
  passwordConfirmation: "",
};

export const Contrasena = () => {
  const [sendForm, setSendForm] = useState(true);

  const formik = useFormik({
    initialValues,
    validationSchema: passwordValidationSchema,
    onSubmit: async (formData) => {
      try {
        const response = await authUserCtrl.changePassword(formData);

        if (response.error) {
          throw new Error(response.error);
        }

        formik.resetForm();
        notify("Contraseña cambiada correctamente", "success");
      } catch (error) {
        notify("Error al cambiar la contraseña", "error");
      }
    },
  });

  useEffect(() => {
    setSendForm(!formik.isValid);
  }, [formik.isValid]);

  const notify = (mensaje, type = "") =>
    type === "" ? toast(mensaje) : toast[type](mensaje);

  return (
    <div className="mt-5 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
        <h3 className="font-medium text-black dark:text-white">
          Cambiar contraseña
        </h3>
      </div>
      <div className="p-7">
        <p className="mb-3">
          La contraseña debe tener al menos seis caracteres e incluir una
          combinación de números, letras y caracteres especiales (!$@%).
        </p>
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-5.5 flex flex-col gap-5.5">
            <div className="w-full">
              <div className="relative">
                <span className="absolute left-4.5 top-4">
                  <RiLockPasswordLine />
                </span>
                <input
                  className={`formulario-icon ${
                    formik.touched.currentPassword &&
                    formik.errors.currentPassword
                      ? "errores"
                      : null
                  }`}
                  type="password"
                  name="currentPassword"
                  placeholder="Contraseña actual"
                  value={formik.values.currentPassword}
                  onChange={formik.handleChange}
                />
              </div>
            </div>

            <div className="w-full">
              <div className="relative">
                <span className="absolute left-4.5 top-4">
                  <RiLockPasswordLine />
                </span>
                <input
                  className={`formulario-icon ${
                    formik.touched.password && formik.errors.password
                      ? "errores"
                      : null
                  }`}
                  type="password"
                  name="password"
                  placeholder="Nueva contraseña"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                />
              </div>
            </div>
            <div className="w-full">
              <div className="relative">
                <span className="absolute left-4.5 top-4">
                  <RiLockPasswordLine />
                </span>
                <input
                  className={`formulario-icon ${
                    formik.touched.passwordConfirmation &&
                    formik.errors.passwordConfirmation
                      ? "errores"
                      : null
                  }`}
                  type="password"
                  name="passwordConfirmation"
                  placeholder="Confirmar contraseña"
                  value={formik.values.passwordConfirmation}
                  onChange={formik.handleChange}
                />
              </div>
            </div>
            <div className="flex justify-end gap-4.5">
              <button
                className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-95 disabled:opacity-25"
                type="submit"
                disabled={sendForm}
              >
                Guardar
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

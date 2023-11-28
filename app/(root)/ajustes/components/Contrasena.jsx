import { useFormik } from "formik";
import { passwordValidationSchema } from "../formikValidations";
import { RiLockPasswordLine } from "react-icons/ri";


export const Contrasena = () => {
  const formik = useFormik({
    initialValues: {
      password: "",
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: passwordValidationSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <div className="mt-5 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
        <h3 className="font-medium text-black dark:text-white">
          Cambiar contraseña
        </h3>
      </div>
      <div className="p-7">
        <p className="mb-3">La contraseña debe tener al menos seis caracteres e incluir una combinación de números, letras y caracteres especiales (!$@%).</p>
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-5.5 flex flex-col gap-5.5">
            <div className="w-full">
              
              <div className="relative">
                <span className="absolute left-4.5 top-4">
                <RiLockPasswordLine />
                </span>
                <input
                  className="formulario-icon"
                  type="password"
                  name="password"
                  placeholder="Contraseña actual"
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
                  className="formulario-icon"
                  type="password"
                  name="newPassword"
                  placeholder="Nueva contraseña"
                  value={formik.values.newPassword}
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
                  className="formulario-icon"
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirmar contraseña"
                  value={formik.values.confirmPassword}
                  onChange={formik.handleChange}
                />
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

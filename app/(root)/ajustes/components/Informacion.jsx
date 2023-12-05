
import { validationSchema } from "../formikValidations";
import { useFormik } from "formik";
import { useAuth } from "@/context/AuthContext";
import { User } from "@/api/user";
import { toast } from "react-toastify";
import { FiUser, FiMail } from "react-icons/fi";
import { ImageUploader } from "@/components/ui";

const userCtrl = new User();

export const Informacion = () => {
  const { user, reloadUser } = useAuth();

  const formik = useFormik({
    initialValues: user,
    validationSchema: validationSchema,
    onSubmit: async (formValue) => {
      try {
        const response = await userCtrl.updateMe(formValue, user.id);

        if (response.error) {
          throw new Error(response.error);
        }
        reloadUser();
      } catch (error) {
        notify("El correo ya existe, por favor ingrese otro correo", "error");
        console.log(error);
      }
    },
  });

  const onUpload = (data) => {
    formik.values.foto = data;
  };

  const notify = (mensaje, type = "") =>
    type === "" ? toast(mensaje) : toast[type](mensaje);
  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
        <h3 className="font-medium text-black dark:text-white">
          Información personal
        </h3>
      </div>
      <div className="p-7">
        <form  onSubmit={formik.handleSubmit}>
          <div className="mb-5">
            <ImageUploader onUpload={onUpload} foto={user?.foto} />
          </div>
          <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
            <div className="w-full sm:w-1/2">
              <label
                className="mb-3 block text-sm font-medium text-black dark:text-white"
                htmlFor="firstname"
              >
                Nombre
              </label>
              <div className="relative">
                <span className="absolute left-4.5 top-4">
                  <FiUser />
                </span>
                <input
                  className="formulario-icon"
                  type="text"
                  name="firstname"
                  placeholder="Nombre"
                  value={formik.values?.firstname}
                  onChange={formik.handleChange}
                />
              </div>
            </div>

            <div className="w-full sm:w-1/2">
              <label
                className="mb-3 block text-sm font-medium text-black dark:text-white"
                htmlFor="lastname"
              >
                Apellido
              </label>
              <div className="relative">
                <span className="absolute left-4.5 top-4">
                  <FiUser />
                </span>
                <input
                  className="formulario-icon"
                  type="text"
                  name="lastname"
                  placeholder="Apellido"
                  value={formik.values?.lastname}
                  onChange={formik.handleChange}
                />
              </div>
            </div>
          </div>

          <div className="mb-5.5">
            <label
              className="mb-3 block text-sm font-medium text-black dark:text-white"
              htmlFor="email"
            >
              Correo
            </label>
            <div className="relative">
              <span className="absolute left-4.5 top-4">
                <FiMail />
              </span>
              <input
                className="formulario-icon"
                type="email"
                name="email"
                placeholder="correo"
                value={formik.values?.email}
                onChange={formik.handleChange}
              />
            </div>
          </div>

          <div className="flex justify-end gap-4.5">
            <button
              className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-95"
              type="submit"
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

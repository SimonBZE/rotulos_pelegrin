"use client";

import Image from "next/image";
import { buttonVariants } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import { initialValues, validationSchema } from "./SignIn.form";
import { Auth } from "@/api/auth";
import { useAuth } from "@/hooks/useAuth";



const authCtrl = new Auth();

function page() {
  const router = useRouter();
  const {login, user} = useAuth();  
  
  if (user) {
    router.push("/");
    return null;
  }
  
  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validationOnChange: false,
    onSubmit: async (formValue) => {
      try {
        const response = await authCtrl.login(formValue);
        login(response.jwt)
        router.push('/')
      } catch (error) {
        console.error(error);
      }
    },
  });

  return (
    
      <div className="px-5 flex min-h-full flex-1 flex-col justify-center py-12 lg:px-8">
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <h1 className="text-center text-2xl text-gray-500 mb-5 text-black">
            Bienvenido
          </h1>
          <form
            onSubmit={formik.handleSubmit}
            className="space-y-6"
            action="#"
            method="POST"
          >
            <div>
              <div className="mt-2 relative">
                <input
                  id="identifier"
                  name="identifier"
                  type="text"
                  placeholder="Usuario ó Correo"
                  value={formik.values.identifier}
                  onChange={formik.handleChange}
                  className={`formulario ${
                    formik.errors.identifier && formik.touched.identifier
                      ? "border-danger"
                      : null
                  }`}
                  // className={`px-6 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${formik.errors.identifier && formik.touched.identifier ? 'border-danger' : null}`}
                />
                <Image
                  className="absolute right-3 top-[8px] w-5 h-5"
                  src="/assets/user-icon.svg"
                  alt="icono contraseña"
                  width={30}
                  height={30}
                />
              </div>
            </div>

            <div>
              <div className="mt-2 relative">
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  placeholder="Contraseña"
                  className={`formulario ${
                    formik.errors.password && formik.touched.password
                      ? "border-danger"
                      : null
                  }`}
                  // className={`px-6 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${formik.errors.password && formik.touched.password ? 'border-danger' : null}`}
                />
                <Image
                  className="absolute right-3 top-[10px] w-6"
                  src="/assets/password-icon.svg"
                  alt="icono contraseña"
                  width={30}
                  height={30}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className={`${buttonVariants({
                  variant: "default",
                })} w-full text-white font-bold uppercase`}
                disabled={formik.isSubmitting}
              >
                Iniciar Sesión
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            <a
              href="#"
              className="font-semibold text-blue-600 hover:text-indigo-500"
            >
              ¿Olvidó la contraseña?
            </a>
          </p>
        </div>
      </div>
    
  );
}

export default page;

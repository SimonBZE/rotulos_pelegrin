'use client'
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { buttonVariants } from "@/components/ui/button";
import { useFormik } from "formik";
import { initialValues, validationSchema } from "./change.form.js";
import { Auth } from "@/api/auth";
import Link from "next/link";

const authCtrl = new Auth();

export default function ChangePassword() {
  const router = useRouter();
  const params = useSearchParams();

  

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validationOnChange: false,
    onSubmit: async (formValue) => {
        formValue.code = params.get("code")
      try {
        const response = await authCtrl.changePassword(formValue);

        router.push("/sign-in");

      } catch (error) {
        console.error('error', error);
      }
    },
  })

  return (
    <div className="px-5 flex min-h-full flex-1 flex-col justify-center py-12 lg:px-8">
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <h1 className="text-center text-2xl text-gray-500 mb-5 text-black">
          Establecer nueva contraseña
        </h1>
        <p>Ingrese la nueva contraseña que va a asignar a su cuenta </p>
        <form
          onSubmit={formik.handleSubmit}
          className="space-y-6"
          action="#"
          method="POST"
        >
          <div>
            <div className="mt-2 relative">
              <input
                id="password"
                name="password"
                type="password"
                placeholder="Contraseña"
                value={formik.values.email}
                onChange={formik.handleChange}
                className={`formulario ${
                    formik.errors.password && formik.touched.password
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
            <div className="mt-2 relative">
              <input
                id="passwordConfirmation"
                name="passwordConfirmation"
                type="password"
                placeholder="Repita la contraseña"
                value={formik.values.email}
                onChange={formik.handleChange}
                className={`formulario ${
                    formik.errors.passwordConfirmation && formik.touched.passwordConfirmation
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
            <button
              type="submit"
              className={`${buttonVariants({
                variant: "default",
              })} w-full text-white font-bold uppercase`}
              disabled={formik.isSubmitting}
            >
              Cambiar contraseña
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          <Link
            href="/sign-in"
            className="font-semibold text-blue-600 hover:text-indigo-500"
          >
            Volver
          </Link>
        </p>
      </div>
    </div>
  )
}

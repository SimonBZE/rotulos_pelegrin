'use client'
import Image from "next/image";
import { useRouter } from "next/navigation";
import { buttonVariants } from "@/components/ui/button";
import { useFormik } from "formik";
import { initialValues, validationSchema } from "./reset.form.js";
import { Auth } from "@/api/auth";
import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";

const authCtrl = new Auth();

export default function ResetPassword() {
  const router = useRouter();

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validationOnChange: false,
    onSubmit: async (formValue) => {
      try {
        const response = await authCtrl.resetPassword(formValue);

        router.push("/email-success");

      } catch (error) {
        console.error(error);
      }
    },
  })

  return (
    <div className="px-5 flex min-h-full flex-1 flex-col justify-center py-12 lg:px-8">
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <h1 className="text-center text-2xl text-gray-500 mb-5 text-black">
          ¿Olvidó su contraseña?
        </h1>
        <p>Ingresa tu correo y te enviaré un enlace para reestablecer tu contraseña</p>
        <form
          onSubmit={formik.handleSubmit}
          className="space-y-6"
          action="#"
          method="POST"
        >
          <div>
            <div className="mt-2 relative">
              <input
                id="email"
                name="email"
                type="email"
                placeholder="Correo electrónico"
                value={formik.values.email}
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
            <button
              type="submit"
              className={`${buttonVariants({
                variant: "default",
              })} w-full text-white font-bold uppercase`}
              disabled={formik.isSubmitting}
            >
              Recuperar contraseña
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

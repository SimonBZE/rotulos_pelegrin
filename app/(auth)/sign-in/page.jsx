import {buttonVariants} from '@/components/ui/button'

function page() {
  return (
    <div className='px-5 flex min-h-full flex-1 flex-col justify-center py-12 lg:px-8'>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <h1 className='text-center text-2xl text-gray-500 mb-5'>Bienvenido</h1>
          <form className="space-y-6" action="#" method="POST">
            <div>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder='Usuario ó Correo'
                  autoComplete="email"
                  required
                  className="px-6 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  placeholder='Contraseña'
                  className="px-6 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className={`${buttonVariants({ variant: "default" })} w-full`}
              >
                Iniciar Sesión
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            
            <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                    ¿Olvidó la contraseña?
            </a>
          </p>
        </div>
      
    </div>
  )
}

export default page
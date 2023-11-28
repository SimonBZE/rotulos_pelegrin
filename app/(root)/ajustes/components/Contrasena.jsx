import React from "react";

export const Contrasena = () => {
  return (
    <div className="grid grid-cols-5 gap-8 mt-5">
      <div className="col-span-5 xl:col-span-3">
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
            <h3 className="font-medium text-black dark:text-white">
              Contraseá
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
};

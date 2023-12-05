import { Skeleton } from "@nextui-org/react";

function loading() {
  return (
    <>
      <div className="flex flex-col justify-between mb-3 xsm:flex-row gap-3">
        <div>
          <h2 className="text-title-md font-semibold text-black dark:text-white">
            Empleados
          </h2>
        </div>
        <div className="flex gap-3 items-center">
          <Skeleton className="h-8 w-50 rounded-lg" />
        </div>
      </div>
      <div>
        <Skeleton className="h-180 w-full rounded-lg" />
      </div>
    </>
  );
}

export default loading;

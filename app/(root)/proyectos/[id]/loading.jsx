import { Skeleton } from "@nextui-org/react";

export default function loading() {
  return (
    <>
      <div className="flex flex-col gap-5 sm:flex-row justify-between items-center mb-5 p-5">
        <div className="flex items-center gap-3">
          <Skeleton className="w-[40px] h-[40px]" />
          <Skeleton className="h-9 w-60" />
        </div>
        <Skeleton className="w-65 h-9" />
      </div>
      <div className="flex flex-col gap-3">
        {[...Array(5)].map((_, index) => (
          <Skeleton key={index} className="h-45 w-full rounded-lg" />
        ))}
      </div>
    </>
  );
}

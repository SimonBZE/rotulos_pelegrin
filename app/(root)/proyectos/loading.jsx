import { Skeleton } from "@nextui-org/react";
import React from "react";

export default function loading() {
  return (
    <div className="w-full grid grid-cols-2 gap-5 md:grid-cols-3 mt-5">
      <Skeleton className="rounded-xl p-5 h-[176px]" />

      <Skeleton className="rounded-xl p-5 h-[176px]" />

      <Skeleton className="rounded-xl p-5 h-[176px]" />

      <Skeleton className="rounded-xl p-5 h-[176px]" />

      <Skeleton className="rounded-xl p-5 h-[176px]" />

      <Skeleton className="rounded-xl p-5 h-[176px]" />
    </div>
  );
}

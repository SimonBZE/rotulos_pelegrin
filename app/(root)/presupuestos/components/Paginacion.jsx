import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {Pagination} from "@nextui-org/react";

export const Paginacion = ({paginacion}) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handlePagination = (page) => {
    const params = new URLSearchParams(searchParams);
    if (page > 1) {
      params.set("page", page);
    } else {
      params.delete("page");
    }
    replace(`${pathname}?${params.toString()}`);
  };


  return (
    <div className="flex w-full justify-center bg-w">
      <Pagination
        showShadow
        color="primary"
        showControls
        isCompact
        total={paginacion.pageCount}
        classNames={{
          item: "bg-white",
          pre: "bg-white",
          next: "bg-white",
        }}
        initialPage={Number(searchParams.get("page")) || 1}
        onChange={(page) => handlePagination(page)}
      />
    </div>
  );
};

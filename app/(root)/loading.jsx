import Loader from "@/components/common/Loader";

export default function loading() {
  return (
    <div className="h-full flex justify-center items-center">
      <Loader tamano="50px" />
    </div>
  );
}

import Loader from "@/components/common/Loader"

function loading() {
  return (
    <div className="flex h-[calc(100vh-100px)] justify-center items-center">
      <Loader tamano={'50px'} />
    </div>
  )
}

export default loading
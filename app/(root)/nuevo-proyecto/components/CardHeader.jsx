
export const CardHeader = ( {handleRemove} ) => {
  return (
    <div className="flex justify-end">
        <a
          className="rounded-full mb-5 px-[12px] py-[5px]  bg-bodydark text-white"
          onClick={handleRemove}
        >
          X
        </a>
      </div>
  )
}

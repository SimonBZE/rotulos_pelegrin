
export const Design = ({eliminarDiseno, idKey}) => {
  return (
    <div className="rounded-md bg-[#6E5FFF30] mt-5 p-3">

        <div className="flex justify-end">
        <a className="rounded-full mb-5 px-[12px] py-[5px]  bg-bodydark text-white" onClick={() => eliminarDiseno(idKey)}>X</a>
        </div>

        <div className="flex justify-between items-center">
            <h3 className="font-bold text-black text-lg">Diseño</h3>
            <div className="flex items-center">
                <input type="number" name="" id="unidades" className="formulario w-12 h-9" />
                <label htmlFor="unidades" className="labels ml-2">Unid.</label>
            </div>
        </div>
        <div className="mt-2" style={{borderBottom: '1px solid rgba(0,0,0,.2)'}}></div>
        <div className="mt-2">
            <label htmlFor="" className="labels">Horas de diseño</label>
            <input type="number" className="formulario" />
        </div>
        <div className="flex justify-end mt-2 items-center">
            <input className="formulario w-15 h-9 bg-transparent border-[#00000000] border-b-[#00000030]" type="number"/>
            <label htmlFor="unidades ml-2" className="labels ml-2">€</label>
        </div>            
    </div>
  )
}

'use client'

import Image from "next/image";

const data = {
  id: 'OPDCM0005',
  nombre: 'Rotulación camión',
  cliente: {
    nombre: 'Mercedes',
    creador: 'Leo'
  },
  prioridad: true,
  fecha_entrada: '2023-08-16T19:45:14.761Z',
  fecha_entrega: '2023-08-20T19:45:14.761Z',
  hora: "12:00",
  estado: 'en curso',
  descripcion: 'Diseño y rotulación de cabina de camión Mercedes con rayos y fuego con el',
  diseno: [],
  impresion: [],
  corte: [],
  cerrajeria: [],
  pintura: [],
  montaje: [],
  comentarios: []
}

function MiFormulario() {  

  return (
    <form>
      <div>
        {/* <Image /> */}
        <div>

        </div>
      </div>
    </form>
  )
}

export default MiFormulario;
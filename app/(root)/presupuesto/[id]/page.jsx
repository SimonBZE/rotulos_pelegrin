import { Projects } from "@/api";

const fetchData = async (id) => {
    let filter = "?";
    const media =
      "populate[fotos][populate][0]=*&populate[audios][populate][0]=*&populate[videos][populate][0]=*";
    const diseno = "&populate[diseno][populate][0]=imagenes";
    const impresion = "&populate[impresion][populate][0]=imagenes";
    const corte = "&populate[corte][populate][0]=imagenes";
    const cerrajeria =
      "&populate[cerrajeria][populate][0]=imagenes&populate[cerrajeria][populate][1]=adicional";
    const pintura = "&populate[pintura][populate][0]=imagenes";
    const montaje =
      "&populate[montaje][populate][0]=imagenes&populate[montaje][populate][1]=adicional&populate[montaje][populate][2]=matricula&populate[montaje][populate][3]=montadores";
  
    filter += media + diseno + impresion + corte + cerrajeria + pintura + montaje;
    const projectsCtrl = new Projects();
    const res = await projectsCtrl.getSingleBudget(id, filter);
    console.log(res)
    return res;
  };

export default async function Presupuesto({params}) {

    const data = await fetchData()

  return (
    <div>{params.id}</div>
  )
}

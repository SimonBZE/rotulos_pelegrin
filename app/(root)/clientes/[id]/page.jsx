
import { cookies } from "next/headers";
import Cliente from './cliente';
import { Client } from "@/api"

const clientCtrl = new Client();
const fetchData = async(id, token) => {
    if (!token) {
        throw new Response("Unauthorized", { status: 401 });
    }

    const res = await clientCtrl.getClientOk(id, token);
    
    if(res.data && res.data.attributes) {
        console.log(res.data)
        return res.data;
    } else {
        // Manejar el caso en que no existan los datos esperados
        return false;
    }
}
export default async function page({params}) {
    const cookiesList = cookies();
  
    // if(!cookiesList.has("token")) {
    //   return
    // }
    
    // const token = cookiesList.get("token")


    // let cliente = await fetchData(params.id, token).then( (client) =>{
    //     return client
    // } )
    
    return (
        <Cliente  id={params.id} />
    )
}
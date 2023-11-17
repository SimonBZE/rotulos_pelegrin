import { ENV, authFetch } from "@/utils";

export class Comments {
    async createComment(values){
        try{
            const params = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ data: { ...values } }),
            }

            const url = `${ENV.API_URL}/${ENV.ENDPOINTS.COMENTARIOS_PROYECTO}`;

            const response = await authFetch(url, params);

            const result = await response.json();

            if(response.status !== "200") throw result

            return result
        }catch(error){
            return error
        }
    }
}
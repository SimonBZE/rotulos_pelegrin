import { ENV, authFetch } from "@/utils";

export class imageApi {
    async upload(formData) {       
        try{
            const params = {
                method: "POST",
                body: formData
            }

            const url = `${ENV.API_URL}/${ENV.ENDPOINTS.IMAGE_UPLOAD}`
            const response = await authFetch(url, params)
            const result = await response.json()

            if(response.status !== 200) throw result;
            return result

        }catch (error) {
            return error
        }
    }

    async deleteImage(id) {
        try{
            const params = {
                method: "DELETE",
            }

            const url = `${ENV.API_URL}/${ENV.ENDPOINTS.IMAGE_DELETE}/${id}`
            const response = await authFetch(url, params)
            const result = await response.json()

            if(response.status !== 200) throw result;
            return result

        }catch (error) {
            return error
        }
    }
}
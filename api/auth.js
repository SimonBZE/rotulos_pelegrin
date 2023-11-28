import {ENV} from '@/utils/constants'

export class Auth{
    async login(data) {
        try{
            const url = `${ENV.API_URL}/${ENV.ENDPOINTS.AUTH.LOGIN}`
            const params = {
                method: 'POST',
                headers:{
                    'Content-Type':'application/json',
                },
                body: JSON.stringify(data),
            };

            const response = await fetch(url, params);
            const result = await response.json();
            console.log(result)
            
            if(response.status !== 200) throw result;

            return result;

        }catch(error){
            throw error;
        }
    }

    async resetPassword(data) {
        try{
            const url = `${ENV.API_URL}/${ENV.ENDPOINTS.AUTH.RESET_PASSWORD}`
            const params = {
                method: 'POST',
                headers:{
                    'Content-Type':'application/json',
                },
                body: JSON.stringify(data),
            };

            const response = await fetch(url, params);
            const result = await response.json();
            
            if(response.status !== 200) throw result;

            return result;

        }catch(error){
            throw error;
        }
    }

    async changePassword(data) {
        try{
            const url = `${ENV.API_URL}/${ENV.ENDPOINTS.AUTH.CHANGE_PASSWORD}`
            const params = {
                method: 'POST',
                headers:{
                    'Content-Type':'application/json',
                },
                body: JSON.stringify(data),
            };

            const response = await fetch(url, params);
            const result = await response.json();
            
            if(response.status !== 200) throw result;

            return result;

        }catch(error){
            throw error;
        }
    }
}
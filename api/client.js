import {ENV, authFetch} from '@/utils';

export class Client {
    async getClients(filters = ""){

        try{
            const url = `${ENV.API_URL}/${ENV.ENDPOINTS.CLIENT}?${filters}`;
    
            const response = await authFetch(url);
            const result = await response.json();
    
            if (response.status !== 200) throw result;
           
            return result;
        } catch(error){
            return error;
        }
    }

    async getClient(id){

      try{
          const url = `${ENV.API_URL}/${ENV.ENDPOINTS.CLIENT}/${id}?populate=*`;
  
          const response = await authFetch(url);
          const result = await response.json();
  
          if (response.status !== 200) throw result;
  
          return result;
      } catch(error){
          return error;
      }
  }

    async createClient(data) {
        try {
          const url = `${ENV.API_URL}/${ENV.ENDPOINTS.CLIENT}`
          const params = {
            method: 'POST',
            headers:{
                'Content-Type':'application/json',
            },
            body: JSON.stringify({ data: { ...data } }),
        };
    
          const response = await authFetch(url, params);
          const result = await response.json();
          
          if(response.status !== 200) throw result;
    
          return result;
    
        } catch (error) {
          return error;
        }
      }

      async updateClient(data, id) {
        try {
          const url = `${ENV.API_URL}/${ENV.ENDPOINTS.CLIENT}/${id}`;
    
          const params = {
            method: 'PUT',
            headers:{
                'Content-Type':'application/json',
            },
            body: JSON.stringify({ data: { ...data } }),
        };
    
          const response = await authFetch(url, params);
          const result = await response.json();
    
          if (response.status !== 200) throw result;
    
          return result;
        } catch (error) {
          return error;
        }
      }

      async deleteClient(id) {
        try {
          const url = `${ENV.API_URL}/${ENV.ENDPOINTS.CLIENT}/${id}`
          const params = {
            method: 'DELETE',
            headers:{
                'Content-Type':'application/json',
            },
        };
    
          const response = await authFetch(url, params);
          const result = await response.json();
          if(response.status !== 200) throw result;
    
          return result;
    
        } catch (error) {
          return error;
        }
      }
}
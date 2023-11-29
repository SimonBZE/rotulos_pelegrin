import { ENV, authFetch } from "@/utils";

export class User {
  async getAll() {
    try {
      const url = `${ENV.API_URL}/${ENV.ENDPOINTS.USER}?populate=foto`;

      const response = await authFetch(url);
      const result = await response.json();

      if (response.status !== 200) throw result;

      return result;
    } catch (error) {
      return error;
    }
  }

  async getMe() {
    try {
      const url = `${ENV.API_URL}/${ENV.ENDPOINTS.USERS_ME}`;

      const response = await authFetch(url);
      const result = await response.json();

      if (response.status !== 200) throw result;

      return result;
    } catch (error) {
      return error;
    }
  }
  
  async updateMe(data, id) {
    try {
      const url = `${ENV.API_URL}/${ENV.ENDPOINTS.USER}/${id}`;

      const params = {
        method: 'PUT',
        headers:{
            'Content-Type':'application/json',
        },
        body: JSON.stringify(data),
    };

      const response = await authFetch(url, params);
      const result = await response.json();

      if (response.status !== 200) throw result;

      return result;
    } catch (error) {
      return error;
    }
  }

  async changePassword(data) {
    try {
      const url = `${ENV.API_URL}/${ENV.ENDPOINTS.AUTH.CHANGE_PW_LOGED}`
      const params = {
        method: 'POST',
        headers:{
            'Content-Type':'application/json',
        },
        body: JSON.stringify(data),
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

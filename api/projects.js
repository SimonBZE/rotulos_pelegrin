import { ENV, authFetch } from "@/utils";


export class Projects {
  async getBudgets(filters = "") {
    try {
      const url = `${ENV.API_URL}/${ENV.ENDPOINTS.BUDGET}${filters}`;
      const response = await authFetch(url);
      const result = await response.json();

      if (response.status !== 200) throw result;

      return result;
    } catch (error) {
      throw error;
    }
  }

  async getSingleBudget(id, filters = "") {
    try {
      const url = `${ENV.API_URL}/${ENV.ENDPOINTS.BUDGET}/${id}${filters}`;

      const response = await authFetch(url);
      const result = await response.json();

      if (response.status !== 200) throw result;
      return result;
    } catch (error) {
      console.log('Error al conectar')
      throw error;
    }
  }

  async getPresupuesto(id, filters = "", token) {
    try {
      const options = {
        method: 'GET',
        headers: {
          Authorization: `bearer ${token}`
        }
      };
      const url = `${ENV.API_URL}/${ENV.ENDPOINTS.BUDGET}/${id}${filters}`;
      const response = await fetch(url, options)
      
      if (response.status !== 200) throw result;
      const result = await response.json();
      return result
    } catch (error) {
      console.log('Error al conectar')
      return error
    }
    
  }

  async getPresupuestos(token, filters = "") {
    try {
      const options = {
        method: 'GET',
        headers: {
          Authorization: `bearer ${token}`
        }
      };
      const url = `${ENV.API_URL}/${ENV.ENDPOINTS.BUDGET}/${filters}`;
      const response = await fetch(url, options)

      
      if (response.status !== 200) throw result;
      const result = await response.json();
      
      return result
    } catch (error) {
      console.log('Error al conectar')
      return error
    }
    
  }

  
}

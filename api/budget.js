import { ENV, authFetch } from "@/utils";

export class Budget {
  async getBudgets(filters='') {
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

  async createBudget(values) {
    try {
      const params = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data: { ...values } }),
      };

      const url = `${ENV.API_URL}/${ENV.ENDPOINTS.BUDGET}`;
      //   const url = `${ENV.API_URL}/pruebas`
      const response = await authFetch(url, params);
      
      
      const result = await response.json();
      
      if (response !== 200) throw result;

      return result;
    } catch (error) {
      return error
    }
  }

  async getPrecios(){
    const url =  `${ENV.API_URL}/${ENV.ENDPOINTS.PRECIOS_MATERIAL}`
    try {
      const res = await fetch(url)
      
      if(res.status != "200") throw res
      
      const data = await res.json()
      console.log(data)
      return data
    } catch (error) {
      return error
    }
    
  }
}

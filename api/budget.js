import { ENV, authFetch } from "@/utils";

export class Budget {
    async getBudgets() {
        try{
            const url = `${ENV.API_URL}/${ENV.ENDPOINTS.BUDGET}`
            const response = await authFetch(url)
            const result = await response.json();

            if((response.status !== 200)) throw result

            return result
        }catch (error) {
            throw error;
        }
    }

    // async createBudget(data){
    //     try {
    //         const params = {
    //             method: "POST",
    //             headers: {
    //                 "Content-Type": "application/json"
    //             },
    //             body: JSON.stringify({
    //                 data: {
    //                     ...data
    //                 }
    //             })
    //         };

    //           const url = `${ENV.API_URL}/${ENV.ENDPOINTS.BUDGET}`
    //         //   const url = `${ENV.API_URL}/pruebas`
    //           const response = await authFetch(url, params)
    //           const result = await response.json()

    //           if(result !== 200) throw result

    //           return result
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }

    async createBudget(data){
        try {
            const params = {
                method: "POST",
                body: data
            };

              const url = `${ENV.API_URL}/pruebas`
            //   const url = `${ENV.API_URL}/pruebas`
              const response = await authFetch(url, params)
              const result = await response.json()

              if(result !== 200) throw result

              return result
        } catch (error) {
            console.log(error)
        }
    }
}
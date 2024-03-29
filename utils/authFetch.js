import { Token } from "@/api";

export async function authFetch(url, params) {
  const tokenCtrl = new Token();
  const token = tokenCtrl.getToken();
  
  const logout = () => {
    tokenCtrl.removeToken();
    window.location.replace("/sign-in");
  };

  if (!token) {
    logout();
  } else {
    if (tokenCtrl.hasExpired(token)) {
      logout();
    } else {
      const paramsTemp = {
        ...params,
        headers: {
          ...params?.headers,
          Authorization: `Bearer ${token}`,
        },
      };

      try {        
        const data = await fetch(url, paramsTemp);
        
        return data
        
      } catch (error) {
        return error;
      }
    }
  }
}
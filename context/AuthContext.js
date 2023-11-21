import { useState, createContext, useEffect, useContext } from "react";
import { Token, User } from "@/api";
import {useRouter} from 'next/navigation'

const tokenCtrl = new Token();
const userCtrl = new User();

export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  const router = useRouter()

  useEffect(() => {
    (async () => {
      const token = tokenCtrl.getToken();

      if(!token){
        logout()
        setLoading(false)
        return;
      }

      if(tokenCtrl.hasExpired(token)){
        logout()
        return;
      } else{
        await login(token)
      }
    })()
  }, []);
  

  const login = async (token) => {
    try {
      tokenCtrl.setToken(token);
      const response = await userCtrl.getMe();
      setUser(response);
      setToken(token);
      setLoading(false);
      
    } catch (error) {      
      console.error(error);
      setLoading(false);
    }
  };


  const logout = () => {
    tokenCtrl.removeToken();
    setToken(null)
    setUser(null)
    router.push('/sign-in')
  }

  const updateUser = (key, value) => {
    setUser({
      ...user,
      [key]: value,
    })
  }

  const data = {
    accessToken: token,
    user,
    login,
    logout,
    updateUser
  };

  // if (loading) return null;

  return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
}

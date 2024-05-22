// import { useState, createContext, useEffect, useContext } from "react";
// import { Token, User } from "@/api";
// import {useRouter, usePathname  } from 'next/navigation'

// const tokenCtrl = new Token();
// const userCtrl = new User();

// export const AuthContext = createContext();

// export const useAuth = () => useContext(AuthContext);

// export function AuthProvider({ children }) {
//   const [user, setUser] = useState(null);
//   const [token, setToken] = useState(null);
//   const [loading, setLoading] = useState(true);
  
//   const router = useRouter()
//   const path = usePathname()

//   useEffect(() => {
//     (async () => {
//       const token = tokenCtrl.getToken();

//       if(!token){
//         handleRedirection()
//         setLoading(false)
//         return;
//       }

//       if(tokenCtrl.hasExpired(token)){
//         handleRedirection()
//         return;
//       } else{
//         await login(token)
//       }
//     })()
//   }, []);

//   const handleRedirection = () => {
//     const excludedPaths = ['/change-password', '/reset-password'];

//     if (!excludedPaths.includes(path)) {
//       logout();
//     }
//   };
  

//   const login = async (token) => {
//     try {
//       tokenCtrl.setToken(token);
//       const response = await userCtrl.getMe();
      
//       // if(response.error.status === 401){
//       //   logout();
//       //   throw error
//       // }
      
//       setUser(response);
//       setToken(token);
//       setLoading(false);
      
//     } catch (error) {      
//       console.error(error);
//       setLoading(false);
//     }
//   };


//   const logout = () => {
//     tokenCtrl.removeToken();
//     setToken(null)
//     setUser(null)
//     router.push('/sign-in')
//   }

//   const updateUser = (key, value) => {
//     setUser({
//       ...user,
//       [key]: value,
//     })
//   }

//   const loadUser = async () => {
//     try {
//       const data = await userCtrl.getMe();
//       setUser(data);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const reloadUser = async () => {
//     loadUser();
//   };

//   const data = {
//     accessToken: token,
//     user,
//     login,
//     logout,
//     updateUser,
//     setUser,
//     reloadUser,
//     loading,
//     setLoading
//   };

//   // if (loading) return null;

//   return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
// }

import { useState, createContext, useEffect, useContext } from "react";
import { Token, User } from "@/api";
import { useRouter, usePathname } from 'next/navigation';

export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const router = useRouter();
  const path = usePathname();

  useEffect(() => {
    const tokenCtrl = new Token();
    const userCtrl = new User();
    
    const initializeAuth = async () => {
      const token = tokenCtrl.getToken();

      if (!token) {
        handleRedirection();
        setLoading(false);
        return;
      }

      if (tokenCtrl.hasExpired(token)) {
        handleRedirection();
        return;
      } else {
        await login(token);
      }
    };

    initializeAuth();
  }, [router, path]);

  const handleRedirection = () => {
    const excludedPaths = ['/change-password', '/reset-password'];
    if (!excludedPaths.includes(path)) {
      logout();
    }
  };
  

  const login = async (token) => {
    const tokenCtrl = new Token(); // Ensure it's instantiated here if needed again
    const userCtrl = new User();
    try {
      tokenCtrl.setToken(token);
      const response = await userCtrl.getMe();
      
      setUser(response);
      setToken(token);
      setLoading(false);
      
    } catch (error) {      
      console.error("error al conectar", error);
      setLoading(false);
    }
  };


  const logout = () => {
    const tokenCtrl = new Token(); // Instantiate here to ensure it's client side
    tokenCtrl.removeToken();
    setToken(null);
    setUser(null);
    router.push('/sign-in');
  }

  const updateUser = (key, value) => {
    setUser({
      ...user,
      [key]: value,
    });
  }

  const loadUser = async () => {
    const userCtrl = new User(); // Instantiate here for safe client-side operation
    try {
      const data = await userCtrl.getMe();
      setUser(data);
    } catch (error) {
      console.error(error);
    }
  };

  const reloadUser = async () => {
    loadUser();
  };

  const data = {
    accessToken: token,
    user,
    login,
    logout,
    updateUser,
    setUser,
    reloadUser,
    loading,
    setLoading
  };

  return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
}

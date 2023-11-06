// import { ENV } from "@/utils/constants";
// import jwtDecode from "jwt-decode";

// export class Token {
//   setToken(token) {
//     localStorage.setItem(ENV.TOKEN, token);
//   }

//   getToken() {
//     return localStorage.getItem(ENV.TOKEN);
//   }

//   removeToken() {
//     localStorage.removeItem(ENV.TOKEN);
//   }

//   hasExpired(token) {
//     const tokenDecode = jwtDecode(token);
    
//     const expireDate = tokenDecode.exp * 1000;
//     const currentDate = new Date().getTime();
    
//     if (currentDate > expireDate) {
//       return true;
//     }

//     return false;
//   }
// }

import jwtDecode from 'jwt-decode';
import { parse } from 'cookie';

export class Token {
  // Esta función solo se debería llamar en el cliente
  setToken(token) {
    if (typeof window !== 'undefined') {
      const days = 29; // La duración de la cookie en días
      const expires = new Date(Date.now() + days * 864e5).toUTCString();
      document.cookie = `token=${encodeURIComponent(token)}; expires=${expires}; path=/`;
    }
  }

  // Esta función se debe modificar para que funcione tanto en cliente como en servidor
  getToken(req) {
    if (typeof window !== 'undefined') {
      // Estamos en el cliente, procede como antes
      const cookies = document.cookie.split(';');
      const tokenCookie = cookies.find(cookie => cookie.trim().startsWith('token='));
      return tokenCookie ? decodeURIComponent(tokenCookie.split('=')[1]) : null;
    } else if (req && req.headers.cookie) {
      // Estamos en el servidor, obtenemos la cookie de las cabeceras
      const cookies = parse(req.headers.cookie);
      return cookies.token;
    }
    return null; // No hay token disponible
  }

  // Esta función solo se debería llamar en el cliente
  removeToken() {
    if (typeof window !== 'undefined') {
      document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/';
    }
  }

  hasExpired(token) {
    const tokenDecode = jwtDecode(token);
    const expireDate = tokenDecode.exp * 1000;
    const currentDate = new Date().getTime();
    return currentDate > expireDate;
  }
}


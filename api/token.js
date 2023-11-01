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

// import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';

export class Token {
  setToken(token) {
    const days = 7; // La duración de la cookie en días
    const expires = new Date(Date.now() + days * 864e5).toUTCString();
    document.cookie = `token=${encodeURIComponent(token)}; expires=${expires}; path=/`;
  }

  getToken() {
    const cookies = document.cookie.split(';');
    const tokenCookie = cookies.find(cookie => cookie.trim().startsWith('token='));
    return tokenCookie ? decodeURIComponent(tokenCookie.split('=')[1]) : null;
  }

  removeToken() {
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/';
  }

  hasExpired(token) {
    const tokenDecode = jwtDecode(token);
    const expireDate = tokenDecode.exp * 1000;
    const currentDate = new Date().getTime();
    return currentDate > expireDate;
  }
}


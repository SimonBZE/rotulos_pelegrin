export const ENV = {
    SERVER_HOST: "https://pelegrin.up.railway.app",
    API_URL: 'https://pelegrin.up.railway.app/api',
    SOCKET_URL: 'https://rotulos-pelegrin-0df6d9acd9ec.herokuapp.com',
    ENDPOINTS: {
        AUTH:{
            REGISTER: "auth/local/register",
            LOGIN:"auth/local",
            RESET_PASSWORD: "auth/forgot-password",
            CHANGE_PASSWORD: "auth/reset-password",
            CHANGE_PW_LOGED: "auth/change-password",
        },
        USERS_ME: "users/me",
        USER: "users",
        BUDGET: "presupuestos",
        CLIENT:"clientes",
        IMAGE_UPLOAD: "upload",
        IMAGE_DELETE: "upload/files",
        PRECIOS_MATERIAL: "material",
        COMENTARIOS_PROYECTO: "mensajes",
    },
    TOKEN: "token",
    PRECIOS:{
        DISENO: 40,
    }
};
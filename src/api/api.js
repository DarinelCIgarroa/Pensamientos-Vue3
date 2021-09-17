// Contenedor de acceso global
import axios from "axios";

let instance = axios.create({
    withCredentials: true,
});

// Interceptor para todas las solicitudes
instance.interceptors.request.use( request => {
    const token = localStorage.getItem('token');
    axios.defaults.headers.common = { 'Authorization': `Bearer ${token}` }
    request.headers.common['Accept'] = 'application/json';
    request.headers.common['Content-Type'] = 'application/json';

    return request;
});

// Interceptor para las respuestas
instance.interceptors.response.use(
    response => { return response; },
    error => { return Promise.reject(error) }
    // if (error.response.status === 401) {
    //     sessionStorage.removeItem('user');
    //     window.location.reload();

    // return Promise.reject(error);
    // }
);


export default instance;
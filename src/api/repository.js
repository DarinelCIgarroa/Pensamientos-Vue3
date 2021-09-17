// Aquí tenemos el acceso global a nuestras rutas
// import api from "./api";
import axios from "axios"
const Global = { url: "http://api-pensamientos.test/api/" }

export default {
    // Creamos un punto de sesión
    setToken() {
        const token = localStorage.getItem('token');
        return axios.defaults.headers.common = { 'Authorization': `Bearer ${token}` }
    },
    // Login
    login(params) {
        return axios.post(Global.url + "login", params);
    },
    register(params) {
        return axios.post(Global.url + "register", params);
    },
    logout() {
        return axios.post(Global.url + 'logout');
    },
    // Pensamientos
    getPensamientosHome(){
        return axios.get(Global.url + 'pensamientos/home');
    },
    getPensamientos() {
        return axios.get(Global.url + 'pensamientos')
    },
    addPensamientos(params) {
        return axios.post(Global.url + 'pensamientos', params)
    },
    updatePensamientos(params) {
        console.log(params)
        return axios.put(Global.url + 'pensamientos' + `/${params.id}`, params)
    },
    deletePensamientos(params) {
        return axios.delete(Global.url + "pensamientos" + `/${params}`);
    }
} 
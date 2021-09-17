import { createStore } from 'vuex'
import Swal from "sweetalert2"
import repository from '@/api/repository'
import VuexPersistence from 'vuex-persist'

export default createStore({
  state: {
    pensamientosHome: [],
    pensamiento: [],
    user: null
  },

  mutations: {
    setPensamiento(state, payload) {
      state.pensamiento = payload
    },
    setPensamientoHome(state, payload) {
      state.pensamientosHome = payload
    },
    addPensamiento(state, payload) {
      state.pensamiento.push(payload)
    },
    updatePensamiento(state, payload) {
      const index = state.pensamiento.findIndex(pensamiento => pensamiento.id === payload.id)
      state.pensamiento[index] = payload
    },
    deletePensamiento(state, payload) {
      const index = state.pensamiento.findIndex(pensamiento => pensamiento.id === payload.id)
      state.pensamiento.splice(index, 1)
    },
    SET_USER(state) {
      state.user = JSON.parse(localStorage.getItem('user'))
    }
  },

  actions: {
    // Acciones de login
    async login({ commit }, params) {
      const { data } = await repository.login(params);
      if (data.res == true) {
        localStorage.user = JSON.stringify(data.user);
        localStorage.token = data.token
        commit('SET_USER');
      }  
    },
    async logout(){
      const response = await repository.logout();
      if (response.status == 200) {
        localStorage.clear();
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Sesión cerrada correctamente',
          showConfirmButton: false,
          timer: 1200
          
        })
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: '¡Algo salio mal!',
        })
      }
    },
    // Acciones de los pensamientos
    async getPensamientosHome({ commit }){
      const response = await repository.getPensamientosHome();  
      if (response.data.res === true) {
        commit('setPensamientoHome', response.data.data)
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: '¡Algo salio mal!',
        })
      }
    },
    async getPensamientos({ commit }) {
      await repository.setToken();
      const response = await repository.getPensamientos();
      if (response.status === 200) {
        commit('setPensamiento', response.data.data)
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: '¡Algo salio mal!',
        })
      }
    },
    async addPensamiento({ commit }, payload) {
      const response = await repository.addPensamientos(payload);
      if (response.status == 201) {
        commit("addPensamiento", response.data.pensamiento)
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Pensamiento creado exitosamente',
          showConfirmButton: false,
          timer: 1500
        })
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: '¡Algo salio mal!',
        })
      }
    },
    async deletePensamiento({ commit }, payload) {
      const response = await repository.deletePensamientos(payload)
      if (response.status == 200) {
        commit('deletePensamiento', response.data.pensamiento)
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: '¡Algo salio mal!',
        })
      }
    },
    async updatePensamiento({ commit }, payload,) {
      const response = await repository.updatePensamientos(payload)
      if (response.status == 200) {
        commit('updatePensamiento', response.data.pensamiento)
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: '¡Algo salio mal!',
        })
      }
    }
  },
  modules: {

  },

  getters: {
    enviarPensamientos(state) {
      return state.pensamiento.reverse()
    },
    enviarPensamientosHome(state){
      return state.pensamientosHome.reverse()
    },
    user: state => state.user,
    authenticated: state => state.user !== null && localStorage.getItem('token') !== null // si user es diferente de nulo authenticated es true
  },
  plugins: [
    new VuexPersistence({
      Storage: window.localStorage
    }).plugin
  ]
})

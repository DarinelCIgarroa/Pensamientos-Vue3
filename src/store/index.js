import axios from 'axios'
import { createStore } from 'vuex'
import { Global } from '../../Global'
import Swal from "sweetalert2"

export default createStore({
  state: {
    pensamiento: []
  },
  mutations: {
    setPensamiento(state, payload) {
      state.pensamiento = payload
    },
    addPensamiento(state, payload) {
      state.pensamiento.push(payload)
    },
    updatePensamiento(state,payload){
      const index = state.pensamiento.findIndex(pensamiento => pensamiento.id === payload.id)
      state.pensamiento[index] = payload
    },
    deletePensamiento(state, payload) {
      const index = state.pensamiento.findIndex(pensamiento => pensamiento.id === payload.id)
      state.pensamiento.splice(index, 1)
    }
  },
  actions: {
    async getPensamientos({ commit }) {
      const response = await axios.get(Global.url + 'pensamientos');
      if (response.status == 200) {
        commit('setPensamiento', response.data)   
      }else{
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: '¡Algo salio mal!',
        })
      }
    },
    async addPensamiento({ commit }, payload) {
      const response = await axios.post(Global.url + 'pensamientos',payload);
      if(response.status == 201){
        commit("addPensamiento",response.data)
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Pensamiento creado exitosamente',
          showConfirmButton: false,
          timer: 1500
        })
      }else{
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: '¡Algo salio mal!',
        })
      }
    },
    async deletePensamiento({ commit }, payload) {
      const response = await axios.delete(Global.url + "pensamientos" + `/${payload}`);
      if (response.status == 200) {
        commit('deletePensamiento', response.data)
      }else{
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: '¡Algo salio mal!',
        })
      }
    },
    async updatePensamiento({commit}, payload,){
      const response = await axios.put(Global.url + 'pensamientos' + `/${payload.id}`, payload)
      if(response.status == 200){
        commit('updatePensamiento', response.data)
      }else{
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
    }
  }
})

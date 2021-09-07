<template>
  <div class="card my-3">
    <div class="card-header">Crear Pensamiento</div>
    <div class="card-body">
      <h5 class="card-title">Titulo del pensamiento:</h5>
      <div class="input-group mb-3">
        <input
          type="text"
          class="form-control"
          placeholder="Título del pensamiento"
          v-model="title"
        />
      </div>
      <h5 class="card-title">Ecribe tu pensamiento:</h5>
      <div class="input-group mb-3">
        <input
          type="text"
          class="form-control"
          placeholder="Redacta tu pensamiento"
          v-model="description"
        />
      </div>
      <button class="btn btn-primary" @click="addPensamiento">Publicar</button>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs } from "@vue/reactivity";
import { useStore } from "vuex";


export default {
  name: "CrearPensamiento",
  setup() {
    const store = useStore();
    const data = reactive({
      title: "",
      description: "",
    });

    const addPensamiento = () => {
      store.dispatch("addPensamiento", data);
      data.title = "";
      data.description = "";
      
    };

    return { ...toRefs(data), addPensamiento };
  },
};
</script>


<template>
  <div class="container col-8">
    <div class="container-logo">
      <img class="logo-vue" alt="Vue logo" src="../assets/logo.png" />
    </div>
    <home-pensamientos v-for="item in pensamientosHome" :key="item" :pensamiento="item" />
  </div>
</template>

<script>

import HomePensamientos from "@/components/HomePensamientos"
import { computed, onMounted } from 'vue';
import { useStore } from 'vuex';
export default {
  name: 'Home',
  components: {
    HomePensamientos
  },
  setup(){
    const store = useStore();

    onMounted( () => {
      store.dispatch('getPensamientosHome');
    });
    const pensamientosHome = computed(() => store.getters.enviarPensamientosHome);
    return { pensamientosHome }
  }
}
</script>
<style>
@import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
.container-logo{
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
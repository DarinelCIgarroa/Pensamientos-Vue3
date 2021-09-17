<template>
  <nav class="navbar navbar-expand-lg navbar navbar-light">
    <a class="navbar-brand" href="#">Pensamientos</a>
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarNavAltMarkup"
      aria-controls="navbarNavAltMarkup"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
      <div class="navbar-nav">
        <router-link class="nav-item nav-link active" to="/">Home</router-link>
        <router-link
          class="nav-item nav-link active"
          v-if="!authenticated"
          to="/Login"
        >
          Iniciar Sesión
        </router-link>
        <router-link
          class="nav-item nav-link active"
          v-if="authenticated"
          to="/pensamientos"
        >
          Mis Pensamietos</router-link
        >
        <form class="form-inline" v-if="authenticated">
          <button
            class="btn btn-sm btn-outline-secondary"
            type="button"
            @click="logout"
          >
            Cerrar Sesión
          </button>
        </form>
        <a class="nav-item nav-link disabled" href="#"
          >Darinel Cigarroa De Los santos</a
        >
      </div>
    </div>
  </nav>
  <router-view />
</template>
<script>
import { computed } from "@vue/reactivity";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

export default {
  setup() {
    const router = useRouter();
    const logout = async () => {
      await store.dispatch("logout");
      await router.push({ name: "Login" });
    };
    const store = useStore();
    const authenticated = computed(() => store.getters.authenticated);

    return { authenticated, logout };
  },
};
</script>
<template>
  <crear-pensamiento />
  <div v-if="pensamiento.length > 0">
    <mi-pensamiento
      v-for="item of pensamiento"
      :key="item.id"
      :pensamiento="item"
    />
  </div>
  <div v-else class="mt-5">
    <h2 class="text-center">CREA TU PRIMER PENSAMIENTO</h2>
  </div>
</template>

<script>
import CrearPensamiento from "@/components/CrearPensamiento.vue";
import MiPensamiento from "@/components/MiPensamiento.vue";
import { computed, onMounted } from "vue";

import { useStore } from "vuex";
export default {
  name: "MisPensamientos",
  components: {
    CrearPensamiento,
    MiPensamiento,
  },
  setup() {
    const store = useStore();
    onMounted(() => {
      store.dispatch("getPensamientos");
    });
    const pensamiento = computed(() => store.getters.enviarPensamientos);
    return { pensamiento };
  },
};
</script>

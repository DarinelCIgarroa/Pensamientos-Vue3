<template>
  <crear-pensamiento />
  <mi-pensamiento
    v-for="item of pensamiento"
    :key="item.id"
    :pensamiento="item"
  />
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

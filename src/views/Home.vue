<template>
  <div class="container col-8">
      <img alt="Vue logo" src="../assets/logo.png">
      <mis-pensamientos/>
  </div>
</template>

<script>
import MisPensamientos from  "@/components/MisPensamientos.vue"

export default {
  name: 'Home',
  components: {
    MisPensamientos
  },
}
</script>
<style>
@import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
</style>
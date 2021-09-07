<template>
  <div class="container-sm col-6">
    <div class="row">
      <div class="col my-3">
        <mis-pensamientos/>
      </div>
    </div>
  </div>
</template>

<script>
import MisPensamientos from "@/components/MisPensamientos.vue"

export default {
  components: { 
    MisPensamientos
  },
  name: 'App', 
}
</script>

<style>
@import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
.container{
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>

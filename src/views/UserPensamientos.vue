<template>
    <div class="container col-8">
        <h1>Mis pensamientos</h1>
        <mis-pensamientos/>
    </div>
</template>

<script>
import MisPensamientos from "@/components/MisPensamientos.vue"
export default {
    name: "UserPensamientos",
    components:{
        MisPensamientos,
    },
    setup() {
        
    },
}
</script>
<template>
  <div class="card text-center">
    <div class="form-control p-3" v-if="editMode">
      <input
        type="text"
        class="form-control text-center"
        placeholder="Titulo del pensamiento"
        v-model="title"
      />
    </div>
    <div class="card-header" v-else>{{ pensamiento.title }}</div>
    <div class="card-body">
      <div class="form-floating" v-if="editMode">
        <textarea
          class="form-control"
          placeholder="Leave a comment here"
          id="floatingTextarea2"
          style="height: 100px"
          v-model="description"
        ></textarea>
      </div>

      <p class="card-text" v-else>
        {{ pensamiento.description }}
      </p>
      <h5 class="card-title">{{ pensamiento.created_at  }}</h5>
      <button
        type="button"
        class="btn btn-success"
        v-if="editMode"
        @click="updatePensamiento"
      >
        Guardar
      </button>
      <button type="button" class="btn btn-warning" @click="buttonEdit" v-else>
        Editar
      </button>
      <button
        type="button"
        class="btn btn-info"
        @click="cancelar"
        v-if="editMode"
      >
        Cancelar
      </button>
      <button
        type="button"
        class="btn btn-danger"
        @click="eliminar(pensamiento.id)"
        v-else
      >
        Eliminar
      </button>
    </div>
    <div class="card-footer text-muted">
      {{ pensamiento.updated_at }}
    </div>
  </div>
 
</template>

<script>
import { reactive, ref, toRefs } from "@vue/reactivity";
import { useStore } from "vuex";
import moment from "moment";
import Swal from "sweetalert2";

export default {
  name: "MiPensamiento",
  props: {
    pensamiento: {
      type: Object,
      Required: true,
    },
  },
  setup(props) {
    const store = useStore();
    const editMode = ref(false);

    const since = (date) => {
      return moment(date).fromNow();
    };

    const data = reactive({
      id: props.pensamiento.id,
      title: props.pensamiento.title,
      description: props.pensamiento.description,
    });

    const buttonEdit = () => {
      editMode.value = true;
    };

    const updatePensamiento =  async () => {
      Swal.fire({
        title: "¿Quieres guardar los cambios?",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: `Actualizar`,
        denyButtonText: `Cancelar cambios`,
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire("¡Actualizado!", "", "success");
          editMode.value = false;
          store.dispatch("updatePensamiento", data);
        } else if (result.isDenied) {
          Swal.fire("No se han registrado cambios", "", "info");
          editMode.value = false;
        }
      });
    }

    const cancelar = () => {
      editMode.value = false;
    };
    const eliminar = (data) => {
      Swal.fire({
        title: "¿Estas seguro?",
        text: "¡No podras recuperar el pensamiento eliminado!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "sí, ¡Estoy seguro!",
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire(
            "¡Eliminado!",
            "El pesanmiento ha sido eliminado.",
            "success"
          );
          store.dispatch("deletePensamiento", data);
        }
      });
    };

    return {
      ...toRefs(data),
      eliminar,
      buttonEdit,
      editMode,
      updatePensamiento,
      cancelar,
      since,
    };
  },
};
</script>
<style scoped>
.card {
  margin: 10px;
}
button {
  margin: 5px;
}
</style>

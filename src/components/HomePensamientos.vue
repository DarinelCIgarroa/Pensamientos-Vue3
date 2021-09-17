<template>
  <div class="card text-center m-3">
    <div class="card-header">{{ pensamiento.title }}</div>
    <div class="card-body">
      <p class="card-text">
        {{ pensamiento.description }}
      </p>
      <h5 class="card-title">{{ pensamiento.created_at }}</h5>
    </div>
    <div class="card-footer text-muted">
      {{ pensamiento.updated_at }}
    </div>
  </div>
</template>
<script>
export default {
  name: "HomePensamientos",
  props: {
    pensamiento: {
      type: Object,
      Required: true,
    },
  },
};
</script>
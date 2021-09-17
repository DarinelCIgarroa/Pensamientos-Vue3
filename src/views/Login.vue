<template>
  <div>
    <h2>Inciar sesión / Registrarse</h2>
    <div class="container" id="container">
      <div class="form-container sign-up-container">
        <form @submit.prevent="register">
          <h1>Crea tu cuenta</h1>
          <div class="social-container">
            <a href="#" class="social"><fa :icon="['fab', 'facebook']" /></a>
            <a href="#" class="social"><fa :icon="['fab', 'google']" /></a>
            <a href="#" class="social"><fa :icon="['fab', 'instagram']" /></a>
          </div>
          <div v-if="loading" class="lds-dual-ring"></div>
          <p v-if="errors" class="error">
            <ul>
              <li v-for="error in errors" :key="error" style="color: red">{{ error[0] }}</li>
            </ul>
          </p>
          <strong v-if="success" style="color: green;">{{ success }}</strong>
          <span>O use su correo electrónico para registrarse</span>
          <input v-model="name" type="text" placeholder="Nombre" />
          <input v-model="email" type="email" placeholder="Correo" />
          <input v-model="password" type="password" placeholder="Contraseña" />
          <input class="btn-login" type="submit" value="Registrarse" />
        </form>
      </div>
      <div class="form-container sign-in-container">
        <form @submit.prevent="login">
          <h1>Inicia sesión</h1>
          <div class="social-container">
            <a href="#" class="social"><fa :icon="['fab', 'facebook']" /></a>
            <a href="#" class="social"><fa :icon="['fab', 'google']" /></a>
            <a href="#" class="social"><fa :icon="['fab', 'instagram']" /></a>
          </div>
          <span>O use su correo electrónico para registrarse</span>
          <div v-if="loading" class="lds-dual-ring"></div>
          <p v-if="errors" class="error">
            <ul>
              <li v-for="error in errors" :key="error" style="color: red">{{ error[0] }}</li>
            </ul>
          </p>
          <input v-model="email" type="email" placeholder="Correo" />
          <input v-model="password" type="password" placeholder="Contraseña" />
          <a href="#">¿Olvidaste tú contraseña?</a>
          <input class="btn-login" type="submit" value="Iniciar sesión" />
        </form>
      </div>
      <div class="overlay-container">
        <div class="overlay">
          <div class="overlay-panel overlay-left">
            <h1>¡Bienvenido de nuevo!</h1>
            <p>
              Para mantenerse conectado, inicie sesión con su información
              personal
            </p>
            <button class="ghost" id="signIn" @click="signIn">
              Iniciar sesión
            </button>
          </div>
          <div class="overlay-panel overlay-right">
            <h1>¡Hola amigo!</h1>
            <p>Ingrese sus datos personales y comience su viaje con nosotros</p>
            <button class="ghost" id="signUp" @click="signUp">
              Registrarse
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import useLogin from "@/composables/useLogin";
import { reactive, toRefs, ref } from "@vue/reactivity";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import repository from "@/api/repository";
export default {
  setup() {
    // Importando para usar las rutas
    const router = useRouter();
    // Importamos metodos del login
    // const { signUp, signIn } = useLogin();
    // Importamos para usar invocar la tienda
    const store = useStore();

    const data = reactive({
      name: "",
      email: "",
      password: "",
    });

    const errors = ref(null);
    const success = ref(null);
    const loading = ref(false);

    const signUp = () => {
      errors.value = "";
      data.name = "";
      data.email = "";
      data.password = "";
      const container = document.getElementById("container");
      container.classList.add("right-panel-active");
    };

    const signIn = () => {
      errors.value = "";
      data.name = "";
      data.email = "";
      data.password = "";
      const container = document.getElementById("container");
      container.classList.remove("right-panel-active");
    };

    const login = async () => {
      errors.value = null;
      loading.value = true;
      try {
        await store.dispatch("login", data);
        await router.push({ name: "Pensamientos" });
      } catch (errorRes) {
        if (errorRes.response.status == 422) {
          errors.value = errorRes.response.data.errors;
        }
      } finally {
        loading.value = false;
      }
    };

    const register = async () => {
      errors.value = null;
      loading.value = true;
      try {
        const response = await repository.register(data);
        if (response.status === 201) {
          success.value = response.data.msg;
          data.name = "";
          data.email = "";
          data.password = "";
        }
      } catch (error) {
        if (error.response.status === 422) {
          errors.value = error.response.data.errors;
        }
      } finally {
        loading.value = false;
      }
    };
    return {
      signUp,
      signIn,
      login,
      register,
      errors,
      success,
      loading,
      ...toRefs(data),
    };
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Montserrat:400,800");
* {
  box-sizing: border-box;
}

body {
  background: #f6f5f7;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-family: "Montserrat", sans-serif;
  height: 100vh;
  margin: -20px 0 50px;
}

h1 {
  font-weight: bold;
  margin: 0;
}

h2 {
  text-align: center;
}

p {
  font-size: 14px;
  font-weight: 100;
  line-height: 20px;
  letter-spacing: 0.5px;
  margin: 20px 0 30px;
}

span {
  font-size: 12px;
}

a {
  color: #333;
  font-size: 14px;
  text-decoration: none;
  margin: 15px 0;
}
.btn-login {
  border-radius: 20px;
  border: 1px solid #ff4b2b;
  background-color: #ff4b2b;
  color: #ffffff;
  font-size: 12px;
  font-weight: bold;
  padding: 12px 45px;
  letter-spacing: 1px;
  text-transform: uppercase;
  transition: transform 80ms ease-in;
}
button {
  border-radius: 20px;
  border: 1px solid #ff4b2b;
  background-color: #ff4b2b;
  color: #ffffff;
  font-size: 12px;
  font-weight: bold;
  padding: 12px 45px;
  letter-spacing: 1px;
  text-transform: uppercase;
  transition: transform 80ms ease-in;
}

button:active {
  transform: scale(0.95);
}

button:focus {
  outline: none;
}

button.ghost {
  background-color: transparent;
  border-color: #ffffff;
}

form {
  background-color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 50px;
  height: 100%;
  text-align: center;
}

input {
  background-color: #eee;
  border: none;
  padding: 12px 15px;
  margin: 8px 0;
  width: 100%;
}
.error {
  margin: 0px;
  padding: 0px;
}
.container {
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  position: relative;
  overflow: hidden;
  width: 768px;
  max-width: 100%;
  min-height: 490px;
}

.form-container {
  position: absolute;
  top: 0;
  height: 100%;
  transition: all 0.6s ease-in-out;
}

.sign-in-container {
  left: 0;
  width: 50%;
  z-index: 2;
}

.container.right-panel-active .sign-in-container {
  transform: translateX(100%);
}

.sign-up-container {
  left: 0;
  width: 50%;
  opacity: 0;
  z-index: 1;
}

.container.right-panel-active .sign-up-container {
  transform: translateX(100%);
  opacity: 1;
  z-index: 5;
  animation: show 0.6s;
}

@keyframes show {
  0%,
  49.99% {
    opacity: 0;
    z-index: 1;
  }

  50%,
  100% {
    opacity: 1;
    z-index: 5;
  }
}

.overlay-container {
  position: absolute;
  top: 0;
  left: 50%;
  width: 50%;
  height: 100%;
  overflow: hidden;
  transition: transform 0.6s ease-in-out;
  z-index: 100;
}

.container.right-panel-active .overlay-container {
  transform: translateX(-100%);
}

.overlay {
  background: #ff416c;
  background: -webkit-linear-gradient(to right, #ff4b2b, #ff416c);
  background: linear-gradient(to right, #ff4b2b, #ff416c);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 0 0;
  color: #ffffff;
  position: relative;
  left: -100%;
  height: 100%;
  width: 200%;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;
}

.container.right-panel-active .overlay {
  transform: translateX(50%);
}

.overlay-panel {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 40px;
  text-align: center;
  top: 0;
  height: 100%;
  width: 50%;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;
}

.overlay-left {
  transform: translateX(-20%);
}

.container.right-panel-active .overlay-left {
  transform: translateX(0);
}

.overlay-right {
  right: 0;
  transform: translateX(0);
}

.container.right-panel-active .overlay-right {
  transform: translateX(20%);
}

.social-container {
  margin: 20px 0;
}

.social-container a {
  border: 1px solid #dddddd;
  border-radius: 50%;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  margin: 0 5px;
  height: 40px;
  width: 40px;
}
/* Loading */
.lds-dual-ring {
  display: inline-block;
  width: 80px;
  height: 80px;
}
.lds-dual-ring:after {
  content: " ";
  display: block;
  width: 50px;
  height: 50px;
  margin: 8px;
  border-radius: 50%;
  border: 6px solid black;
  border-color: black transparent black transparent;
  animation: lds-dual-ring 1.2s linear infinite;
}
@keyframes lds-dual-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
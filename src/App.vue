<template>
    <div>
      <Login />
    </div>
</template>

<script>
import Login from "./components/login/LoginPage";

export default {
  name: "App",
  components: { Login },

  data: () => ({
    //
  })
};
</script>

<style>
  .theme--light.v-application {
    background: black;
  }
</style>

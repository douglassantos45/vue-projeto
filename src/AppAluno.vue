<template>
  <v-app>
    <Content />
  </v-app>
</template>

<script>
import Content from "./components/aluno/AlunoPage";
export default {
  name: "App",
  components: { Content },
  data: () => ({
    //
  })
};
</script>

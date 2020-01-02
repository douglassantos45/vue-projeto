<template>
  <v-app>
    <Content />
  </v-app>
</template>

<script>
import Content from "./components/supervisor/SupervisorPage";
export default {
  name: "AppSupervisor",
  components: { Content },
  data: () => ({
    //
  })
};
</script>

<template>
  <div>
    <v-app-bar app clipped-right color="cyan" dark>
      <v-toolbar-title>IF Baiano</v-toolbar-title>
      <v-spacer />
      <v-item-text class="mr-1">Douglas da Silva Santos</v-item-text>
      <v-btn text small><v-icon>mdi-logout</v-icon></v-btn>
    </v-app-bar>
  </div>
</template>

<script>
export default {
  name: "ComponentHeader",
  data() {
    return {};
  }
};
</script>

<style>
</style>
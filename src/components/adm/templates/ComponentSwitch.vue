<template>
  <v-row>
    <v-row justify="space-around">
      <v-switch v-model="showMessages" label="Status"></v-switch>
      <v-input hint="Inativo" persistent-hint :messages="messages"></v-input>
    </v-row>
  </v-row>
</template>

<script>
export default {
  name: "ComponentSwitch",
  data() {
    return {
      text: "",
      showMessages: false
    };
  },
  computed: {
    messages() {
      return this.showMessages ? ["Ativo"] : undefined;
    }
  },
  methods: {}
};
</script>

<style>
#input-usage .v-input__prepend-outer,
#input-usage .v-input__append-outer,
#input-usage .v-input__slot,
#input-usage .v-messages {
  border: 1px dashed rgba(0, 0, 0, 0.4);
}
</style>
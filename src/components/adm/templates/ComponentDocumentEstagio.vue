<template>
  <v-card class="mx-auto" max-width="1500">
    <v-card-text class="mt-4">
      <div></div>
      <p class="display-1 text--primary">Documentação do Estágio</p>
      <p>IF Baiano</p>
      <div class="text--primary">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis saepe neque tempora necessitatibus, voluptates labore voluptate molestiae possimus cumque officiis doloribus expedita recusandae. Voluptatum non tempore tempora eos suscipit harum.
        <br />"a benevolent smile"
      </div>
    </v-card-text>
    <v-card-actions>
      <div id="chip-usage-example">
        <template>
          <v-dialog v-model="dialog" persistent max-width="600">
            <template v-slot:activator="{ on }">
              <v-chip v-on="on">
                <v-icon class="mr-1 pointer">mdi-printer</v-icon>Imprimir
              </v-chip>
            </template>
            <v-card>
              <v-card-title class>Deseja realmente imprimir a documentação?</v-card-title>
              <v-card-actions>
                <v-spacer></v-spacer>
                <br />
                <br />
                <div class="my-3 mr-6">
                  <v-btn small color="red" class="white--text" @click="dialog = false">Cancelar</v-btn>
                  <v-btn small color="green" class="white--text" @click="dialog = false">Confirmar</v-btn>
                </div>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </template>
      </div>
    </v-card-actions>
  </v-card>
</template>


<script>
export default {
  name: "ComponentDocumentEstagio",
  data() {
    return {
      dialog: false
    };
  }
};
</script>
<template>
  <div>
    <v-card class="mx-auto" max-width="1500">
      <v-card-text class="mt-4">
        <div></div>
        <p class="display-1 text--primary">Documentação do Estágio</p>
        <p>adjective</p>
        <div class="text--primary">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis saepe neque tempora necessitatibus, voluptates labore voluptate molestiae possimus cumque officiis doloribus expedita recusandae. Voluptatum non tempore tempora eos suscipit harum.
          <br />"a benevolent smile"
        </div>
      </v-card-text>
      <v-card-actions>
        <div id="chip-usage-example" class="text-center">
          <v-chip>
            <v-icon class="mr-1 pointer">mdi-printer</v-icon>Imprimir
          </v-chip>
        </div>
      </v-card-actions>
    </v-card>
    <!-- Fim CARD -->
    <template>
      <v-card class="mx-auto mt-4" max-width="1500">
        <v-card-text class="mt-4">
          <div></div>
          <h3 class="text--primary ml-3">Alunos Pendentes</h3>

          <div class="text--primary">
            <v-simple-table fixed-header height="300px">
              <template v-slot:default>
                <thead>
                  <tr>
                    <th class="text-left">Nome</th>
                    <th class="text-left">Matrícula</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in desserts" :key="item.nome">
                    <td>{{ item.nome }}</td>
                    <td>{{ item.matricula }}</td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </div>
        </v-card-text>
      </v-card>
    </template>
  </div>
</template>


<script>
export default {
  name: "Home",
  data() {
    return {
      desserts: [
        {
          nome: "Frozen Yogurt",
          matricula: 159
        },
        {
          nome: "Ice cream sandwich",
          matricula: 237
        },
        {
          nome: "Eclair",
          matricula: 262
        },
        {
          nome: "Cupcake",
          matricula: 305
        }
      ]
    };
  }
};
</script>

<style>
.pointer:hover {
  cursor: pointer;
}
</style>

<template>
  <div>
    <DocumentEstagio />
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
import DocumentEstagio from './ComponentDocumentEstagio'
export default {
  name: "Home",
  components: { DocumentEstagio },
  data() {
    return {
      desserts: [
        {
          nome: "Kauanny Gomes Batista",
          matricula: 1594342434
        },
        {
          nome: "Anna Júlia Oliveira",
          matricula: 2371234241
        },
        {
          nome: "Eclair Gomes da Silva",
          matricula: 2625667353
        },
        {
          nome: "Marcos Ferreira dos Santos",
          matricula: 3051242444
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

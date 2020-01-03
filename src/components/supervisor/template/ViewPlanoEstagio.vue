<template>
  <v-simple-table height="300px">
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left">Estagiário</th>
          <th class="text-left">Orientador</th>
          <th class="text-left">Plano de Estágio</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in planoEstagio" :key="item.name">
          <td>{{ item.name }}</td>
          <td>{{ item.orientador }}</td>
          <td>
            <v-btn x-small color="">Visualizar</v-btn>
          </td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>

<script>
export default {
  name: "ViewPlanoEstagio",
  data() {
    return {
      planoEstagio: [
        {
          name: "Douglas da Silva Santos",
          orientador: "Douglas da Silva Santos"
        },
        {
          name: "Douglas da Silva Santos",
          orientador: "Douglas da Silva Santos"
        },
        {
          name: "Anna Júlia Santos",
          orientador: "Douglas da Silva Santos"
        }
      ]
    };
  }
};
</script>

<style>
</style>
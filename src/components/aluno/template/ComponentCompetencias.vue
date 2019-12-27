<template>
  <div>
    <v-data-table :headers="headers" :items="competencias" class="elevation-1">
    <template v-slot:item.notas="{ item }">
      <v-chip :color="getColor(item.notas)" dark>{{ item.notas }}</v-chip>
    </template>
  </v-data-table>
  </div>
</template>

<script>
export default {
  name: "ComponentCompetencias",
  data() {
    return {
      headers: [
        {
          text: "Competências",
          align: "left",
          sortable: false,
          value: "name"
        },
        { text: "Notas", value: "notas" }
      ],
      competencias: [
        {
          name: "Frozen Yogurt",
          notas: 9
        },
        {
          name: "Ice cream sandwich",
          notas: 7
        },
        {
          name: "Eclair",
          notas: 2
        },
        {
          name: "Cupcake",
          notas: 5
        },
        {
          name: "Gingerbread",
          notas: 6
        },
        {
          name: "Jelly bean",
          notas: 7
        },
        {
          name: "Lollipop",
          notas: 9
        },
        {
          name: "Honeycomb",
          notas: 4
        },
        {
          name: "Donut",
          notas: 4
        },
        {
          name: "KitKat",
          notas: 8
        }
      ]
    };
  },
  methods: {
    getColor(notas) {
      if (notas < 5) return "red";
      else if (notas >= 5 && notas < 7) return "orange";
      else return "green";
    }
  }
};
</script>

<style>
</style>
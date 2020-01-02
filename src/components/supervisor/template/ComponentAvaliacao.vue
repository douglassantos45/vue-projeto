<template>
  <div>
    <v-data-table :headers="headers" :items="desserts" sort-by="calories" class="elevation-1">
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title>Avaliação</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
        </v-toolbar>
        <v-container>
          <v-row>
            <v-col cols="5">
              <v-select
                v-model="editedItem.estagiario"
                :items="estagiarios"
                item-text="estagiario"
                label="Estagiário"
                single-line
              ></v-select>
            </v-col>
            <v-col cols="5">
              <v-select
                v-model="editedItem.atividade"
                :items="atividades"
                item-text="atividade"
                label="Atividade"
                single-line
              ></v-select>
            </v-col>

            <v-col cols="2">
              <v-text-field
                v-model="editedItem.nota"
                label="Nota"
                value="0.0"
                type="number"
                suffix="Nota"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on }">
              <v-btn color="primary" dark class="mb-2" v-on="on">New Item</v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close">Cancelar</v-btn>
                <v-btn color="blue darken-1" text @click="save">Confirmar</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-container>
      </template>
      <template v-slot:item.action="{ item }">
        <v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
        <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
      </template>
    </v-data-table>
  </div>
</template>

<script>
export default {
  name: "ComponentAvaliacao",
  data() {
    return {
      dialog: false,
      headers: [
        {
          text: "Estagiário",
          align: "left",
          sortable: true,
          value: "estagiario"
        },
        { text: "Atividade", value: "atividade", sortable: false },
        { text: "Nota", value: "nota" },
        { text: "Ações", value: "action", sortable: false }
      ],
      estagiario: [],
      atividade: [],
      estagiarios: [
        { estagiario: "Douglas da Silva Santos" },
        { estagiario: "Anna Júlia Santos" }
      ],
      atividades: [
        { atividade: "Criatividade" },
        { atividade: "Sociabilidade" },
        { atividade: "Qualidade" },
        { atividade: "Conhecimento" }
      ],
      desserts: [],
      editedIndex: -1,
      editedItem: {
        estagiario: "",
        atividade: 0,
        nota: 0
      },
      defaultItem: {
        estagiario: "",
        atividade: 0,
        nota: 0
      }
    };
  },

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    }
  },

  watch: {
    dialog(val) {
      val || this.close();
    }
  },

  created() {
    this.initialize();
  },

  methods: {
    initialize() {
      this.desserts = [
        {
          estagiario: "Douglas da Silva Santos",
          atividade: "Criatividade",
          nota: 7.0
        },
        {
          estagiario: "Douglas da Silva Santos",
          atividade: "Sociabilidade",
          nota: 1.0
        }
      ];
    },

    editItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      const index = this.desserts.indexOf(item);
      confirm("Are you sure you want to delete this item?") &&
        this.desserts.splice(index, 1);
    },

    close() {
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.desserts[this.editedIndex], this.editedItem);
      } else {
        this.desserts.push(this.editedItem);
      }
      this.close();
    }
  }
};
</script>

<style>
</style>
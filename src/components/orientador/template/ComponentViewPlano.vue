<template>
  <v-content>
    <v-container>
      <v-data-table :headers="headers" :items="planoEstagio" sort-by="calories" class="elevation-1">
        <template v-slot:top>
          <v-toolbar flat color="white">
            <v-toolbar-title>Plano de Estágio</v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-spacer></v-spacer>
            <v-dialog v-model="dialog" max-width="800px">
              <v-card>
                <v-card-title>
                  <span class="headline">{{ formTitle }}</span>
                </v-card-title>

                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field v-model="editedItem.estagiario" label="Plano de Estágio"></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field v-model="editedItem.objetivo" label="Objetivos"></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field v-model="editedItem.competencia" label="Competências"></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field v-model="editedItem.atividades" label="Atividades"></v-text-field>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                  <v-btn color="blue darken-1" text @click="save">Save</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-toolbar>
        </template>
        <template v-slot:item.action="{ item }">
          <v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
          <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
        </template>
      </v-data-table>
    </v-container>
  </v-content>
</template>

<script>
export default {
  name: "ComponentViewPlano",
  data() {
    return {
      dialog: false,
      headers: [
        {
          text: "Estagiário",
          align: "left",
          sortable: false,
          value: "estagiario"
        },
        { text: "Objetivo", value: "objetivo" },
        { text: "Competências", value: "competencia" },
        { text: "Ativiades", value: "atividades" },
        { text: "Ações", value: "action", sortable: false }
      ],
      planoEstagio: [],
      editedIndex: -1,
      editedItem: {
        estagiario: "",
        objetivo: 0,
        competencia: 0,
        atividades: 0
      }
    };
  },

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Adicionar item" : "Editar Plano";
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
      this.planoEstagio = [
        {
          estagiario: "Douglas da Silva Santos",
          objetivo: 0,
          competencia: 0,
          atividades: 0
        }
      ];
    },

    editItem(item) {
      this.editedIndex = this.planoEstagio.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      const index = this.planoEstagio.indexOf(item);
      confirm("Are you sure you want to delete this item?") &&
        this.planoEstagio.splice(index, 1);
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
        Object.assign(this.planoEstagio[this.editedIndex], this.editedItem);
      } else {
        this.planoEstagio.push(this.editedItem);
      }
      this.close();
    }
  }
};
</script>

<style>
</style>
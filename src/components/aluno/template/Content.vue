<template>
  <v-content>
    <v-container>
      <v-data-table
        :headers="headers"
        :items="desserts"
        sort-by="calories"
        class="elevation-1 mt-10"
      >
        <template v-slot:top>
          <v-toolbar flat color="white">
            <v-toolbar-title>Horários</v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-spacer></v-spacer>
            <v-dialog v-model="dialog" max-width="500px">
              <template v-slot:activator="{ on }">
                <v-btn color="primary" dark class="mb-2" v-on="on">Cadastrar Horários</v-btn>
              </template>
              <v-card>
                <v-card-title>
                  <span class="headline">{{ formTitle }}</span>
                </v-card-title>

                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12" sm="6" md="4" hidden>
                        <v-text-field v-model="editedItem.name" label="Horário de Entrada"></v-text-field>
                      </v-col>  
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field v-model="editedItem.entrada" label="Horário de Entrada"></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field v-model="editedItem.saida" label="Horário de Saída"></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-dialog
                          ref="dialog"
                          v-model="modal"
                          :return-value.sync="date"
                          persistent
                          width="320px"
                        >
                          <template v-slot:activator="{ on }">
                            <v-text-field
                              v-model="editedItem.date"
                              label="Data de entrada e saida"
                              readonly
                              v-on="on"
                            ></v-text-field>
                          </template>
                          <v-date-picker v-model="editedItem.date" scrollable>
                            <v-spacer></v-spacer>
                            <v-btn text color="red" @click="modal = false">Cancelar</v-btn>
                            <v-btn text color="primary" @click="$refs.dialog.save(date)">Confirmar</v-btn>
                          </v-date-picker>
                        </v-dialog>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn small color="red white--text" @click="close">Cancelar</v-btn>
                  <v-btn small color="green white--text" @click="save">Confirmar</v-btn>
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
  name: "Content",
  data: () => ({
    dialog: false,
    menu: false,
    modal: false,
   
    headers: [
      {
        text: "Estagiário",
        align: "left",
        sortable: false,
        value: "name"
      },
      { text: "Entrada", value: "entrada", sortable: false },
      { text: "Saída", value: "saida", sortable: false },
      { text: "Data", value: "date" }
    ],
    desserts: [],
    editedIndex: -1,
    editedItem: {
      name: "Douglas da Silva Santos",
      entrada: "",
      saida: "",
      date: new Date().toISOString().substr(0, 10),
    }
  }),

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
          name: "Douglas da Silva Santos",
          entrada: "07:30",
          saida: "17:30",
          date: this.editedItem.date
        },
        {
          name: "Douglas da Silva Santos",
          entrada: "07:30",
          saida: "16:30",
          date: this.editedItem.date
        },
        {
          name: "Douglas da Silva Santos",
          entrada: "08:30",
          saida: "18:30",
          date: this.editedItem.date
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
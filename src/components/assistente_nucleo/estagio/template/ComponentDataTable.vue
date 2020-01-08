<template>
  <v-data-table
    :headers="headers"
    :items="estagios"
    :search="search"
    sort-by="calories"
    class="elevation-1 mt-3"
  >
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-toolbar-title class="text-uppercase">dados do estágio</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-text-field v-model="search" label="Pesquisar..." single-line hide-details></v-text-field>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="1000px">
          <template v-slot:activator="{ on }">
            <v-btn color="primary" dark class="mb-2" v-on="on">Cadastrar Estágio</v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>

            <!-- Modal Cadastro/Edit -->
            <v-card-text>
              <v-container>
                <v-row>
                   <v-col cols="12" sm="6" md="5">
                    <v-text-field
                      v-model="editedItem.aluno"
                      label="Aluno"
                      :rules="nameRules"
                      :counter="50"
                    ></v-text-field>
                  </v-col>
                  <!-- DATA -->
                  <v-col cols="12" sm="6" md="2">
                    <v-dialog
                      ref="dialog"
                      v-model="modal"
                      :return-value.sync="editedItem.date"
                      persistent
                      width="290px"
                    >
                      <template v-slot:activator="{ on }">
                        <v-text-field
                          v-model="editedItem.dataInicio"
                          label="Data de Início"
                          readonly
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker v-model="date" scrollable>
                        <v-spacer></v-spacer>
                        <v-btn text color="red" @click="modal = false">Cancelar</v-btn>
                        <v-btn text color="primary" @click="$refs.dialog.save(date)">Confirmar</v-btn>
                      </v-date-picker>
                    </v-dialog>
                  </v-col>
                  
                  <v-col cols="12" sm="6" md="3">
                    <v-dialog
                      ref="dialog"
                      v-model="modal"
                      :return-value.sync="editedItem.date"
                      persistent
                      width="290px"
                    >
                      <template v-slot:activator="{ on }">
                        <v-text-field
                          v-model="editedItem.dataTerminoPrevista"
                          label="Data de Termino Prevista"
                          readonly
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker v-model="date" scrollable>
                        <v-spacer></v-spacer>
                        <v-btn text color="red" @click="modal = false">Cancelar</v-btn>
                        <v-btn text color="primary" @click="$refs.dialog.save(date)">Confirmar</v-btn>
                      </v-date-picker>
                    </v-dialog>
                  </v-col>
          
                  <v-col cols="12" sm="6" md="2">
                    <v-dialog
                      ref="dialog"
                      v-model="modal"
                      :return-value.sync="editedItem.date"
                      persistent
                      width="290px"
                    >
                      <template v-slot:activator="{ on }">
                        <v-text-field
                          v-model="editedItem.dataTermino"
                          label="Data de Termino"
                          readonly
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker v-model="date" scrollable>
                        <v-spacer></v-spacer>
                        <v-btn text color="red" @click="modal = false">Cancelar</v-btn>
                        <v-btn text color="primary" @click="$refs.dialog.save(date)">Confirmar</v-btn>
                      </v-date-picker>
                    </v-dialog>
                  </v-col>
                  <!-- FIM DATA -->

                

                  <v-col cols="12" sm="6" md="2">
                    <v-row justify="space-around">
                      <label for>
                        Situação do Estágio
                        <v-switch style="margin-top:5px" v-model="editedItem.status" label="Status"></v-switch>
                      </label>
                    </v-row>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <!--Fim modal-->
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn small color="red" dark @click="close">Cancelar</v-btn>
              <v-btn small color="green" class="mr-4" dark @click="save">Salvar</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.action="{ item }">
      <v-icon small class="mr-2" @click="editItem(item)">mdi-pen</v-icon>
      <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
    </template>
  </v-data-table>
</template>

<script>
export default {
  name: "ComponentDataTable",
  data() {
    return {
      menu: false,
      modal: false,
      dialog: false,
      showActived: false,
      select: null,
      search: "",
      cursos: [
        "Técnico em Zootecnia",
        "Técnico em Informática",
        "Técnico em Agropecuária",
        "Técnico em Alimentos",
        "Licenciatura em Ciências Agrárias",
        "Licenciatura em Ciências da Computação",
        "Ensino Médio"
      ],
      nameRules: [v => !!v || "Campo Obrigatório"],
      headers: [
        {
          text: "Aluno",
          align: "left",
          value: "aluno"
        },
        { text: "Data de Início", value: "dataInicio", sortable: false },
        { text: "Data de Termino Prevista", value: "dataTerminoPrevista", sortable: false },
        { text: "Data de Termino", value: "dataTermino", sortable: false },
        { text: "Status", value: "status", sortable: false},
        { text: "Ações", value: "action", sortable: false}
      ],
      estagios: [],
      editedIndex: -1,
      editedItem: {
        aluno: "",
        dataTerminoPrevista: "",
        dataTermino: "",
        dataInicio: "",
        status: this.showActived ? true : false
      },
      defaultItem: {
        aluno: "",
       dataTerminoPrevista: "",
        dataTermino: "",
        dataInicio: "",
        status: this.showActived ? true : false
      }
    };
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Cadastrar" : "Editar";
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
      this.estagios = [
        {
          aluno: "Douglas da Silva Santos",
          dataInicio: "2020/02/01",
          dataTerminoPrevista: "2020/04/01",
          dataTermino: "2020/05/01",
          status: "true"
        }
      ];
    },

    editItem(item) {
      this.editedIndex = this.estagios.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      const index = this.estagios.indexOf(item);
      confirm("Deseja realmente excluir o item?") &&
        this.estagios.splice(index, 1);
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
        Object.assign(this.estagios[this.editedIndex], this.editedItem);
      } else {
        this.estagios.push(this.editedItem);
      }
      this.close();
    }
  }
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
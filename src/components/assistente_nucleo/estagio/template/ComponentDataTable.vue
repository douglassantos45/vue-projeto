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
                  <v-col cols="12" sm="6" md="3">
                    <div>
                      <v-autocomplete label="Matrícula" :items="matriculas"></v-autocomplete>
                    </div>
                  </v-col>
                  <v-col cols="12" sm="6" md="3">
                    <div>
                      <v-autocomplete label="Empresa" :items="editedItem.matriculas"></v-autocomplete>
                    </div>
                  </v-col>
                  <v-col cols="12" sm="6" md="3">
                    <div>
                      <v-autocomplete label="Supervisor" :items="supervisores"></v-autocomplete>
                    </div>
                  </v-col>
                  <v-col cols="12" sm="6" md="3">
                    <div>
                      <v-autocomplete label="Orientador" :items="orientadores"></v-autocomplete>
                    </div>
                  </v-col>
                  <!-- DATA -->
                  <v-col cols="12" sm="6" md="3">
                    <v-menu
                      ref="inicio"
                      v-model="inicio"
                      :close-on-content-click="false"
                      :return-value.sync="editedItem.dataInicio"
                      transition="scale-transition"
                      offset-y
                      min-width="290px"
                    >
                      <template v-slot:activator="{ on }">
                        <v-text-field
                          v-model="dateInicio"
                          label="Data de Início"
                          prepend-icon="mdi-calendar"
                          readonly
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker v-model="dateInicio" no-title scrollable>
                        <v-spacer></v-spacer>
                        <v-btn text color="primary" @click="inicio = false">Cancel</v-btn>
                        <v-btn text color="primary" @click="$refs.inicio.save(dateInicio)">OK</v-btn>
                      </v-date-picker>
                    </v-menu>
                  </v-col>

                  <v-col cols="12" sm="6" md="4">
                    <v-menu
                      ref="prevTermino"
                      v-model="prevTermino"
                      :close-on-content-click="false"
                      :return-value.sync="editedItem.dataTerminoPrevista"
                      transition="scale-transition"
                      offset-y
                      min-width="290px"
                    >
                      <template v-slot:activator="{ on }">
                        <v-text-field
                          v-model="datePrevTermino"
                          label="Data de Prevista para Termino"
                          prepend-icon="mdi-calendar"
                          readonly
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker v-model="datePrevTermino" no-title scrollable>
                        <v-spacer></v-spacer>
                        <v-btn text color="primary" @click="prevTermino = false">Cancel</v-btn>
                        <v-btn
                          text
                          color="primary"
                          @click="$refs.prevTermino.save(datePrevTermino)"
                        >OK</v-btn>
                      </v-date-picker>
                    </v-menu>
                  </v-col>

                  <v-col cols="12" sm="6" md="3">
                    <v-menu
                      ref="termino"
                      v-model="termino"
                      :close-on-content-click="false"
                      :return-value.sync="editedItem.dataTermino"
                      transition="scale-transition"
                      offset-y
                      min-width="290px"
                    >
                      <template v-slot:activator="{ on }">
                        <v-text-field
                          v-model="dateTermino"
                          label="Data de Termino"
                          prepend-icon="mdi-calendar"
                          readonly
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker v-model="dateTermino" no-title scrollable>
                        <v-spacer></v-spacer>
                        <v-btn text color="primary" @click="termino = false">Cancel</v-btn>
                        <v-btn text color="primary" @click="$refs.termino.save(dateTermino)">OK</v-btn>
                      </v-date-picker>
                    </v-menu>
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
      inicio: false,
      prevTermino: false,
      termino: false,
      dialog: false,
      showActived: false,
      search: "",
      empresas: [
        "Madalena Zagallo",
        "IF Baiano Senhor do Bonfim",
        "NetCom",
        "Infornet",
        "Bradesco",
        "Fazenda Rios",
        "Cervejaria Ferreira"
      ],
      supervisores: ["Madalena Zagallo", "Tanya Stanley", "Mark	Otto"],
      orientadores: [
        "Arcidres Barreiro",
        "Claudemira Castelo Branco",
        "Tanya Stanley",
        "Larry the Bird"
      ],
      matriculas: [
        "20193421834644",
        "20193421611484",
        "20193421808013",
        "20193897974906",
        "20194560921840",
        "20191098606304",
        "20193421080293"
      ],
      nameRules: [v => !!v || "Campo Obrigatório"],
      headers: [
        {
          text: "Aluno",
          align: "left",
          value: "aluno"
        },
        { text: "Data de Início", value: "dataInicio", sortable: false },
        {
          text: "Data de Termino Prevista",
          value: "dataTerminoPrevista",
          sortable: false
        },
        { text: "Data de Termino", value: "dataTermino", sortable: false },
        { text: "Status", value: "status", sortable: false },
        { text: "Ações", value: "action", sortable: false }
      ],
      estagios: [],
      editedIndex: -1,
      editedItem: {
        matricula: this.matriculas,
        aluno: "Douglas da Silva Santos",
        dataTerminoPrevista: "",
        dataTermino: "",
        dataInicio: "",
        status: this.showActived ? true : false
      },
      defaultItem: {
        matricula: this.matriculas,
        aluno: "Douglas da Silva Santos",
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
        this.editedItem.estagios.data = ""
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
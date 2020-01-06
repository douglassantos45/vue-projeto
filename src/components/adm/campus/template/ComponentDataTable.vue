<template>
  <v-data-table
    :headers="headers"
    :search="search"
    :items="campus"
    sort-by="calories"
    class="elevation-1 mt-3"
  >
    <template v-slot:top>
      <v-toolbar flat color="white" class="mb-6">
        <v-toolbar-title class="text-uppercase">dados dos Campus</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-text-field v-model="search" label="Pesquisar..." single-line hide-details></v-text-field>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="1000px">
          <template v-slot:activator="{ on }">
            <v-btn color="primary" dark class="mb-2" v-on="on">Cadastrar Campus</v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>
            <!-- Modal Cadastro/Edit -->
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="7">
                    <v-text-field
                      v-model="editedItem.name"
                      label="Nome do Campus"
                      :rules="nameRules"
                      :counter="50"
                    ></v-text-field>
                  </v-col>
                  
                  <v-col cols="12" sm="6" md="5">
                    <v-text-field
                      v-model="editedItem.cidade"
                      label="Cidade"
                      :rules="nameRules"
                      :counter="20"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="5">
                    <v-text-field
                      v-model="editedItem.endereco"
                      label="Endereço"
                      :rules="nameRules"
                      :counter="25"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="5">
                    <v-text-field
                      v-model="editedItem.bairro"
                      label="Bairro"
                      :rules="nameRules"
                      :counter="20"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="2">
                    <v-text-field
                      v-model="editedItem.uf"
                      label="UF"
                      :rules="nameRules"
                      :counter="2"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="3">
                    <v-text-field
                      v-model="editedItem.cep"
                      label="Cep"
                      :rules="nameRules"
                      :counter="9"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="5">
                    <v-text-field
                      v-model="editedItem.cnpj"
                      label="CNPJ/INCRA"
                      :rules="nameRules"
                      :counter="20"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.telefone"
                      label="Telefone"
                      :rules="nameRules"
                      :counter="15"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="5">
                    <v-text-field
                      v-model="editedItem.repreLegal"
                      label="Representante Legal"
                      :rules="nameRules"
                      :counter="50"
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.repreLegal"
                      label="Cargo do Representante Legal"
                      :rules="nameRules"
                      :counter="50"
                    ></v-text-field>
                  </v-col>
                 
                  <v-col cols="12" sm="6" md="3">
                    <v-text-field
                      v-model="editedItem.areaAtuacao"
                      label="Área de Atuação"
                      :rules="nameRules"
                      :counter="25"
                    ></v-text-field>
                  </v-col>
                  
                </v-row>
              </v-container>
            </v-card-text>
            <!--Fim modal-->
            <v-card-actions>
              <v-spacer></v-spacer>
              <div class="my-3 mr-6">
                <v-btn small color="red" class="white--text" @click="close">Cancelar</v-btn>
                 <v-btn small color="green" class="white--text" @click="save">Confirmar</v-btn>
              </div>
              
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.action="{ item }">
      <v-icon small class="mr-2 blue--text" @click="editItem(item)">mdi-pen</v-icon>
      <v-icon small class="red--text" @click="deleteItem(item)">mdi-delete</v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn color="primary" @click="initialize">Resetar</v-btn>
    </template>
  </v-data-table>
</template>

<script>
export default {
  name: 'ComponentDataTable',
  data: () => ({
    reg: '',
    dialog: false,
    search: "",
    nameRules: [v => !!v || "Name is required"],
    headers: [
      {
        text: "Campus",
        align: "left",
        value: "name"
      },
      { text: "Cidade", value: "cidade" },
      { text: "CEP", value: "cep", sortable: false },
      { text: "Telefone", value: "telefone", sortable: false },
      { text: "Representante Legal", value: "repreLegal", sortable: false },
      { text: "Área de Atuação", value: "areaAtuacao", sortable: false },
      { text: "Ações", value: "action", sortable: false }
    ],
    campus: [],
    editedIndex: -1,
    editedItem: {
      name: "",
      endereco: "",
      bairro: "",
      cidade: "",
      uf: "",
      cep: "",
      cnpj: "",
      telefone: "",
      repreLegal: "",
      cargo: "",
      areaAtuacao: ""
    },
    defaultItem: {
      name: "",
      endereco: "",
      bairro: "",
      cidade: "",
      uf: "",
      cep: "",
      cnpj: "",
      telefone: "",
      repreLegal: "",
      cargo: "",
      areaAtuacao: ""
    }
  }),

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
      this.campus = [
        {
          name: "Instituto Federal Campus Senhor do Bonfim",
          endereco: "Estrada para Igara",
          bairro: "Zona Rural",
          cidade: "Senhor do Bonfim",
          uf: "BA",
          cep: "48970-000",
          cnpj: "10.724.903/0003-30",
          telefone: "(74) 3542-4000",
          repreLegal: "Aécio José Araújo Passos Duarte",
          cargo: "Diretor",
          areaAtuacao: "Instituto Educacional",
          supervisor: "Bruno Álves dos Santos",
          cargoSupervisor: "Especialista em Apicultura"
        },
        {
          name: "Instituto Federal Campus Sertão Pernambucano",
          endereco: "Estrada para Igara",
          bairro: "Zona Rural",
          cidade: "Senhor do Bonfim",
          uf: "BA",
          cep: "48970-000",
          cnpj: "10.724.903/0003-30",
          telefone: "(74) 3542-4000",
          repreLegal: "Aécio José Araújo Passos Duarte",
          cargo: "Diretor",
          areaAtuacao: "Instituto Educacional",
          supervisor: "Bruno Álves dos Santos",
          cargoSupervisor: "Especialista em Apicultura"
        },
      ];
    },
    editItem(item) {
      this.editedIndex = this.campus.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      const index = this.campus.indexOf(item);
      confirm("Are you sure you want to delete this item?") &&
        this.campus.splice(index, 1);
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
        Object.assign(this.campus[this.editedIndex], this.editedItem);
      } else {
        this.campus.push(this.editedItem);
      }
      this.close();
    }
  }
};
</script>
<style>
.v-application .text-start {
  font-size: 13px;
}
</style>
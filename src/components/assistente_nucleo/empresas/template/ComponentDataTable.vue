<template>
  <v-data-table
    :headers="headers"
    :search="search"
    :items="empresas"
    sort-by="calories"
    class="elevation-1 mt-3"
  >
    <template v-slot:top>
      <v-toolbar flat color="white" class="mb-6">
        <v-toolbar-title class="text-uppercase">dados das empresas</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-text-field v-model="search" label="Pesquisar Empresa" single-line hide-details></v-text-field>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="1000px">
          <template v-slot:activator="{ on }">
            <v-btn color="primary" dark class="mb-2" v-on="on">Cadastrar Empresa</v-btn>
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
                      label="Nome da Empresa"
                      :rules="nameRules"
                      :counter="20"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="5">
                    <v-text-field
                      v-model="editedItem.endereco"
                      label="Endereço"
                      :rules="nameRules"
                      :counter="15"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field
                      v-model="editedItem.bairro"
                      label="Bairro"
                      :rules="nameRules"
                      :counter="10"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field
                      v-model="editedItem.cidade"
                      label="Cidade"
                      :rules="nameRules"
                      :counter="10"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="1">
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
                      :counter="10"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.cnpj"
                      label="CNPJ/INCRA"
                      :rules="nameRules"
                      :counter="16"
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
                      :counter="20"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.cargo"
                      label="Cargo"
                      :rules="nameRules"
                      :counter="10"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="3">
                    <v-text-field
                      v-model="editedItem.areaAtuacao"
                      label="Área de Atuação"
                      :rules="nameRules"
                      :counter="10"
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
    dialog: false,
    search: "",
    nameRules: [v => !!v || "Name is required"],
    headers: [
      {
        text: "Nome da Empresa",
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
    empresas: [],
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
      this.empresas = [
        {
          name: "NetCom",
          endereco: "Rua tal",
          bairro: "Bairro qualquer",
          cidade: "Senhor do Bonfim",
          uf: "BA",
          cep: "48970-000",
          cnpj: "1123418970450",
          telefone: "(74) 3645-1472",
          repreLegal: "João Canário Oliviera",
          cargo: "Gerente",
          areaAtuacao: "Provedor de Internet",
          supervisor: "Mário Santos Gomes Ferreira",
          cargoSupervisor: "Técnico em Redes"
        },
        {
          name: "IF Baiano",
          endereco: "Estr. p/ Igara",
          bairro: "Zona Rural",
          cidade: "Senhor do Bonfim",
          uf: "BA",
          cep: "48970-000",
          cnpj: "978673418970450",
          telefone: "(74) 3542-4000",
          repreLegal: "Aécio José Araújo Passos Duarte",
          cargo: "Diretor",
          areaAtuacao: "Instituto Educacional",
          supervisor: "Bruno Álves dos Santos",
          cargoSupervisor: "Especialista em Apicultura"
        },
        {
          name: "NetCom",
          endereco: "R. Leonardo Galvão Bandeira",
          bairro: "Centro",
          cidade: "Campo Formoso",
          uf: "BA",
          cep: "48970-000",
          cnpj: "6673418970450",
          telefone: "(74) 3645-1472",
          repreLegal: "Paulo Júnior",
          cargo: "Gerente",
          areaAtuacao: "Provedor de Internet",
          supervisor: "Gomes dos Santos",
          cargoSupervisor: "Técnico em Redes"
        },
        {
          name: "NetCom",
          endereco: "Rua tal",
          bairro: "Bairro qualquer",
          cidade: "Senhor do Bonfim",
          uf: "BA",
          cep: "48970-000",
          cnpj: "1123418970450",
          telefone: "(74) 3645-1472",
          repreLegal: "João Canário Oliviera",
          cargo: "Gerente",
          areaAtuacao: "Provedor de Internet",
          supervisor: "Mário Santos Gomes Ferreira",
          cargoSupervisor: "Técnico em Redes"
        },
        {
          name: "NetCom",
          endereco: "Rua tal",
          bairro: "Bairro qualquer",
          cidade: "Senhor do Bonfim",
          uf: "BA",
          cep: "48970-000",
          cnpj: "1123418970450",
          telefone: "(74) 3645-1472",
          repreLegal: "João Canário Oliviera",
          cargo: "Gerente",
          areaAtuacao: "Provedor de Internet",
          supervisor: "Mário Santos Gomes Ferreira",
          cargoSupervisor: "Técnico em Redes"
        }
      ];
    },

    editItem(item) {
      this.editedIndex = this.empresas.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      const index = this.empresas.indexOf(item);
      confirm("Are you sure you want to delete this item?") &&
        this.empresas.splice(index, 1);
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
        Object.assign(this.empresas[this.editedIndex], this.editedItem);
      } else {
        this.empresas.push(this.editedItem);
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
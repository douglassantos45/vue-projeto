<template>
  <div>
    <v-dialog v-model="dialog" max-width="1000px">
      <template v-slot:activator="{ on }">
        <v-btn color="primary" dark class="mb-2" v-on="on">Cadastrar</v-btn>
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
                  label="Nome"
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
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  v-model="editedItem.bairro"
                  label="Bairro"
                  :rules="nameRules"
                  :counter="10"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="5">
                <v-text-field
                  v-model="editedItem.cidade"
                  label="Cidade"
                  :rules="nameRules"
                  :counter="10"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="3">
                <v-text-field v-model="editedItem.cpf" label="CPF" :rules="nameRules" :counter="2"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  v-model="editedItem.areaAtuacao"
                  label="Área de Atuação"
                  :rules="nameRules"
                  :counter="10"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  v-model="editedItem.telefone"
                  label="Telefone"
                  :rules="nameRules"
                  :counter="16"
                ></v-text-field>
              </v-col>

              <!-- DATA -->
              <v-col cols="12" sm="6" md="4">
                <v-dialog
                  ref="dialog"
                  v-model="modal"
                  :return-value.sync="date"
                  persistent
                  width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field v-model="date" label="Data de Nascimento" readonly v-on="on"></v-text-field>
                  </template>
                  <v-date-picker v-model="date" scrollable>
                    <v-spacer></v-spacer>
                    <v-btn text color="red" @click="modal = false">Cancelar</v-btn>
                    <v-btn text color="primary" @click="$refs.dialog.save(date)">Confirmar</v-btn>
                  </v-date-picker>
                </v-dialog>
              </v-col>
              <!-- FIM DATA -->
              <v-col cols="12" sm="6" md="5">
                <v-text-field
                  v-model="editedItem.orgaoExpedidor"
                  label="Orgão Expedidor"
                  :rules="nameRules"
                  :counter="20"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field v-model="editedItem.rg" label="RG" :rules="nameRules" :counter="10"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="3">
                <v-text-field v-model="editedItem.uf" label="UF" :rules="nameRules" :counter="10"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="3">
                <v-select
                  v-model="select"
                  :items="items"
                  :error-messages="selectErrors"
                  label="Curso"
                  :rules="nameRules"
                  @change="$v.select.$touch()"
                  @blur="$v.select.$touch()"
                ></v-select>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <!--Fim modal-->
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red darken-1" text @click="close">Cancelar</v-btn>
          <v-btn color="green darken-1" text @click="save">Confirmar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
export default {
  name: "ComponentFormModalPeople",
  data() {
    return {
      menu: false,
      modal: false,
      dialog: false,
      select: null,
      items: ["Curso 1", "Curso 2", "Curso 3", "Curso 4"],
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
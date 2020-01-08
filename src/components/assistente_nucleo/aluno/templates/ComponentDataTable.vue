<template>
  <v-data-table
    :headers="headers"
    :items="alunos"
    :search="search"
    sort-by="calories"
    class="elevation-1 mt-3"
  >
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-toolbar-title class="text-uppercase">dados do aluno</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-text-field v-model="search" label="Pesquisar..." single-line hide-details></v-text-field>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="1000px">
          <template v-slot:activator="{ on }">
            <v-btn color="primary" dark class="mb-2" v-on="on">Cadastrar Aluno</v-btn>
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
                      v-model="editedItem.name"
                      label="Nome"
                      :rules="nameRules"
                      :counter="50"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="3">
                    <v-text-field
                      v-model="editedItem.cpf"
                      label="CPF"
                      :rules="nameRules"
                      :counter="14"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.cidade"
                      label="Cidade"
                      :rules="nameRules"
                      :counter="20"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.endereco"
                      label="Endereço"
                      :rules="nameRules"
                      :counter="20"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
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
                      label="CEP"
                      :rules="nameRules"
                      :counter="10"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="2">
                    <v-text-field
                      v-model="editedItem.telefone"
                      label="Telefone"
                      :rules="nameRules"
                      :counter="16"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="3">
                    <v-select
                      v-model="editedItem.curso"
                      :items="cursos"
                      :error-messages="selectErrors"
                      label="Curso"
                      :rules="nameRules"
                      @change="$v.select.$touch()"
                      @blur="$v.select.$touch()"
                    ></v-select>
                  </v-col>

                  <!-- DATA -->
                  <v-col cols="12" sm="6" md="4">
                    <v-dialog
                      ref="dialog"
                      v-model="modal"
                      :return-value.sync="editedItem.date"
                      persistent
                      width="290px"
                    >
                      <template v-slot:activator="{ on }">
                        <v-text-field
                          v-model="editedItem.date"
                          label="Data de Nascimento"
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

                  <v-col cols="12" sm="6" md="3">
                    <v-text-field
                      v-model="editedItem.rg"
                      label="RG"
                      :rules="nameRules"
                      :counter="13"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="2">
                    <v-text-field
                      v-model="editedItem.orgaoExpedidor"
                      label="Orgão Expedidor"
                      :rules="nameRules"
                      :counter="3"
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
                    <v-row justify="space-around">
                      <label for>
                        Situação do Aluno
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
      cursos: ["Técnico em Zootecnia", "Técnico em Informática", "Técnico em Agropecuária", "Técnico em Alimentos", "Licenciatura em Ciências Agrárias", "Licenciatura em Ciências da Computação", "Ensino Médio"],
      nameRules: [v => !!v || "Campo Obrigatório"],
      headers: [
        {
          text: "Nome",
          align: "left",
          value: "name"
        },
        { text: "Cidade", value: "cidade" },
        { text: "Telefone", value: "telefone", sortable: false },
        { text: "Curso", value: "curso", sortable: false },
        { text: "Status", value: "status" },
        { text: "Ações", value: "action", sortable: false }
      ],
      alunos: [],
      editedIndex: -1,
      editedItem: {
        name: "",
        endereco: "",
        bairro: "",
        cidade: "",
        rg: "",
        orgaoExpedidor: "",
        uf: "",
        cep: "",
        cpf: "",
        telefone: "",
        date: "",
        status: this.showActived ? true : false,
        curso: "",
      },
      defaultItem: {
        name: "",
        endereco: "",
        bairro: "",
        cidade: "",
        rg: "",
        orgaoExpedidor: "",
        uf: "",
        cep: "",
        cpf: "",
        telefone: "",
        date: "",
        status: this.showActived ? true : false,
        curso: "",
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
      this.alunos = [
        {
          name: "Jonivaldo Ferreira Santos",
          cidade: "Senhor do Bonfim",
          bairro: "Bairro Qualquer",
          endereco: "Endereço Qualquer",
          uf: "BA",
          cep: "98809-000",
          cpf: "136.632.136-90",
          rg: "09.098.091-12",
          orgaoExpedidor: "SSP",
          telefone: "(74) 9 9145-2342",
          date: "1987/05/01",
          status: "true",
          curso: this.cursos[0]
        }
      ];
    },

    editItem(item) {
      this.editedIndex = this.alunos.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      const index = this.alunos.indexOf(item);
      confirm("Deseja realmente excluir o item?") &&
        this.alunos.splice(index, 1);
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
        Object.assign(this.alunos[this.editedIndex], this.editedItem);
      } else {
        this.alunos.push(this.editedItem);
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
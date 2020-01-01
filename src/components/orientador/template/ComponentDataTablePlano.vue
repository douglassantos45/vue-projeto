<template>
  <v-content>
    <v-container>
      <v-card>
        <v-toolbar flat color="primary" dark>
          <v-toolbar-title>Plano de Estágio</v-toolbar-title>
        </v-toolbar>
        <v-container fluid>
          <v-row align="center">
            <v-col>
              <v-select
                v-model="selectEstagiario"
                :items="estagiarios"
                label="Estagiário(s)"
                multiple
                chips
                hint="Selecionar estagiário para plano de estágio"
                persistent-hint
                required
              ></v-select>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12" md="6">
              <v-textarea
                name="input-7-1"
                label="Objetivo"
                hint="Objetivo do plano de estágio"
                persistent-hint
                auto-grow
                rows="1"
                required
              ></v-textarea>
            </v-col>

            <v-col cols="12" md="6">
              <v-textarea
                name="input-7-1"
                label="Competências"
                hint="Competências do plano de estágio"
                persistent-hint
                auto-grow
                rows="1"
                required
              ></v-textarea>
            </v-col>
            <v-col cols="12" md="6">
              <div v-for="(formulario, id) in formulario" v-bind:key="id">
                <v-text-field
                  name="form[]"
                  v-model="formulario.form"
                  label="Atividades"
                  hint="Atividades do plano de estágio"
                  required
                >
                  <v-icon
                    slot="append"
                    @click="add_form(this)"
                    class="pointer"
                    color="blue"
                  >mdi-plus</v-icon>
                  <v-icon slot="prepend" @click="del_form(id)" class="pointer" color="red">mdi-minus</v-icon>
                </v-text-field>
              </div>
            </v-col>
          </v-row>
          <div class="my-2">
            <div class="text-center">
              <v-btn
                :disabled="dialogSend"
                :loading="dialogSend"
                small
                class="white--text"
                color="primary"
                @click="dialogSend = true"
              >
                Enviar
                <v-icon small class="ml-2">mdi-send</v-icon>
              </v-btn>
            </div>
          </div>
        </v-container>
      </v-card>
    </v-container>
  </v-content>
</template>

<script>
export default {
  name: "ComponentDataTablePlano",
  data() {
    return {
      dialogSend: false,
      formulario: [{ form: "" }],
      selectEstagiario: [],
      estagiarios: [
        "Smith Johnson Williams",
        "Brown Jones",
        "Miller Davis Garcia",
        "Rodriguez Wilson Martinez",
        "Anderson Taylor",
        "Thomas McCarton James"
      ]
    };
  },
  watch: {
    dialogSend(val) {
      if (!val) return;
      setTimeout(() => (this.dialogSend = false), 2000);
    }
  },
  methods: {
    add_form() {
      this.formulario.push({ form: "" });
    },
    del_form(id) {
      if (this.formulario.length == 1) {
        console;
      } else {
        this.formulario.splice(id, 1);
      }
    }
  }
};
</script>

<style>
.pointer {
  cursor: pointer;
}
</style>

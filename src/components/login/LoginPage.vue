<template>
  <v-app id="inspire">
    <v-content>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <v-card class="elevation-12">
              <v-toolbar color="primary" dark flat>
                <v-toolbar-title>Iniciar Sessão</v-toolbar-title>
                <v-spacer />
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field
                    label="Usuário"
                    v-model="user"
                    name="login"
                    prepend-icon="mdi-account"
                    :rules="[rules.required]"
                    type="text"
                  />
                  <v-text-field
                    id="password"
                    v-model="password"
                    prepend-icon="mdi-lock"
                    :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                    :rules="[rules.required]"
                    :type="show ? 'text' : 'password'"
                    name="password"
                    label="Senha"
                    @click:append="show = !show"
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions class="mr-2">
                <v-btn color="purple" dark class="ml-2">Solicitar Login</v-btn>
                <v-spacer />
                <v-btn
                  :loading="loading"
                  :disabled="loading"
                  color="primary"
                  class="ma-2 white--text"
                  @click="loader = 'loading'"
                >Login</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>
<script>
export default {
  name: "LoginPage",
  data() {
    return {
      password: "",
      user: "",
      loader: null,
      loading: false,
      show: false,
      rules: {
        required: value => !!value || "Campo Obrigatório.",
        emailMatch: () => "The email and password you entered don't match"
      }
    };
  },
  watch: {
    loader() {
      if (this.user === "" || this.password === "") {
        this.loading = false;
      } else {
        const l = this.loader;
        this[l] = !this[l];

        setTimeout(() => (this[l] = false), 3000);

      }
      this.loader = null;
    }
  }
};
</script>

<style>
</style>
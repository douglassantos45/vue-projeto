<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app clipped>
      <v-list dense>
        <router-link to="/">
          <v-list-item link>
            <v-list-item-action>
              <v-icon>mdi-home-variant</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Home</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </router-link>
        <!--Fim Home-->
        <router-link to="/empresa">
          <v-list-item link>
            <v-list-item-action>
              <v-icon>mdi-home-modern</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Empresa</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </router-link>
        <!--Fim Empresa-->
        <v-list-item link>
          <v-list-item-action>
            <v-icon>mdi-account</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Supervisor</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <!--Fim Supervisor-->
        <v-list-item link>
          <v-list-item-action>
            <v-icon>mdi-clipboard-account</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Estágio</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <!--Fim Estagio-->
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app clipped-left>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title>IF Baiano</v-toolbar-title>
      <v-spacer></v-spacer>
      <span>Douglas</span>
      <v-btn icon>
        <v-icon>mdi-logout</v-icon>
      </v-btn>
    </v-app-bar>

    <v-content>
      <v-container fluid>
        <Content />
      </v-container>
    </v-content>

    <v-footer app>
      <span>&copy; 2019</span>
    </v-footer>
  </v-app>
</template>

<script>
import Content from "../Content";
export default {
  name: "Dashboard",
  components: { Content },

  props: {
    source: String
  },
  data: () => ({
    drawer: null
  }),
  created() {
    this.$vuetify.theme.dark = false;
  }
};
</script>

<style>
</style>
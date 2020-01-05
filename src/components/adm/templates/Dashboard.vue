<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app clipped>
      <v-list dense class="mt-4">
        <router-link to="/campus">
          <v-list-item link>
            <v-list-item-action>
              <v-icon>mdi-home-modern</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Campus</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </router-link>
        <!--Fim Empresa-->
        <router-link to="/nucleo">
          <v-list-item link>
            <v-list-item-action>
              <v-icon>mdi-account</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Nucleo</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </router-link>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app clipped-left>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title>IF Baiano</v-toolbar-title>
      <v-spacer></v-spacer>
      <span>Douglas</span>
      <router-link to="/logout">
        <v-btn icon>
          <v-icon>mdi-logout</v-icon>
        </v-btn>
      </router-link>
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
 a {
    text-decoration: none;
  }

</style>
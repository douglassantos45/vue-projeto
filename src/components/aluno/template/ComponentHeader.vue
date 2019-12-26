<template>
  <div>
    <v-app-bar app clipped-right color="cyan " dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title>IF Baiano</v-toolbar-title>
      <v-spacer />
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" app>
      <v-list dense class="mt-4">
        <v-list-item>
          <v-avatar color="indigo" size="32">
            <span class="white--text"></span>
          </v-avatar>
          <v-list-item-content>
            <v-list-item-title class="ml-3">Douglas da Silva Santos</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
         <v-divider class="mt-3"></v-divider>

        <v-list>
          <v-list-item link class="mt-2">
            <v-list-item-icon>
              <v-icon>mdi-home</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item>
          <v-list-group >
            <template v-slot:activator>
              <v-list-item-icon>
                <v-icon>mdi-settings</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Ações</v-list-item-title>
            </template>

            <v-list-item link class="ml-12">
              <v-list-item-title>Cadastrar Horário</v-list-item-title>
              <v-list-item-icon>
                <v-icon>mdi-calendar-clock</v-icon>
              </v-list-item-icon>
            </v-list-item>

            <v-list-item link class="ml-12">
              <v-list-item-title >Visualizar Situação</v-list-item-title>
              <v-list-item-icon>
                <v-icon>mdi-checkbox-marked-circle-outline</v-icon>
              </v-list-item-icon>
            </v-list-item>
          </v-list-group>
        </v-list>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
export default {
  name: "ComponentHeader",
  props: {
    source: String
  },
  data: () => ({
    drawer: null,
    drawerRight: null,
    right: false
  })
};
</script>

<style>
.pointer {
  cursor: pointer;
}
</style>
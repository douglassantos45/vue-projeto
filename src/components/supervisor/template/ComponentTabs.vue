<template>
  <v-content>
    <v-container>
      <v-card>
        <v-toolbar flat color="cyan" dark>
          <v-toolbar-title>User Profile</v-toolbar-title>
        </v-toolbar>
        <v-tabs>
          <v-tab>Cadastrar Avaliação</v-tab>
          <v-tab>Visualizar Plano de Estágio</v-tab>

          <v-tab-item>
            <v-card flat>
              <v-card-text>
                <Avaliacao />
              </v-card-text>
            </v-card>
          </v-tab-item>
          <v-tab-item>
            <v-card flat>
              <v-card-text>
                <ViewPlanoEstagio />
              </v-card-text>
            </v-card>
          </v-tab-item>
        </v-tabs>
      </v-card>
    </v-container>
  </v-content>
</template>

<script>
import Avaliacao from './ComponentAvaliacao'
import ViewPlanoEstagio from './ViewPlanoEstagio'

export default {
  name: "ComponentTabs",
  components: { Avaliacao, ViewPlanoEstagio }
};
</script>

<style>
</style>
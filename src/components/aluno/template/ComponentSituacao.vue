<template>
  <div>
    <v-content>
      <v-container>
        <v-card>
          <v-tabs vertical class="text-justify">
            <v-tab>
              <v-icon left>mdi-account</v-icon>Notas do Supervisor
            </v-tab>
            <v-tab>
              <v-icon left>mdi-lock</v-icon>Notas da Defesa do Estágio
            </v-tab>
            <v-tab>
              <v-icon left>mdi-lock</v-icon>Option 3
            </v-tab>
            <v-tab-item>
              <v-card flat>
                <v-card-text>
                  <!-- COMPETENCIAS -->
                  <Competencias />
                </v-card-text>
              </v-card>
            </v-tab-item>
            <v-tab-item>
              <v-card flat>
                <v-card-text>
                  <!-- AVALIAÇÃO -->
                  <Avaliacao />
                </v-card-text>
              </v-card>
            </v-tab-item>
            <v-tab-item>
              <v-card flat>
                <v-card-text>
                  <p>Fusce a quam. Phasellus nec sem in justo pellentesque facilisis. Nam eget dui. Proin viverra, ligula sit amet ultrices semper, ligula arcu tristique sapien, a accumsan nisi mauris ac eros. In dui magna, posuere eget, vestibulum et, tempor auctor, justo.</p>

                  <p
                    class="mb-0"
                  >Cras sagittis. Phasellus nec sem in justo pellentesque facilisis. Proin sapien ipsum, porta a, auctor quis, euismod ut, mi. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nam at tortor in tellus interdum sagittis.</p>
                </v-card-text>
              </v-card>
            </v-tab-item>
          </v-tabs>
        </v-card>
      </v-container>
    </v-content>
  </div>
</template>

<script>
import Competencias from "./ComponentCompetencias";
import Avaliacao from "./ComponentAvaliacaoEstagio";

export default {
  name: "ComponentSituacao",
  components: { Competencias, Avaliacao }
};
</script>
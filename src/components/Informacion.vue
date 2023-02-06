<template>
  <v-container>
    <div>
      <v-alert outlined color="purple">
        <div class="text-h6">
          <v-icon color="purple"> mdi-account-group </v-icon>
          Cantidad total de alumnos permitidos:
          <strong> {{ totalCupos }}</strong> alumnos.
        </div>
      </v-alert>
    </div>
    <div>
      <v-alert outlined color="info">
        <div class="text-h6">
          <v-icon color="info">mdi-account-multiple-check</v-icon>
          Cantidad total de alumnos inscritos:
          <strong>{{ totalInscritos }}</strong> alumnos.
        </div>
      </v-alert>
    </div>
    <div>
      <v-alert outlined color="warning">
        <div class="text-h6">
          <v-icon color="warning">mdi-account-clock</v-icon>
          Cantidad total de cupos restantes:
          {{ cuposRestantes }} alumnos.
        </div>
      </v-alert>
    </div>
    <div>
      <v-alert outlined color="red">
        <div class="text-h6">
          <v-icon color="red">mdi-block-helper</v-icon>
          Cantidad total de cursos terminados:
          {{ totalCursosTerminados }} cursos.
        </div>
      </v-alert>
    </div>
    <div>
      <v-alert outlined color="brown">
        <div class="text-h6">
          <v-icon color="brown">mdi-bell-ring</v-icon>
          Cantidad total de cursos activos:
          {{ cursosActivos }} cursos.
        </div>
      </v-alert>
    </div>
    <div>
      <v-alert outlined color="warning">
        <div class="text-h6">
          <v-icon color="warning">mdi-bell-ring</v-icon>
          Cantidad total de cursos:
          {{ totalCursos }}
        </div>
      </v-alert>
    </div>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters([
      "totalCupos",
      "totalInscritos",
      "totalCursos",
      "cuposRestantes",
      "totalCursosTerminados",
      "totalCursos",
    ]),
    cursosActivos(){
      return this.totalCursos - this.totalCursosTerminados
    }

  },
};
</script>

<style>
</style>
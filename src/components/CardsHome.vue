<template>
  <v-container grid-list-md>
    <v-layout row wrap>
      <v-flex xs12 sm4 v-for="(curso, index) in mostarCursos" :key="index">
        <v-card color="grey lighten-3" height="800">
          <v-img :src="curso.imagen" height="300"></v-img>
          <v-card-title class="black--text mt-8">
            <v-toolbar-title class="text-h6 black--text pl-0">
              {{ curso.nombre }}
            </v-toolbar-title>
          </v-card-title>
          <v-card-text>
            <div class="font-weight-bold ml-8 mb-2">Información</div>

            <v-timeline align-top dense>
              <v-timeline-item small>
                <div>
                  <div class="font-weight-normal">
                    <strong>Costo: $ {{ curso.costo }}</strong>
                  </div>
                  <div>Duracion: {{ curso.duracion }}</div>
                </div>
              </v-timeline-item>
              <v-timeline-item small>
                <div>
                  <div class="font-weight-normal">
                    <strong>Cupos: {{ curso.cupo }}</strong>
                  </div>
                  <div>Completado: {{ curso.estado ? "No" : "Si" }}</div>
                </div>
              </v-timeline-item>
              <v-timeline-item small>
                <div>
                  <div class="font-weight-normal">
                    <strong>Fecha de Registro:</strong>
                  </div>
                  <div>{{ curso.fecha }}</div>
                </div>
              </v-timeline-item>
              <v-timeline-item small>
                <div>
                  <div class="font-weight-normal">
                    <strong>Descripcion:</strong>
                  </div>
                  <div>{{ curso.descripcion }}</div>
                </div>
              </v-timeline-item>
            </v-timeline>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["mostarCursos"]),
  },
  created() {
    this.$store.dispatch("traerCursos");
  },
  
};
</script>
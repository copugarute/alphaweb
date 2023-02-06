<template>
  <v-container>
    <h1 class="text-center my-5 text-h3 font-weight-light">Lista de Cursos</h1>
    <p></p>
    <cards-home />
  </v-container>
</template>

<script>
import CardsHome from "../components/CardsHome.vue";
import { mapState } from "vuex";

export default {
  name: "Home",
  components: {
    CardsHome,
  },
  computed: {
    ...mapState(["cursos"]),
  },
  created() {
    this.$store.dispatch("traerCursos");
  },
};
</script>

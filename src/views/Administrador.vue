<template>
  <v-container>
    <h1 class="text-center my-5 text-h3 font-weight-light">Administracion</h1>
    <v-btn color="primary" class="mr-5 my-5" @click="dialog = true">
      Agregar
    </v-btn>
    <div>
      <v-dialog v-model="dialog" max-width="750" persistent>
        <formularioagregar
          :dialog="dialog"
          @dialogHijo="dialog = $event"
        ></formularioagregar>
      </v-dialog>
    </div>
    <div>
      <TablaAdministrador />
    </div>
    <div>
      <informacion />
    </div>
  </v-container>
</template>
<script>
import Formularioagregar from "../components/Formularioagregar.vue";
import Informacion from "../components/Informacion.vue";
import TablaAdministrador from "../components/TablaAdministrador.vue";

export default {
  name: "Administrador",

  components: {
    TablaAdministrador,
    Formularioagregar,
    Informacion,
  },
  data() {
    return {
      dialog: false,
    };
  },
};
</script>
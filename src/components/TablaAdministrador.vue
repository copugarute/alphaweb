<template>
  <!--COMIENZO TABLA-->
  <v-container>
    <v-row>
      <v-col>
        <v-data-table
          :headers="headers"
          :items="mostarCursos"
          class="elevation-1"
          height="auto"
        >
          <template v-slot:[`item.costo`]="{ item }">
            <v-chip color="green" dark> $ {{ item.costo }} </v-chip>
          </template>
          <template v-slot:[`item.estado`]="{ item }">
            <v-chip :color="item.estado ? 'grey' : 'blue'" dark>
              {{ item.estado ? "Si" : "No" }}
            </v-chip>
          </template>
          <template v-slot:[`item.fecha`]="{ item }">
            <v-chip color="green" dark>
              {{ item.fecha  }}
            </v-chip>
          </template>
          <template v-slot:[`item.actions`]="{ item }">
            <div class="d-flex">
              <v-icon small class="mr-2" @click="botonEditar(item)">
                mdi-pencil
              </v-icon>
              <popup
                :valid="valid"
                :msg="msg"
                :texto="texto"
                @click="crearMsg"
                @aceptado="botonEliminar(item)"
              ></popup>
            </div>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
import Popup from "./Popup.vue";

export default {
  name: "TablaAdministrador",
  components: {
    Popup,
  },
  data() {
    return {
      //DATA TABLE
      valid: true,
      msg: "",
      texto: "Borrar",
      headers: [
        {
          text: "Cursos",
          align: "start",
          sortable: false,
          value: "nombre",
        },
        { text: "Cupos", value: "cupos", sortable: false },
        { text: "Inscritos", value: "inscritos", sortable: false },
        { text: "Duracion", value: "duracion", sortable: false },
        { text: "Costo", value: "costo", sortable: false },
        { text: "Terminado", value: "estado", sortable: false },
        { text: "Fecha", value: "fecha", sortable: false },
        { text: "Acciones", value: "actions", sortable: false },
      ],
    };
  },
  created() {
    this.$store.dispatch("traerCursos");
  },
  update() {
    this.$store.dispatch("traerCursos");
  },
  computed: {
    ...mapGetters(["mostarCursos"]),
  },
  methods: {
    crearMsg() {
      this.msg = "¿Desea eliminar este curso?";
    },
    botonEditar(item) {
      this.$router.push(`/editar/${item.key}`);
    },
    botonEliminar(item) {
      this.$store.dispatch("eliminarCurso", item.key);
      alert("Curso eliminado");
      this.$router.push("/home");
    },
  },
};
</script>
<template>
  <v-container>
    <v-row justify="center">
      <v-card elevation="5">
        <h1 class="text-center pt-5 text-h3 font-weight-light">
          Agregar Curso
        </h1>
        <v-form ref="form" v-model="valid" lazy-validation class="px-5 py-5">
          <v-text-field
            v-model="nuevoCurso.nombre"
            :counter="100"
            :rules="nameRules"
            label="Nombre"
            required
          ></v-text-field>

          <v-text-field
            v-model="nuevoCurso.imagen"
            label="Url de la imagen del curso"
            required
          ></v-text-field>

          <v-text-field
            v-model="nuevoCurso.cupos"
            :rules="numberRules"
            label="Cupos del curso"
            type="number"
            required
          ></v-text-field>

          <v-text-field
            v-model="nuevoCurso.inscritos"
            :rules="inscritosRules"
            label="Inscritos en el curso"
            type="number"
            required
          ></v-text-field>

          <v-text-field
            v-model="nuevoCurso.duracion"
            label="Duracion del curso"
            required
          ></v-text-field>

          <v-text-field
            v-model="nuevoCurso.costo"
            :rules="numberRules"
            label="Costo del curso"
            type="number"
            required
          ></v-text-field>

          <v-text-field
            v-model="nuevoCurso.codigo"
            label="codigo del curso"
            required
          ></v-text-field>

          <v-textarea
            solo
            v-model="nuevoCurso.descripcion"
            name="input-7-4"
            label="Descripcion del curso"
          ></v-textarea>

          <v-text-field
            v-model="nuevoCurso.fecha"
            label="fecha de registro"
            required
            disabled
          ></v-text-field>

          <template>
            <v-container class="px-0" fluid>
              <v-switch
                v-model="nuevoCurso.estado"
                :label="`Terminado: ${this.nuevoCurso.estado}`"
              ></v-switch>
            </v-container>
          </template>
          <v-btn
            :disabled="!valid"
            color="success"
            class="mr-4"
            @click="popup = true"
          >
            AGREGAR
          </v-btn>

          <v-btn color="error" class="mr-4" @click="reset">
            LIMPIAR FORMULARIO
          </v-btn>

          <v-btn color="warning" class="mr-4" @click="resetValidation">
            LIMPIAR VALIDACION
          </v-btn>
          <v-btn color="primary" class="mr-4" @click="cerrarDialog">
            Cerrar
          </v-btn>
        </v-form>
      </v-card>
    </v-row>
    <v-dialog v-model="popup" width="500" persistent>
      <v-card>
        <v-card-title class="text-h5">
          ¿Desea agregar este curso?
        </v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="agregarCurso">
            Agregar
          </v-btn>
          <v-btn color="green darken-1" text @click="popup = false">
            Cerrar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>
<script>
export default {
  data() {
    return {
      popup: false,
      dialogHijo: false,
      nuevoCurso: {
        nombre: "",
        url: "",
        cupos: 0,
        inscritos: 0,
        duracion: "",
        costo: 0,
        codigo: "",
        descripcion: "",
        fecha:'',
        estado: false,
      },
      valid: true,
      nameRules: [
        (v) => !!v || "Name is required",
        (v) => (v && v.length <= 100) || "Ingrese nombre de curso",
      ],
      numberRules: [
        (v) => !!v || "Number is required",
        (v) => Number(v) >= 0 || "Ingrese número correcto",
      ],
      inscritosRules: [
        (v) => !!v || "Number is required",
        (v) => Number(v) <= this.nuevoCurso.cupos || "exede cupo",
      ],
    };
  },
  props: ["dialog"],

computed:{
  
},
  mounted() {
    this.$store.dispatch("traerCursos");
  },
  created(){
    this.formatoFecha()
  },

  methods: {
    formatoFecha(){
    let current = new Date()
    let date = current.getDate()+'-'+(current.getMonth())+'-'+current.getFullYear();
     this.nuevoCurso.fecha = date
    return date
  },
    validate() {
      this.$refs.form.validate();
      this.popup = true;
    },
    reset() {
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    },
    cerrarDialog() {
      this.$emit("dialogHijo", this.dialogHijo);
    },
    agregarCurso() {
      this.$store.dispatch("agregarCurso", this.nuevoCurso);
      alert("Usuario Agregado");
      this.$router.push("/home");
    },
  },
};
</script>
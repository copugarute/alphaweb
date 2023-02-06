<template>
  <v-container>
    <h1 class="text-center my-5 text-h3 font-weight-light">
      Editando el curso:
    </h1>
    <v-card elevation="5">
      <v-form
        ref="form"
        v-model="valid"
        lazy-validation
        class="px-5 py-5"
        @submit.prevent="editarCurso"
      >
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
          :counter="reiniciarCurso"
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
          v-model="nuevoCurso.descripcion"
          solo
          name="input-7-4"
          label="Descripcion del curso"
        ></v-textarea>

        <v-text-field
          v-model="nuevoCurso.fecha"
          label="fecha de registro"
          required
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
          type="submit"
          class="mr-4"
          @click="validate"
        >
          Editar
        </v-btn>

        <v-btn color="error" class="mr-4" @click="reset">
          LIMPIAR FORMULARIO
        </v-btn>

        <v-btn color="warning" @click="resetValidation" class="mr-4">
          LIMPIAR VALIDACION
        </v-btn>

        <v-btn depressed color="primary" to="/administrador"> Atras </v-btn>
      </v-form>
    </v-card>
  </v-container>
</template>
<script>
export default {
  data() {
    return {
      valid: true,
      nuevoCurso: {
        key: this.$route.params.key,
        estado: false,
        nombre: "",
        imagen: "",
        cupos: 0,
        inscritos: "",
        duracion: "",
        costo: 0,
        codigo: "",
        descripcion: "",
        fecha: "",
      },
      nameRules: [
        (v) => !!v || "Name is required",
        (v) => (v && v.length <= 100) || "Ingrese nombre de curso",
      ],
      numberRules: [
        (v) => !!v || "Number is required",
        (v) => Number(v) >= 0 || "Ingrese numero de cupo total",
      ],
      inscritosRules: [
        (v) => !!v || "Number is required",
        (v) => Number(v) <= this.nuevoCurso.cupos || "exede cupo",
      ],
    };
  },

  created() {
    this.$store
      .dispatch("obtenerCurso", this.nuevoCurso)
      .then((dato) => {
        this.nuevoCurso.nombre = dato.nombre;
        this.nuevoCurso.codigo = dato.codigo;
        this.nuevoCurso.estado = dato.estado;
        this.nuevoCurso.costo = dato.costo;
        this.nuevoCurso.duracion = dato.duracion;
        this.nuevoCurso.descripcion = dato.descripcion;
        this.nuevoCurso.cupos = dato.cupos;
        this.nuevoCurso.inscritos = dato.inscritos;
        this.nuevoCurso.fecha = dato.fecha;
        this.nuevoCurso.imagen = dato.imagen;
      })
      .catch((error) => {
        console.log(error.message);
      });
  },

  methods: {
    editarCurso() {
      this.$store.dispatch("editarCurso", this.nuevoCurso);
      alert("Curso editado correctamente");
      this.$router.push({ path: "/administrador" });
    },
    reiniciarCurso() {
      if (this.estado == false) this.inscritos = 0;
    },

    validate() {
      this.$refs.form.validate();
    },
    reset() {
      this.$refs.form.reset();
    },
  },
};
</script>
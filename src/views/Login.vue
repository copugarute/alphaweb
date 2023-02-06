<template>
  <v-container fluid>
    <v-form
      ref="form"
      v-model="valid"
      lazy-validation
      cols="12"
      sm="12"
      class="ma-5 pa-5"
    >
      <v-row>
        <v-col>
          <h1>Login de Usuario</h1>
          <v-text-field
            v-model="inputEmail"
            :rules="emailRules"
            label="E-mail"
            required
          ></v-text-field>

          <v-text-field
            v-model="password"
            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[rules.required, rules.min]"
            :type="show1 ? 'text' : 'password'"
            name="input-10-1"
            label="Password"
            hint="At least 8 characters"
            counter
            @click:append="show1 = !show1"
          ></v-text-field>

          <v-btn
            :disabled="!valid"
            color="success"
            class="mr-4"
            @click="validate"
          >
            Iniciar
          </v-btn>

          <v-btn color="error" class="mr-4" @click="reset">
            Limpiar Formulario
          </v-btn>

          <v-btn color="warning" @click="resetValidation">
            Limpiar Validacion
          </v-btn>

          <v-btn color="info" to="/registro" class="ml-4"> Registrarse </v-btn>
        </v-col>
      </v-row>
    </v-form>
  </v-container>
</template>

<script>
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
export default {
  data: () => ({
    valid: true,
    inputEmail: "",
    emailRules: [
      (v) => !!v || "E-mail is required",
      (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
    ],

    show1: false,
    password: "",
    rules: {
      required: (value) => !!value || "Required.",
      min: (v) => v.length >= 8 || "Min 8 characters",
      emailMatch: () => `The email and password you entered don't match`,
    },
  }),

  methods: {
    validate() {
      const auth = getAuth();
      signInWithEmailAndPassword(auth, this.inputEmail, this.password)
        .then(() => {
          this.$store.commit("traerEmail", this.inputEmail);
          alert("Sesion iniciada correctamente");
          this.$router.push("home");
        })
        .catch((error) => {
          alert(error.message);
        });
    },
    reset() {
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    },
  },
};
</script>
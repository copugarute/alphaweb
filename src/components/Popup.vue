<template>
  <div>
    <v-icon small class="mr-2" @click="click"> mdi-delete </v-icon>
    <v-dialog v-model="dialog" width="500" persistent>
      <v-card>
        <v-card-title class="text-h5">
          {{ msg }}
        </v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="aceptado">
            {{ texto }}
          </v-btn>
          <v-btn color="green darken-1" text @click="dialog = false">
            Cancelar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: "Popup",
  data() {
    return {
      dialog: false,
    };
  },
  props: {
    valid: Boolean,
    msg: String,
    texto: String,
  },
  methods: {
    async click() {
      await this.$emit("click");
      if (this.valid) this.dialog = true;
    },
    async aceptado() {
      await this.$emit("aceptado");
      this.dialog = false;
    },
  },
};
</script>

<style>
</style>

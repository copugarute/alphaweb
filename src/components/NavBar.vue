<template>
  <div>
    <v-app-bar color="purple" dense flat>
      <v-app-bar-nav-icon
        class="white--text"
        @click.stop="drawer = !drawer"
      ></v-app-bar-nav-icon>
      <v-toolbar-title class="white--text text-h5"
        >Cursos AlfaWeb</v-toolbar-title
      >
      <v-spacer></v-spacer>
      <v-toolbar-title
        class="white--text subtitle-1"
        v-text="user"
      ></v-toolbar-title>
      <v-btn icon @click="delogin">
        <v-icon class="white--text">mdi-logout</v-icon>
      </v-btn>
    </v-app-bar>
    <v-navigation-drawer
      v-model="drawer"
      absolute
      bottom
      temporary
      color="purple lighten-5"
    >
      <v-list nav dense>
        <v-list-item-group
          v-model="group"
          active-class="deep-purple--text text--accent-4"
        >
          <v-list-item
            v-for="(item, index) in items"
            :key="index"
            :to="item.path"
          >
            <v-list-item-title class="subtitle-2 grey--text">
              {{ item.title }}
            </v-list-item-title>
            <v-icon class="grey--text">{{ item.icon }}</v-icon>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>
<script>
import { getAuth, signOut } from "firebase/auth";
import { mapState } from "vuex";
export default {
  data: () => ({
    drawer: false,
    group: null,
    items: [
      { title: "Home", icon: "mdi-home", path: "/home" },
      { title: "Administracion", icon: "mdi-pencil", path: "/administrador" },
    ],
  }),

  watch: {
    group() {
      this.drawer = false;
    },
  },
  computed: {
    ...mapState(["user"]),
  },
  methods: {
    delogin() {
      const auth = getAuth();
      signOut(auth)
        .then(() => {
          alert("Adios usuario");
          this.$router.push("/");
        })
        .catch((error) => {
          alert(error.message);
        });
    },
  },
};
</script>
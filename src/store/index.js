import Vue from 'vue'
import Vuex from 'vuex'
import { db } from '../main.js'
import { collection, getDocs, addDoc, doc, deleteDoc, updateDoc, getDoc } from "firebase/firestore";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    cursos: [],
    user: '',
  },
  getters: {
    mostarCursos(state) {
      return state.cursos
    },
    totalCursos(state) {
      return state.cursos.length
    },
    filtrarCupos(state) {
      return state.cursos.filter((elemento) => {
        return elemento.cupos > 0
      })
    },
    totalCupos(state, getters) {
      let suma = 0
      getters.filtrarCupos.forEach(elemento => {
        suma += parseInt(elemento.cupos)
      })
      return suma
    },
    filtrarInscritos(state) {
      return state.cursos.filter((elemento) => {
        return elemento.inscritos > 0
      })
    },
    totalInscritos(state, getters) {
      let suma = 0
      getters.filtrarInscritos.forEach((item) => {
        suma += parseInt(item.inscritos)
      })
      return suma
    },
    // filtrarCursosActivos(state) {
    //   return state.cursos.filter((elemento) => {
    //     return elemento.estado === false
    //   })
    // },
    // totalCursosActivos(state, getters) {
    //   let suma = 0
    //   getters.filtrarCursosActivos.forEach((elemento) => {
    //     suma += elemento.estado
    //   })
    //   return suma
    // },
    filtrarCursosTerminado(state) {
      return state.cursos.filter((elemento) => {
        return elemento.estado == true
      })
    },
    totalCursosTerminados(state, getters) {
      let suma = 0
      getters.filtrarCursosTerminado.forEach((elemento) => {
        suma += elemento.estado
      })
      return suma
    },
    cuposRestantes(state, getters) {
      let suma = getters.totalCupos
      getters.filtrarCupos.forEach((item) => {
        suma -= parseInt(item.inscritos)
      })
      return suma
    },
    
    
  },

  mutations: {
    mutandoCursos(state, dbCursos) {
      state.cursos = dbCursos
    },
    traerEmail(state, nuevoUser) {
      state.user = nuevoUser
    },
  },
  actions: {
    async traerCursos({ commit }) {
      let ltsCursos = []
      const querySnapshot = await getDocs(collection(db, "cursos"));
      querySnapshot.forEach((doc) => {
        ltsCursos.push({
          key: doc.id,
          codigo: doc.data().codigo,
          nombre: doc.data().nombre,
          estado: doc.data().estado,
          costo: doc.data().costo,
          duracion: doc.data().duracion,
          descripcion: doc.data().descripcion,
          cupos: doc.data().cupos,
          inscritos: doc.data().inscritos,
          imagen: doc.data().imagen,
          fecha: doc.data().fecha,
        })

      });
      commit('mutandoCursos', ltsCursos)
    },

    async agregarCurso(state, nuevoCurso) {
      try {
        const docRef = await addDoc(collection(db, "cursos"), {
          codigo: nuevoCurso.codigo,
          nombre: nuevoCurso.nombre,
          estado: nuevoCurso.estado,
          costo: nuevoCurso.costo,
          duracion: nuevoCurso.duracion,
          descripcion: nuevoCurso.descripcion,
          cupos: nuevoCurso.cupos,
          inscritos: nuevoCurso.inscritos,
          fecha: nuevoCurso.fecha,
          imagen: nuevoCurso.imagen

        });
        console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    },
    async eliminarCurso(state, key) {
      await deleteDoc(doc(db, "cursos", key))
    },
    async obtenerCurso(state, item) {
      const docRef = doc(db, 'cursos', item.key)
      const docSnap = await getDoc(docRef)
      if (docSnap.exists()) {
        return docSnap.data()
      }
      else {
        console.log('error')
        return null
      }
    },
    async editarCurso(state, item) {
      await updateDoc(doc(db, 'cursos', item.key),
        {
          codigo: item.codigo,
          nombre: item.nombre,
          estado: item.estado,
          costo: item.costo,
          duracion: item.duracion,
          descripcion: item.descripcion,
          cupos: item.cupos,
          inscritos: item.inscritos,
          fecha: item.fecha,
          imagen: item.imagen
        })
    },
  },
})

import { createStore } from 'vuex'
import createPersistedState from "vuex-persistedstate";

export default createStore({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  },

  plugins: [
    createPersistedState({
      paths: [], // variables to auto save in local storage
    })
  ],
})

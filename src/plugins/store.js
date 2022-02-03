import { createStore } from 'vuex'
import createPersistedState from "vuex-persistedstate";

export default createStore({
  state: {
    basket: [],
    components: null,
  },
  mutations: {
    pushBasket(state, newItem) {
      state.basket = [...state.basket, newItem]
    },
    clearBasket(state) {
      state.basket = []
    },

    updateComponents(state, components) {
      state.components = components
    },
  },
  actions: {
  },
  getters: {
    basket: (state) => state.basket,
    components: (state) => state.components,
  },
  modules: {
  },

  plugins: [
    createPersistedState({
      paths: ['basket'], // variables to auto save in local storage
    })
  ],
})

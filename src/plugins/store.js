import { createStore } from 'vuex'
import createPersistedState from "vuex-persistedstate";

export default createStore({
  state: {
    basket: [],
  },
  mutations: {
    pushBasket(state, newItem) {
      state.basket = [...state.basket, newItem]
    },
    clearBasket(state) {
      state.basket = []
    },
  },
  actions: {
  },
  getters: {
    basket: (state) => state.basket,
  },
  modules: {
  },

  plugins: [
    createPersistedState({
      paths: ['basket'], // variables to auto save in local storage
    })
  ],
})

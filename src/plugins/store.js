import { createStore } from 'vuex'
import createPersistedState from "vuex-persistedstate";

export default createStore({
  state: {
    basket: [],
    user: null,
    token: null,
    components: null,
    modal: {
      auth: {
        active: false,
        message: null,
      },
    }
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

    updateToken(state, token) {
      state.token = token
    },

    updateUser(state, user) {
      state.user = user
    },

    updateModalMessage(state, { modalName, message }) {
      state.modal[modalName] = {
        active: true,
        message,
      }
    },
    showModal(state, modalName) {
      state.modal[modalName] = Object.assign(
        state.modal[modalName] || {},
        { active: true }
      )
    },
    hideModal(state, modalName) {
      state.modal[modalName] = Object.assign(
        state.modal[modalName] || {},
        {
          active: false,
          message: null
        }
      )
    },
  },

  getters: {
    basket: (state) => state.basket,
    components: (state) => state.components,
    token: (state) => state.token,
    user: (state) => state.user,
    modal: (state) => state.modal,
  },

  plugins: [
    createPersistedState({
      paths: ['basket', 'token'],
    })
  ],
})

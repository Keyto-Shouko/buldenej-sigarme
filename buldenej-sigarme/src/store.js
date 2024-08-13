import { createStore } from 'vuex'
import { supabase } from './supabase' // or your auth client setup

export default createStore({
  state: {
    isAuthenticated: false,
    user: null,
  },
  mutations: {
    setAuthenticated(state, user) {
      state.isAuthenticated = !!user
      state.user = user
    }
  },
  actions: {
    async login({ commit }, { email, password }) {
      const { error, data } = await supabase.auth.signInWithPassword({ email, password })
      if (error) throw error
      commit('setAuthenticated', data.user)
    },
    async checkAuth({ commit }) {
      const { data: { user } } = await supabase.auth.getUser()
      commit('setAuthenticated', user)
    },
    async logout({ commit }) {
      await supabase.auth.signOut()
      commit('setAuthenticated', null)
    }
  }
})

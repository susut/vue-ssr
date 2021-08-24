import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export function createStore() {
  return new Vuex.Store({
    state: {
      items: []
    },
    mutations: {
      setItem(state, items) {
        Vue.set(state.items, items)
      }
    },
    actions: {
      fetchItem ({commit}) {
        return new Promise(resolve => {
          setTimeout(() => {
            resolve()
            commit('setItem', [1, 2, 3])
          }, 3000)
        })
      }
    },
    modules: {
    }
  })
} 

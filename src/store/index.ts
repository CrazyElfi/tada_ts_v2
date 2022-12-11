import Vue from 'vue'
import Vuex from 'vuex'

import { Module, createStore } from 'vuex-smart-module'
import storeModule from './modules/module'

Vue.use(Vuex)

const root = new Module({
  modules: {
    storeModule,
  },
})

const store = createStore(root)

export default store

export const smartModule = storeModule.context(store)


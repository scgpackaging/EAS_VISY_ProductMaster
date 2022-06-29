import Vue from 'vue'
import Vuex from 'vuex'
import { xApiKey } from "./utils/Constants.util";
Vue.use(Vuex)

// function GetToken() {
//   // return localStorage.getItem("UserToken");
//   return sessionStorage.getItem("UserToken");
// }

const state = {
  sidebarShow: 'responsive',
  sidebarMinimize: false,
  darkMode: false,
  URL: "https://10.50.55.15/misapi",
  ApiKey:xApiKey
  //URL : "http://10.28.58.39:8559",
}

const mutations = {
  toggleSidebarDesktop (state) {
    const sidebarOpened = [true, 'responsive'].includes(state.sidebarShow)
    state.sidebarShow = sidebarOpened ? false : 'responsive'
  },
  toggleSidebarMobile (state) {
    const sidebarClosed = [false, 'responsive'].includes(state.sidebarShow)
    state.sidebarShow = sidebarClosed ? true : 'responsive'
  },
  set (state, [variable, value]) {
    state[variable] = value
  },
  toggle (state, variable) {
    state[variable] = !state[variable]
  },
  SetURL(state, new_url) {
    state.URL = new_url
  },
  SetToken(stat, new_token) {
    stat.Token = new_token
  }
}

export default new Vuex.Store({
  state,
  mutations,
    actions: {

    },
    getters: {
      URL: state => state.URL,
      ApiKey: state => state.ApiKey
    }
})
import Vuex from 'vuex'
import Vue from 'vue'
Vue.use(Vuex)


export default new Vuex.Store({
    state: {
        router: {},
        isSmallScreen: false,
        isSugesst: true,
        mainBox: true,
    },
    mutations: {
        routerChange(state, router) {
            state.router = router
        },
        isSugesst(state, data) {
            state.isSugesst = data
        },
        mainBox(state, data) {
            state.mainBox = data
        },
        isSmallScreen(state, isSmallScreen) {
            state.isSmallScreen = isSmallScreen
        },
    }
})
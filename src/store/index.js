import Vuex from 'vuex'
import Vue from 'vue'
Vue.use(Vuex)

    
export default new Vuex.Store({
    state:{
        router:{},
        isSmallScreen:false
    },
    mutations:{
        routerChange(state,router){
            state.router=router
        },
        isSmallScreen(state,isSmallScreen){
            state.isSmallScreen=isSmallScreen
        },
    }
})
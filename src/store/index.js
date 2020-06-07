import Vue from "vue"
import Vuex from "vuex"
import module1 from "./modules/module1"
import module2 from "./modules/module2"

Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        module1,
        module2
    },
})
export default store;
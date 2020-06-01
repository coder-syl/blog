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
    state: {
        name: "old name",
        age: 18,
        sex: "女",
        shop1: 100,
        shop2: 200,
        shop3: 300,
    },
    mutations: {
        changName(state) {
            state.name = "newName"

        },
        addAge(state, num) {
            state.age += 15
        },
        changSex(state) {
            state.sex = state.age + "男"
        }
    },
    getters: {
        getShopTotal(state) {
            return state.shop1 + state.shop2 + state.shop3
        },
        getShopMoney: function (state, getters) {
            return (zhichu) => {
                return getters.getShopTotal - 200 - zhichu

            }
        }
    },
    actions: {
        useActionToChangName(context) {
            context.commit('changName')
        }
    }
})
export default store;
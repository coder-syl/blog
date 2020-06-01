const module1 =
{
    namespaced: true,

    state: {
        moudle1Value: 'module1-value',
    },

    mutations: {
        changeModule1(state, newValue) {
            console.log("1")

            state.moudle1Value = newValue
        },
    },

    getters: {
        getModules1(state) {
            return state.moudle1Value
        }
    },

    actions: {
        useActionChangeModule1({
            commit
        }, newValue) {
            commit('changeModule1', newValue)
        },
    }
}

export default module1

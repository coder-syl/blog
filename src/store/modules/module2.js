const state = {
    moudle2Value: 'module2-value',
}

const mutations = {
    changeModule1(state, newValue) {
        console.log("2")
        state.moudle2Value = newValue
    },
}

const getters = {
    getModule2(state) {
        return state.moudle2Value
    }
}

const actions = {
    useActionChangeModule2({
        commit
    }, newValue) {
        commit('changeModule2', newValue)
    },
}
export default { state, mutations, actions, getters }

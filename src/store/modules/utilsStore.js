const utilsStore = {
  namespaced: true,
  state: {
    isIndex: true
  },
  mutations: {
    changeIsIndex(state, isIndex) {
      state.isIndex = isIndex;
    }
  },
  getters: {
    getIsIndex(state) {
      return state.isIndex;
    }
  },
  actions: {
    useActionChangeIsIndex({ commit }, isIndex) {
      commit("ChangeIsIndex", isIndex);
    }
  }
};
export default utilsStore;

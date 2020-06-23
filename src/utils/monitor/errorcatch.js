import {addError } from "../../api/error/error"
function isPromise(ret) {
  return (
    ret && typeof ret.then === "function" && typeof ret.catch === "function"
  );
}
const errorHandler = (error, vm, info) => {
  // eslint-disable-next-line no-console
  console.error("抛出全局异常");
  // eslint-disable-next-line no-console
  console.error(vm);
  // eslint-disable-next-line no-console
  console.error(error);
  // eslint-disable-next-line no-console
  console.error(info);
};

function registerActionHandle(actions) {
  Object.keys(actions).forEach(key => {
    let fn = actions[key];
    actions[key] = function(...args) {
      let ret = fn.apply(this, args);
      if (isPromise(ret)) {
        return ret.catch(errorHandler);
      } else {
        // 默认错误处理
        return ret;
      }
    };
  });
}
const registerVuex = instance => {
  if (instance.$options["store"]) {
    let actions = instance.$options["store"]["_actions"] || {};
    if (actions) {
      let tempActions = {};
      Object.keys(actions).forEach(key => {
        tempActions[key] = actions[key][0];
      });
      registerActionHandle(tempActions);
    }
  }
};
const registerVue = instance => {
  if (instance.$options.methods) {
    let actions = instance.$options.methods || {};
    if (actions) {
      registerActionHandle(actions);
    }
  }
};

let VueError = {
  // eslint-disable-next-line no-unused-vars
  install: (Vue, options) => {
    /**
     * 全局异常处理
     * @param {
     * } error
     * @param {*} vm
     */
    // eslint-disable-next-line no-console
    console.log("VueErrorInstallSuc");
    Vue.config.errorHandler = errorHandler;
    Vue.mixin({
      beforeCreate() {
        registerVue(this);
        registerVuex(this);
      }
    });
    Vue.prototype.$throw = errorHandler;
  }
};

export default VueError;
//# sourceMappingURL=VueError.js.map

import { addError } from "../../api/error/error"
import errorStackParser from "error-stack-parser"
// function isPromise(ret) {
//   return (
//     ret && typeof ret.then === "function" && typeof ret.catch === "function"
//   );
// }
const errorHandler = (error, vm, info) => {
    // eslint-disable-next-line no-console
    console.error("抛出全局异常");
    // eslint-disable-next-line no-console
    console.error(vm, 'vm');
    console.error(window.location.href, 'vm');
    // eslint-disable-next-line no-console
    console.error(error.name, 'error');
    console.log(errorStackParser.parse(error)[0])
        // alert(error.stack)
        // eslint-disable-next-line no-console
    console.error(info, 'info');
    let errors = {
        content: error.message,
        errorLineNo: errorStackParser.parse(error)[0].lineNumber,
        errorFilename: errorStackParser.parse(error)[0].fileName,
        path: window.location.href,
        errorType: error.name,
        errorLevel: 1,
        userAgent: navigator.userAgent,
        errorStack: error.stack
    };
    addError(errors).then(res => {
        console.log(res);
    });
    console.log(errors);
};
// function registerActionHandle(actions) {
//   Object.keys(actions).forEach(key => {
//     let fn = actions[key];
//     actions[key] = function(...args) {
//       let ret = fn.apply(this, args);
//       if (isPromise(ret)) {
//         return ret.catch(errorHandler);
//       } else {
//         // 默认错误处理
//         return ret;
//       }
//     };
//   });
// }
// const registerVuex = instance => {
//   if (instance.$options["store"]) {
//     let actions = instance.$options["store"]["_actions"] || {};
//     if (actions) {
//       let tempActions = {};
//       Object.keys(actions).forEach(key => {
//         tempActions[key] = actions[key][0];
//       });
//       registerActionHandle(tempActions);
//     }
//   }
// };
// const registerVue = instance => {
//   if (instance.$options.methods) {
//     let actions = instance.$options.methods || {};
//     if (actions) {
//       registerActionHandle(actions);
//     }
//   }
// };
let VueError = {
    // eslint-disable-next-line no-unused-vars
    install: (Vue, options) => {    
        /**
         * 全局异常处理
         * @param {
         * } error
         * @param {*} vm
         */
        // eslint-disable-next-line no-console
        console.log("VueErrorInstallSuc");
        Vue.config.errorHandler = errorHandler;
        // Vue.mixin({
        //   beforeCreate() {
        //     registerVue(this);
        //     registerVuex(this);
        //   }
        // });
        Vue.prototype.$throw = errorHandler;
    }
};
export default VueError;
//# sourceMappingURL=VueError.js.map
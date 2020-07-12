let performanceMonitor = () => {
  console.log(
    "全局获取到",
    window.performance.getEntriesByType("paint"),
    // performance.getEntriesByType("resource"),
    "performace"
  );
};

// let vuePerformanceMonitor={
//     install:(Vue, options) => {
//         Vue.$performanceMonitor=performanceMonitor
//     }
// }

// export default vuePerformanceMonitor;

let vuePerformanceMonitor = {
  // eslint-disable-next-line no-unused-vars
  install: (Vue, options) => {
    /**
     * 全局异常处理
     * @param {
     * } error
     * @param {*} vm
     */
    // eslint-disable-next-line no-console
    console.log("vuePerformanceMonitor");
    Vue.prototype.$performanceMonitor= performanceMonitor;
    //   Vue.config.errorHandler = errorHandler;
    // Vue.mixin({
    //   beforeCreate() {
    //     registerVue(this);
    //     registerVuex(this);
    //   }
    // });
    //   Vue.prototype.$throw = performanceMonitor;
  }
};
export default vuePerformanceMonitor;
//# sourceMappingURL=VueError.js.map

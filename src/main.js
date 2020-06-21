// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "./router";
import store from "./store/index";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import VueAxios from "vue-axios";
import axios from "axios";
import globalComponents from "./components/globalComponents";
import { uploadError } from "./utils/uploadError";
Vue.use(ElementUI);
Vue.use(VueAxios, axios);
Vue.use(globalComponents);
Vue.config.productionTip = false;
// import VueQuillEditor from 'vue-quill-editor'
// vue提供的handleError句柄。一旦Vue发生异常都会调用这个方法。
Vue.config.errorHandler = function(err, vm, info) {
    // vm.$options.name, info
    uploadError({ error: err });
};
window.onerror = (...args) => {
    console.log("onerror:", args);
};
// // require styles
// import 'quill/dist/quill.core.css'
// import 'quill/dist/quill.snow.css'
// import 'quill/dist/quill.bubble.css'

// Vue.use(VueQuillEditor, /* { default global options } */)

import mavonEditor from "mavon-editor";
import "mavon-editor/dist/css/index.css";
// use
Vue.use(mavonEditor);

// /* eslint-disable no-new */
// var vue = new Vue({
//     el: '#app',
//     router,
//     store,
//     components: { App },
//     template: '<App/>'
// })
new Vue({
    el: "#app",
    router,
    store,
    render: h => h(App)
});
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
import './assets/icons/index'
import { injectJsError } from "./utils/monitor/jsError";
injectJsError();
import VueError from './utils/monitor/errorcatch'
Vue.use(VueError)

// import { uploadError } from "./utils/uploadError";
// import './utils/monitor/error-log' // error log

Vue.use(ElementUI);
Vue.use(VueAxios, axios);
Vue.use(globalComponents);
Vue.config.productionTip = false;
import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
Vue.use(VueQuillEditor, /* { default global options } */)

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
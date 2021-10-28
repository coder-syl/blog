import { createApp } from 'vue'
import App from './App.vue'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';

import router from './router'
import store from './store'
import Utils from './utils/utils'


let app = createApp(App)
app.config.globalProperties.$Utils = Utils;

app.use(Antd).use(store).use(router).mount('#app')

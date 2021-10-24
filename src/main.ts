import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import mitt from "mitt"
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';

export const mitter=mitt()


createApp(App).use(store).use(router).use(ElementPlus).mount('#app')

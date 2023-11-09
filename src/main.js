import { createApp } from 'vue'
import {createRouter, createWebHistory} from 'vue-router'

import './assets/style.css'
import App from './App.vue'

import Main from './views/Main.vue'
import Details from './views/Details.vue'

const router = createRouter({
    history: createWebHistory(),
    routes:[
        { path: '/', component: Main},
        { path: '/details/:ccn', component: Details},
    ]
});

const app= createApp(App)

app.use(router)

app.mount('#app')

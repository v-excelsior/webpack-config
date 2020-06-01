import Vue from 'vue'

import './babel.js'
import '@/styles/styles.css'
import '@/styles/styles.scss'

import App from './App.vue'

new Vue({
    render: h => h(App)
}).$mount('#app')



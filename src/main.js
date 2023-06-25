import './assets/main.css'
import '@mdi/font/css/materialdesignicons.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

// firebase

import {VueFire, VueFireAuth} from 'vuefire'
import {firebaseApp} from './config/firebase'
// fin firebase

// vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
//fin vuetify
import App from './App.vue'
import router from './router'


const app = createApp(App)

// init vuetify
const vuetify = createVuetify({
    components,
    directives
})

// use firebase
app.use(VueFire, {
    firebaseApp,
    modules: [VueFireAuth()]
})

// use vuetify
app.use(vuetify)

app.use(createPinia())
app.use(router)

app.mount('#app')

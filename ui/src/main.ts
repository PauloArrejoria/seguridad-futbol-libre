import { createApp } from 'vue'
import App from '@/App.vue'
import router from '@/router'
import vuetify from '@/plugin/vuetify'
import { createPinia } from 'pinia'
import { VueReCaptcha } from 'vue-recaptcha-v3'


const pinia = createPinia()

createApp(App)
    .use(router)
    .use(vuetify)
    .use(pinia)
    .use(VueReCaptcha, {
        siteKey: process.env.VUE_APP_RECAPTCHA_SITE_KEY,
        loaderOptions: {
            autoHideBadge: false
        }
    })
    .mount('#app')

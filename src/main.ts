// Vue imports
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// Setup Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { VNumberInput } from 'vuetify/labs/components'
import '@mdi/font/css/materialdesignicons.css'

// Plugin creation
const app = createApp(App)
const vuetify = createVuetify({
  components: {
    ...components,
    VNumberInput
  },
  directives,
  theme: {
    defaultTheme: 'dark'
  }
})

// Plugins
app.use(vuetify)
app.use(router)

// Mount app
app.mount('#app')

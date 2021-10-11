import { createApp } from 'vue'
import App from './App.vue'

import store from './store'

import VueSocketIO from 'vue-3-socket.io'

const app = createApp(App)
app.use(store)
app.use(new VueSocketIO({
  debug: true,
  connection: 'https://web-ware-final.herokuapp.com',
}))

app.mount('#app')

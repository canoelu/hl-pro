import { createApp } from 'vue'
import './plugins/assets'
import { useLoadComponent } from './load'
import setupPlugins from './plugins'
const AsyncComponent = useLoadComponent()

import App from './App.vue'
// 引入动画
import 'animate.css/animate.min.css'
// 引入标尺
import 'vue3-sketch-ruler/lib/style.css'
async function setupApp() {
  const app = createApp(App)

  app.use(setupPlugins)
  app.use(AsyncComponent)

  window['$vue'] = app

  app.mount('#app')
}

setupApp()

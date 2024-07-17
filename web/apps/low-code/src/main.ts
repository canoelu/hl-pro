import { createApp } from 'vue'
import './plugins/assets'
import {
  setupDayjs,
  setupIconifyOffline,
  setupLoading,
  setupNProgress,
  setupCustomComponents,
  setupDirectives,
} from './plugins'
import { setupStore } from './store'
import { setupRouter } from './router'
import { setupI18n } from './locales'
import App from './App.vue'
// 引入动画
import 'animate.css/animate.min.css'
// 引入标尺
import 'vue3-sketch-ruler/lib/style.css'
async function setupApp() {
  setupLoading()

  setupNProgress()

  setupIconifyOffline()

  setupDayjs()

  const app = createApp(App)

  // 挂载状态管理
  setupStore(app)

  await setupRouter(app)

  // 注册全局自定义组件
  setupCustomComponents(app)
  // 注册全局自定义指令
  setupDirectives(app)
  // 语言注册
  setupI18n(app)
  window['$vue'] = app

  app.mount('#app')
}

setupApp()

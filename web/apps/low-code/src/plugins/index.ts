import { setupLoading } from './loading'
import { setupNProgress } from './nprogress'
import { setupIconifyOffline } from './iconify'
import { setupDayjs } from './dayjs'
import { setupCustomComponents } from './customComponents'
import { setupDirectives } from './directives'
import { setupStore } from '@/store'
import { setupRouter } from '@/router'
import { setupI18n } from '@/locales'
import type { App } from "vue";
export * from './icon'

export default {
  install: async (app: App<Element>) => {
    setupLoading()

    setupNProgress()

    setupIconifyOffline()
    setupDayjs()
    setupStore(app)

    await setupRouter(app)

    // 注册全局自定义组件
    setupCustomComponents(app)
    // 注册全局自定义指令
    setupDirectives(app)
    // 语言注册
    setupI18n(app)
  }
}

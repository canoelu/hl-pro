import { reactive } from 'vue'
import { DemoDataPlugin } from '../data'

export interface IDataPlugin {
  type: string
  name: string
  component: any
  handler: any
  useTo?: string | Array<string>
  getDefaultOption?: () => any
}

class DataSource {
  private _info = reactive<{ plugins: Record<string, IDataPlugin> }>({
    plugins: {
      [DemoDataPlugin.type]: DemoDataPlugin
    }
  })

  get plugins() {
    return this._info.plugins
  }

  get componentPlugins() {
    const plugins: Record<string, IDataPlugin> = {}
    const keys = Object.keys(this.plugins)
    keys.forEach((el: string) => {
      const plugin = this.plugins[el]
      const useTo = plugin.useTo || 'COMPONENT'
      if (useTo === 'COMPONENT' || useTo.includes('COMPONENT')) {
        plugins[el] = plugin
      }
    })
    return plugins
  }

  get globalPlugins() {
    const plugins: Record<string, IDataPlugin> = {}
    const keys = Object.keys(this.plugins)
    keys.forEach((el: string) => {
      const plugin = this.plugins[el]
      const useTo = plugin.useTo || 'GLOBAL'
      if (useTo === 'GLOBAL' || useTo.includes('GLOBAL')) {
        plugins[el] = plugin
      }
    })
    return plugins
  }

  public getPlugin(type: string) {
    return this.plugins[type]
  }

  public loadPlugins(plugins: Array<IDataPlugin>) {
    plugins.forEach((el) => {
      this.plugins[el.type] = el
    })
  }
}
export default DataSource

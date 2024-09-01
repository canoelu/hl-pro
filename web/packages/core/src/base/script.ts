import { reactive } from 'vue'
import { IScriptPlugin } from '../../types'

export class ScriptState {
  private state = reactive<{ plugins: Record<string, IScriptPlugin> }>({
    plugins: {}
  })

  get plugins() {
    return this.state.plugins
  }

  get allScriptType() {
    const options: Array<{ label: string; value: string }> = []
    const keys = Object.keys(this.plugins)
    keys.forEach(el => {
      const plugin = this.plugins[el]
      options.push({
        label: plugin.name,
        value: plugin.type
      })
    })
    return options
  }

  public getPlugin(type: string) {
    return this.plugins[type]
  }

  public loadPlugins(plugins: Array<IScriptPlugin>) {
    plugins.forEach(el => {
      if (!this.plugins[el.type]) {
        this.plugins[el.type] = el
      }
    })
  }
}
export default ScriptState

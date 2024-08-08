import { useDesigner } from '@hl/core'
import type { App } from 'vue'
import { defineAsyncComponent } from 'vue'

const designerState = useDesigner()
const useLoadComponent = () => {
  return {
    install: (app: App) => {
      const moduleFilesTs: any = import.meta.glob('../../../materials/components/**/index.ts', {
        eager: true
      })
      Object.keys(moduleFilesTs).forEach((key: string) => {
        const componentOptions = moduleFilesTs[key]?.default
        if (componentOptions) {
          const { componentName, config, manifest, component, images } = componentOptions
          const name = manifest ? manifest.name : componentName
          designerState.loadMaterial(name, config,images, manifest)
          // 注册异步组件
          const asyncComp = defineAsyncComponent({
            loader: component,
            delay: 200,
            timeout: 3000
          })
          app.component(name, asyncComp)
        } else {
          console.error(`${key} is not a valid component`)
        }
      })
    }
  }
}

export { useLoadComponent }

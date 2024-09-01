import { buildDataHandler, DataMode, getMaterialInstance, Material, useCanvas, useDesigner } from '@hl/core'

export const useDragDrop = () => {
  const designer = useDesigner()
  const canvasState = useCanvas()

  const appendMaterialToEditor = async (e, materialName) => {
    // if (material.disabled) return
    try {
      e.preventDefault()
      e.stopPropagation()

      await designer.loadMaterialClazz(materialName)
      const component: Material = getMaterialInstance({ component: materialName })
      if (!component) {
        return
      }
      // 数据
      if (component.dataMode === DataMode.UNIVERSAL) {
        buildDataHandler(component)
      }

      const editorRectInfo = document.querySelector('#editor')!.getBoundingClientRect()
      const y = Math.round((e.pageY - editorRectInfo.top) / canvasState.scale)
      const x = Math.round((e.pageX - editorRectInfo.left) / canvasState.scale)
      console.log(x)
      component.changeStyle(['position', 'top'], y)
      component.changeStyle(['position', 'left'], x)
      canvasState.appendMaterial(component)
      canvasState.activateMaterial(component)
    } catch (error) {
      console.log(error)
      // window['$message'].warning(`图表正在研发中, 敬请期待...`)
    }
  }
  
  return { appendMaterialToEditor }
}

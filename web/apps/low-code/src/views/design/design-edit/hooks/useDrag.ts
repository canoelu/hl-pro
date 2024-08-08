import { DragKeyEnum } from '@/enums'
import { createComponent } from '@/material'
import { useDesignEditStore } from '@/store/modules/design/editStore'
import { EditCanvasTypeEnum } from '@/store/modules/design/type'
import { MaterialItem } from '@/typings/design'
import { JSONParse, setComponentPosition } from '@/utils'
const designStore = useDesignEditStore()

export const dropHandle = async (e: DragEvent) => {
  try {
    e.preventDefault()
    const dragData = e!.dataTransfer!.getData(DragKeyEnum.DRAG_KEY)
    console.log(dragData)
    if (!dragData) {
      return
    }
    designStore.setEditCanvas(EditCanvasTypeEnum.IS_CREATE, false)
    const dropData: Exclude<MaterialItem, ['image']> = JSONParse(dragData)
    if (dropData.disabled) return
    let newComponent = await createComponent(dropData)

    if (dropData.redirectComponent) {
      dropData.dataset && (newComponent.option.dataset = dropData.dataset)
      newComponent.chartConfig.title = dropData.title
      newComponent.chartConfig.chartFrame = dropData.chartFrame
    }

    setComponentPosition(newComponent, e.offsetX - newComponent.attr.w / 2, e.offsetY - newComponent.attr.h / 2)
    designStore.addMaterialList(newComponent, false, true)
    designStore.setTargetSelectChart(newComponent.id)
  } catch (e) {
    //TODO
  }
}
export const dragoverHandle = (e: DragEvent) => {
  e.preventDefault()
  e!.dataTransfer!.dropEffect = 'move'
}
export const mousedownHandleUnStop = (e: DragEvent) => {}
export const useMouseHandle = (e: DragEvent) => {}

export const useMousePointHandle = (e: MouseEvent) => {
  e.stopPropagation()
  e.preventDefault()
}

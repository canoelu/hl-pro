import { Material } from '../src/base'
import { EditModeEnum } from '../src/enums'

/**
 * 全局过滤器
 */
export interface IFilter {
  name: string | number
  description?: string
  express?: string
}
/**
 * 画布样式
 */
export interface ICanvasStyleData {
  width: number
  height: number
  background: any
  extraAttrs?: any
}
export interface ICanvasStyleConfig {}
export interface CanvasStyleConfig {
  formItems?: Array<IMetaContainerItem>
  mode?: string
}
export interface ICanvasState {
  ids: Set<string>
  name: string
  scale: number
  isShowEm: boolean
  activeIndex?: string
  activeMaterial?: Optional<Material>
  materialsObj: Record<string, Material>
  materials: Material[]
  canvasStyleData: ICanvasStyleData
  canvasStyleConfig: ICanvasStyleConfig
  editMode: EditModeEnum
  cavansMaterials: Material[] // 画布中的物料
  benchmarkComponent: Optional<Material>
}
export interface ICanvasOpt {}
// CANVAS存储数据
export interface IStoreCanvasData extends ICanvasAllData {
  id?: number
}

// Canvas所有的数据
export interface ICanvasAllData {
  canvasStyle: ICanvasStyleData
  canvasData: Record<string, any>[]
  dataSlotters: Array<{ type: string; config: any }>
}

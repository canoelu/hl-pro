import { ContainerType, DataMode } from '../src/enums'
import type {
  ButtonProps,
  CollapseProps,
  FormProps,
  InputNumberProps,
  InputProps,
  RadioProps,
  SelectProps,
  TabsProps
} from 'naive-ui'
import Material from '../src/base/material'
import { ConcreteComponent } from 'vue'

export interface IWorkspace {}
export type SimulatorNameType = 'desktop' | 'phone'
export type DesignerViewType = 'design' | 'code' | 'dual'

export interface ISimulatorType {
  name: SimulatorNameType
  width: number
  height: number
}
export interface IViewportBounding {
  width: number
  height: number
}
export type Class = { new (...args: any[]): any }
export interface IRequestOptions<T = any> {
  options: T
  type: string
}

export type IMaterialStyle = Record<string, string | number | boolean>
export type IMaterialProps = Record<string, any>
export interface IMaterialData {
  type: string
  otherConfig?: Record<string, any>
  requestOptions: IRequestOptions
}
export interface IBaseScript {
  type: string
  key: string
  toJSON: () => IScriptOption | undefined
  afterCallback?: (data: any, propValue: Record<string, any>) => any
}
export interface IScriptOption {
  type: string
  key: string
  [extra: string]: any
}

/**
 * 物料
 */
export interface IMaterial {
  id: string
  name: string
  component: string
  icon?: string
  style?: IMaterialStyle
  props?: IMaterialProps
  data?: IMaterialData
  subMaterials?: IMaterial[]
  script?: IScriptOption
}
export interface IMaterialConfig extends Pick<IMaterial, 'component' | 'name' | 'icon'> {
  group?: string
  id?: string
  width?: number
  height?: number
  dataMode?: DataMode
}
declare type Optional<T> = T | undefined
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
  name: string
  scale: number
  activeIndex?: number
  activeComponent?: Optional<Material>
  materialsObj: Record<string, Material>
  materials: Material[]
  canvasStyleData: ICanvasStyleData
  canvasStyleConfig: ICanvasStyleConfig
  ids: Set<string>
}
export interface ICanvasOpt {}
export type ContainerItemProps = CollapseProps | TabsProps | FormProps
export interface BaseFormProps {
  editable?: boolean
  disabled?: boolean
  required?: boolean
  defaultValue: string | number | boolean | any
  placeholder?: string
}
export type FormItemProps = SelectProps | InputProps | ButtonProps | RadioProps | InputNumberProps
export interface IMetaForm {
  label: string
  prop: string
  type?: string
  component?: string | ConcreteComponent
  showLabel?: boolean
  /**
   * @deprecated componentOptions即将弃用，建议使用props
   */
  componentOptions?: FormItemProps
  props?: FormItemProps
  children?: IMetaForm[]
}

export interface IMetaContainerItem {
  label: string
  prop: string
  showLabel?: boolean
  type?: ContainerType
  component?: string | ConcreteComponent
  /**
   * @deprecated componentOptions即将弃用，建议使用props
   */
  componentOptions?: ContainerItemProps
  props?: ContainerItemProps
  children: IMetaForm[]
}
export interface IMaterialMeta extends IMaterial {
  panel?: () => Promise<{
    size: {
      width: number
      height: number
    }
    clazz?: { new (id?: string, name?: string, icon?: string): Material }
    remoteClazz?: () => Promise<{
      default: { new (id?: string, name?: string, icon?: string): Material }
    }>
    default: {
      propValue: () => IMetaContainerItem[]
      style: () => IMetaContainerItem[]
      demoLoader: () => any
    }
    dataMode?: string
    propValueConfig?: () => IMetaContainerItem[]
    styleConfig?: () => IMetaContainerItem[]
    demoLoader?: () => any
  }>
}
/**
 * 页面属性
 */
export interface IPage {
  id: string
  route: string
  title?: string
  canvasStyle: ICanvasStyleData
  /**
   * 画布数据
   */
  canvasData: ICanvasState
}
/**
 * 全局变量
 */
export interface IVar {
  name: string | number
  type: string
  default?: string
  description?: string
}
/**
 * 全局过滤器
 */
export interface IFilter {
  name: string | number
  description?: string
  express?: string
}
export interface IRequestConfig {}
/**
 * 设计器
 */
export interface IDesignerState {
  name: string
  id: string
  activeIndex: number
  simulator?: SimulatorNameType | ISimulatorType
  activePanel?: string
  /**
   * 封面
   */
  thumbnail: string
  materialList: Material[]
  materials: Record<string, Material>
  /**
   * 页面
   */
  pageList: IPage[]
  /**
   * 全局变量
   */
  varList: IVar[]
  /**
   * 过滤器
   */
  filterList: IFilter[]
  /**
   * 全局请求配置
   */
  requestConfig?: IRequestConfig
}
export interface IPaste {
  isMouse: boolean
  x?: number
  y?: number
}
export interface IClipBoardState {
  copyData?: Material
  isCut: boolean
}

// Canvas所有的数据
export interface ICanvasAllData {
  canvasStyle: ICanvasStyleData
  canvasData: Record<string, any>[]
  dataSlotters: Array<{ type: string; config: any }>
}
// CANVAS存储数据
export interface IStoreCanvasData extends ICanvasAllData {
  id?: number
}
/*******----------快照----------**** */
export enum SnapMessageEnum {
  InitView = 'initView', // 初始化页面
  UpdateCanvas = 'UpdateCanvas', // 修改画布
  DropNode = 'dropNode',
  RemoveNode = 'RemoveNode', // 删除节点
  ReplaceNode = 'ReplaceNode',
  CloneNode = 'CloneNode',
  InsertNode = 'insertNode',
  UpdateAttribute = 'updateAttribute' // 更新属性
}
export interface IRecord {
  time: string | number
  message: SnapMessageEnum
  data: IStoreCanvasData
}
export interface ISnapData {
  _maxSize: number
  _index: number
  // 最新快照
  latest?: IRecord
  _records: IRecord[]
}

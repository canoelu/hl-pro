import { ContainerType, DataMode, FormTypeEnum } from '../src/enums'
import type {
  ButtonProps,
  CollapseProps,
  FormProps,
  InputNumberProps,
  InputProps,
  RadioProps,
  SelectProps,
  TabsProps,
  SwitchProps,
  ModalProps
} from 'naive-ui'
import Material from '../src/base/material'
import { ConcreteComponent } from 'vue'
import { ICanvasState, ICanvasStyleData, IStoreCanvasData } from './canvas'
export * from './snap'
export * from './canvas'
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

interface ICustomContainerProps {
  componentType: string | ConcreteComponent
  args: any
}
export type IContainerItemProps = CollapseProps | TabsProps | FormProps | ICustomContainerProps
export interface BaseFormProps {
  editable?: boolean
  disabled?: boolean
  required?: boolean
  defaultValue: string | number | boolean | any
  placeholder?: string
}

export interface IArrayProps extends BaseFormProps {
  count: number
  type: 'static' | 'dynamic'
  maxItem?: number
  minItem?: number
}

export interface ICustomProps extends BaseFormProps {
  componentType: string | ConcreteComponent
  args: any
}
export type IFormItemProps =
  | InputProps
  | InputNumberProps
  | ICustomProps
  | IArrayProps
  | BaseFormProps
  | SwitchProps
  | SelectProps
  | RadioProps
  | ModalProps
  | ButtonProps
export interface IMetaForm {
  label: string
  prop: string
  type?: FormTypeEnum
  component?: string | ConcreteComponent
  showLabel?: boolean
  /**
   * @deprecated componentOptions即将弃用，建议使用props
   */
  componentOptions?: IFormItemProps
  props?: IFormItemProps
  children?: IMetaForm[]
}

/**
 * 配置
 */
export interface IMetaContainerItem {
  label: string
  prop: string
  showLabel?: boolean
  type?: ContainerType
  component?: string | ConcreteComponent
  /**
   * @deprecated componentOptions即将弃用，建议使用props
   */
  componentOptions?: IContainerItemProps
  props?: IContainerItemProps
  children: IMetaForm[]
}
export interface IMaterialMeta extends IMaterial {
  name: string
  title: string
  category: string
  icon?: string
  size: {
    width: number
    height: number
  }
  dataMode?: string
  clazz?: { new (id?: string, name?: string, icon?: string): Material }
  remoteClazz?: () => Promise<{
    default: { new (id?: string, name?: string, icon?: string): Material }
  }>
  panel?: () => Promise<{
    default: {
      propValue: () => IMetaContainerItem[]
      style: () => IMetaContainerItem[]
      demoLoader: () => any
    }
  }>
  propValueConfig?: () => IMetaContainerItem[]
  styleConfig?: () => IMetaContainerItem[]
  demoLoader?: () => any
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

export interface IDOMRectStyle {
  width: number
  height: number
  left: number
  top: number
  rotate: number
}

export interface IMaterialStyle extends IDOMRectStyle {
  [propName: string]: string | number | boolean
}

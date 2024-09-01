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
export * from './snap.d'
export * from './canvas.d'
export * from './designer.d'
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
  dataMode?: DataMode
  propValue: IMetaContainerItem

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
  dataMode?: DataMode
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

export interface IRequestConfig {}

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

/**
 * TODO
 *  物料数据
 */

export type IDataAcceptor = (result: any, id?: string) => void

export interface IDataInstance {
  toJSON: () => any | undefined
  connect: (dataAcceptor: IDataAcceptor) => void
  close: () => void
  debug: (dataAcceptor: IDataAcceptor) => void
}

export type IDataHandler = new (options?: Record<string, any>, connector?: any) => IDataHandler

export interface IDataConfig {
  type: string
  dataInstance: IDataHandler
}
export interface ISlotter {
  dataConfig: IDataConfig
  changeDataConfig: (config: IDataConfig) => void
}

export interface IBaseScript {
  type: string
  key: string
  toJSON: () => IScriptOption | undefined
  afterCallback?: (data: any, propValue: Record<string, any>) => any
}

export interface IResponse {
  status: 'SUCCESS' | 'FAILED'
  data: any
  [key: string]: any
}
export interface IDataOption {
  type: string
  otherConfig?: Record<string, any>
  requestOptions: IRequestOptions
}

export interface IGroupStyle {
  gwidth: number
  gheight: number
  gleft: number
  gtop: number
  grotate: number
}

export interface Hooks {
  useProp: <T>(
    component: Material,
    callbackProp?: (prop: string, key: string, value: any) => void,
    callbackStyle?: (key: string, value: any) => void
  ) => {
    propValue: any
  }
  useData: (component: Material, callbackProp?: (resp: any, _: string) => void) => void
}

export type ScriptHandler = { new (key: string, ...args: any): IBaseScript }

export interface IScriptPlugin {
  type: string
  name: string
  component: any
  handler: ScriptHandler
}

export interface IVector {
  x: number
  y: number
}

export interface DOMRectStyle {
  width: number
  height: number
  left: number
  top: number
  rotate: number
}

export type IPosition = Omit<DOMRectStyle, 'rotate'>

export interface ILocation {
  right: number
  left: number
  top: number
  bottom: number
}

export interface IActionState {
  style: IPosition
  materials: Material[]
  ids: Set<string>
}

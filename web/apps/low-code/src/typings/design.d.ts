import { MaterialPackageEnum, FilterEnum, ComponentFrameEnum } from '@/enums'

// Echarts 数据类型
interface EchartsDataType {
  dimensions: string[]
  source: any[]
}

// 组件状态
export interface StatusType {
  lock: boolean
  hide: boolean
}

// 组件配置
export type MaterialItem = {
  // 组件 key
  key: string
  // 画布组件 key
  chartKey: string
  // 右侧设置面板组件 key
  conKey: string
  // 标题
  title: string
  // 分类
  category: string
  // 分类名称
  categoryName: string
  // 所属包
  package: string
  // 归类
  chartFrame?: ComponentFrameEnum
  // 预览图
  image: string
  // 从指定路径创建创建该组件
  redirectComponent?: string
  // 组件预设的 dataset 值(图片/图标)
  dataset?: any
  // 禁用 拖拽或双击生成组件
  disabled?: boolean
  // 图标
  icon?: string
  // 事件
  configEvents?: { [T: string]: Function }
}

// 组件实例类
export interface PublicConfigType {
  id: string
  isGroup: boolean
  attr: { x: number; y: number; w: number; h: number; zIndex: number; offsetX: number; offsetY: number }
  styles: {
    [FilterEnum.FILTERS_SHOW]: boolean
    [FilterEnum.OPACITY]: number
    [FilterEnum.SATURATE]: number
    [FilterEnum.CONTRAST]: number
    [FilterEnum.HUE_ROTATE]: number
    [FilterEnum.BRIGHTNESS]: number

    [FilterEnum.ROTATE_Z]: number
    [FilterEnum.ROTATE_X]: number
    [FilterEnum.ROTATE_Y]: number

    [FilterEnum.SKEW_X]: number
    [FilterEnum.SKEW_Y]: number
    [FilterEnum.BLEND_MODE]: string
    // 动画
    animations: string[]
  }
  preview?: {
    // 预览超出隐藏
    overFlowHidden?: boolean
  }
  filter?: string
  status: StatusType
  interactActions?: InteractActionsType[]
  events: {
    baseEvent: {
      [K in BaseEvent]?: string
    }
    advancedEvents: {
      [K in EventLife]?: string
    }
    interactEvents: {
      [InteractEvents.INTERACT_ON]: InteractEventOn | undefined
      [InteractEvents.INTERACT_COMPONENT_ID]: string | undefined
      [InteractEvents.INTERACT_FN]: { [name: string]: string }
    }[]
  }
}

// 数据请求
interface requestConfig {
  request: RequestConfigType
}
export type EchartsRenderer = 'svg' | 'canvas'

export interface GlobalThemeJsonType {
  dataset?: any
  renderer?: EchartsRenderer
  [T: string]: any
}
export interface CreateMaterialType extends PublicConfigType, requestConfig {
  key: string
  chartConfig: MaterialItem
  option: GlobalThemeJsonType
  groupList?: Array<CreateMaterialType>
}

// 图表包类型
export type PackagesType = {
  [MaterialPackageEnum.CHARTS]?: MaterialItem[]
  [MaterialPackageEnum.INFORMATIONS]?: MaterialItem[]
  [MaterialPackageEnum.TABLES]?: MaterialItem[]
  [MaterialPackageEnum.PHOTOS]?: MaterialItem[]
  [MaterialPackageEnum.ICONS]?: MaterialItem[]
  [MaterialPackageEnum.DECORATES]?: MaterialItem[]
}

// 组件成组实例类
export interface CreateMaterialGroupType extends CreateMaterialType {
  groupList: Array<CreateMaterialType>
}

// 获取组件实例类中某个key对应value类型的方法
export type PickCreateComponentType<T extends keyof CreateMaterialType> = Pick<CreateMaterialType, T>[T]
export interface CreateComponentType extends PublicConfigType, requestConfig {
  key: string
  chartConfig: ConfigType
  option: GlobalThemeJsonType
  groupList?: Array<CreateComponentType>
}
// 组件成组实例类
export interface CreateComponentGroupType extends CreateComponentType {
  groupList: Array<CreateComponentType>
}

import { ChartColorsNameType, CustomColorsType, GlobalThemeJsonType } from '@/constants'
import {
  BaseEvent,
  EventLife,
  InteractActionsType,
  InteractEventOn,
  InteractEvents,
  SyncEnum,
  EditCanvasConfigEnum,
  PreviewScaleEnum
} from '@/enums'

// 操作目标
export type TargetComponentType = {
  hoverId?: string
  selectId: string[]
}
// 编辑画布属性
export enum EditCanvasTypeEnum {
  EDIT_LAYOUT_DOM = 'editLayoutDom',
  EDIT_CONTENT_DOM = 'editContentDom',
  OFFSET = 'offset',
  SCALE = 'scale',
  USER_SCALE = 'userScale',
  LOCK_SCALE = 'lockScale',
  SAVE_STATUS = 'saveStatus',
  IS_CREATE = 'isCreate',
  IS_DRAG = 'isDrag',
  IS_SELECT = 'isSelect',
  IS_CODE_EDIT = 'isCodeEdit'
}
// 坐标轴信息
// eslint-disable-next-line no-redeclare
export enum EditCanvasPositionEnum {
  START_X = 'startX',
  START_Y = 'startY',
  X = 'x',
  Y = 'y'
}

// 鼠标位置
export type MousePositionType = {
  // 开始 X
  [EditCanvasPositionEnum.START_X]: number
  // 开始 Y
  [EditCanvasPositionEnum.START_Y]: number
  // X
  [EditCanvasPositionEnum.X]: number
  // y
  [EditCanvasPositionEnum.Y]: number
}
// 滤镜/变换枚举
export enum FilterEnum {
  // 是否启用
  FILTERS_SHOW = 'filterShow',

  // 透明度
  OPACITY = 'opacity',
  // 饱和度
  SATURATE = 'saturate',
  // 对比度
  CONTRAST = 'contrast',
  // 色相
  HUE_ROTATE = 'hueRotate',
  // 亮度
  BRIGHTNESS = 'brightness',

  // 旋转
  ROTATE_Z = 'rotateZ',
  ROTATE_X = 'rotateX',
  ROTATE_Y = 'rotateY',

  // 倾斜
  SKEW_X = 'skewX',
  SKEW_Y = 'skewY',

  // 混合模式
  BLEND_MODE = 'blendMode'
}

// 组件状态
export interface StatusType {
  lock: boolean
  hide: boolean
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

export enum ComponentFrameEnum {
  // 支持 dataset 的 echarts 框架
  ECHARTS = 'echarts',
  // UI 组件框架
  NAIVE_UI = 'naiveUI',
  // 自定义带数据组件
  COMMON = 'common',
  // 无数据变更
  STATIC = 'static'
}

// 组件配置
export type MaterialItem = {
  // 组件 key
  key: string
  // 画布组件 key
  componentKey: string
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

// 数据请求
interface requestConfig {
  request: any //TODO
}
export interface CreateMaterialType extends PublicConfigType, requestConfig {
  key: string
  chartConfig: MaterialItem
  //   option: GlobalThemeJsonType
  option: any // TODO
  groupList?: Array<CreateMaterialType>
}
// 组件成组实例类
export interface CreateMaterialGroupType extends CreateMaterialType {
  groupList: Array<CreateMaterialType>
}

export interface IMenuItem {
  label: string
  key: string
  order: number
  icon?: string
  disabled?: boolean
  component?: Component
  multiple?: boolean
}
// 操作目标
export type TargetChartType = {
  hoverId?: string
  selectId: string[]
}
export type MaterialType =
  | CreateMaterialType
  | CreateMaterialGroupType
  | Array<CreateMaterialType | CreateMaterialGroupType>

// 编辑区
export type EditCanvasType = {
  // 编辑区域 DOM
  [EditCanvasTypeEnum.EDIT_LAYOUT_DOM]: HTMLElement | null
  [EditCanvasTypeEnum.EDIT_CONTENT_DOM]: HTMLElement | null
  // 偏移大小
  [EditCanvasTypeEnum.OFFSET]: number
  // 缩放
  [EditCanvasTypeEnum.SCALE]: number
  // 缩放
  [EditCanvasTypeEnum.USER_SCALE]: number
  // 锁定缩放
  [EditCanvasTypeEnum.LOCK_SCALE]: boolean
  // 初始化创建
  [EditCanvasTypeEnum.IS_CREATE]: boolean
  // 拖拽中
  [EditCanvasTypeEnum.IS_DRAG]: boolean
  // 保存状态
  [EditCanvasTypeEnum.SAVE_STATUS]: SyncEnum
  // 框选中
  [EditCanvasTypeEnum.IS_SELECT]: boolean
  // 代码编辑中
  [EditCanvasTypeEnum.IS_CODE_EDIT]: boolean
}
// 画布属性（需保存）
export type EditCanvasConfigType = {
  // ID
  [EditCanvasConfigEnum.PROJECT_ID]?: string
  // 项目名称
  [EditCanvasConfigEnum.PROJECT_NAME]?: string
  // 滤镜-启用
  [FilterEnum.FILTERS_SHOW]: boolean
  // 滤镜-色相
  [FilterEnum.HUE_ROTATE]: number
  // 滤镜-饱和度
  [FilterEnum.SATURATE]: number
  // 滤镜-亮度
  [FilterEnum.BRIGHTNESS]: number
  // 滤镜-对比度
  [FilterEnum.CONTRAST]: number
  // 滤镜-不透明度
  [FilterEnum.OPACITY]: number
  // 变换（暂不使用）
  [FilterEnum.ROTATE_Z]: number
  [FilterEnum.ROTATE_X]: number
  [FilterEnum.ROTATE_Y]: number
  [FilterEnum.SKEW_X]: number
  [FilterEnum.SKEW_Y]: number
  [FilterEnum.BLEND_MODE]: string
  // 大屏名称
  [EditCanvasConfigEnum.PROJECT_NAME]?: string
  // 大屏宽度
  [EditCanvasConfigEnum.WIDTH]: number
  // 大屏高度
  [EditCanvasConfigEnum.HEIGHT]: number
  // 背景色
  [EditCanvasConfigEnum.BACKGROUND]?: string
  // 背景图片
  [EditCanvasConfigEnum.BACKGROUND_IMAGE]?: string | null
  // 图表主题颜色
  [EditCanvasConfigEnum.CHART_THEME_COLOR]?: ChartColorsNameType
  // 自定义图表主题颜色
  [EditCanvasConfigEnum.CHART_CUSTOM_THEME_COLOR_INFO]?: CustomColorsType[]
  // 图表全局配置
  [EditCanvasConfigEnum.CHART_THEME_SETTING]: GlobalThemeJsonType
  // 图表主题颜色
  [EditCanvasConfigEnum.SELECT_COLOR]?: boolean
  // 预览展示方式
  [EditCanvasConfigEnum.PREVIEW_SCALE_TYPE]?: PreviewScaleEnum
}

export interface IDesignState {
  rightMenuShow: boolean
  mousePosition: MousePositionType
  targetComponent: TargetComponentType
  editCanvas: EditCanvasType
  materialList: MaterialType[]
  targetChart: TargetChartType
  editCanvasConfig: EditCanvasConfigType
}

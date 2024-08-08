import { RequestHttpIntervalEnum } from '@/enums'
import { IMenuItem } from '@/store/modules/design/type'
import { loadAsyncComponent } from '@/utils'
// 水印文字
export const watermarkText = '低代码平台'

// 分组名称
export const groupTitle = '分组'

export const menuList: IMenuItem[] = [
  {
    label: '物料',
    icon: 'mdi:video-input-component',
    key: 'material',
    disabled: false,
    order: 1,
    multiple: true,
    component: loadAsyncComponent(() => import('@/views/design/design-menu/modules/design-material/index.vue'))
  },
  {
    label: '图层',
    key: 'layout',
    icon: 'mdi:image-filter-none',
    disabled: false,
    order: 2,
    component: loadAsyncComponent(() => import('@/views/design/design-menu/modules/design-layout'))
  },
  {
    label: '数据源',
    icon: 'mdi:database-cog-outline',
    disabled: false,
    order: 3,
    component: loadAsyncComponent(() => import('@/views/design/design-menu/modules/design-datasource')),
    key: 'datasource'
  },
  {
    key: 'filter',
    icon: 'mdi:filter-cog-outline',
    disabled: false,
    order: 3,

    component: loadAsyncComponent(() => import('@/views/design/design-menu/modules/design-filter')),
    label: '过滤器'
  },
  {
    key: 'history',
    label: '历史记录',
    disabled: false,
    order: 3,
    icon: 'mdi:history',
    component: loadAsyncComponent(() => import('@/views/design/design-menu/modules/design-history'))
  }
]
// 主题配置
export const theme = {
  // 默认是否开启深色主题
  darkTheme: true,
  //默认主题色
  appTheme: '#51d6a9',
  appThemeDetail: null
}

// 图表初始配置(px)
export const chartInitConfig = {
  x: 50,
  y: 50,
  w: 500,
  h: 300,
  // 不建议动 offset
  offsetX: 0,
  offsetY: 0
}

// dialog 图标的大小
export const dialogIconSize = '20'

// 侧边栏宽度
export const asideWidth = '270'

// 侧边栏折叠后的宽度，支持全部折叠会覆盖为 0
export const asideCollapsedWidth = 60

// 弹窗是否可以通过点击遮罩关闭
export const maskClosable = false

// 全局边框圆角
export const borderRadius = '4px'

// 轮播间隔
export const carouselInterval = 4000

// 工作台大屏背景图片大小限制（5M）
export const backgroundImageSize = 5

// 预览展示方式
// export const previewScaleType = PreviewScaleEnum.FIT

// 编辑工作台同步到 JSON 的轮询间隔（5S）
export const editToJsonInterval = 5000

// 数据请求间隔
export const requestInterval = 30

// 工作台自动保存间隔（s）
export const saveInterval = 30

// 数据请求间隔单位
export const requestIntervalUnit = RequestHttpIntervalEnum.SECOND

// 工作区域历史记录存储最大数量
export const editHistoryMax = 100

// 拖拽时蒙层的 z-index，需比所有图表高
export const canvasModelIndex = 9999

// 框选时蒙层的 z-index，需比所有图表高
export const selectBoxIndex = canvasModelIndex + 10
export const BlendModeList = [
  { label: '正常', value: 'normal' },
  { label: '正片叠底', value: 'multiply' },
  { label: '叠加', value: 'overlay' },
  { label: '滤色', value: 'screen' },
  { label: '变暗', value: 'darken' },
  { label: '变亮', value: 'lighten' },
  { label: '颜色减淡', value: 'color-dodge' },
  { label: '颜色加深', value: 'color-burn;' },
  { label: '强光', value: 'hard-light' },
  { label: '柔光', value: 'soft-light' },
  { label: '差值', value: 'difference' },
  { label: '排除', value: 'exclusion' },
  { label: '色相', value: 'hue' },
  { label: '饱和度', value: 'saturation' },
  { label: '颜色', value: 'color' },
  { label: '亮度', value: 'luminosity' }
]

import { loadAsyncComponent } from './utils'

export const menuList = [
  {
    label: '物料',
    icon: 'mdi:video-input-component',
    key: 'material',
    disabled: false,
    order: 1,
    multiple: true,
    component: loadAsyncComponent(() => import('./pages/designer/left/modules/design-material/index'))
  },
  {
    label: '图层',
    key: 'layout',
    icon: 'mdi:image-filter-none',
    disabled: false,
    order: 2,
    component: loadAsyncComponent(() => import('./pages/designer/left/modules/design-layout/index'))
  },
  {
    label: '数据源',
    icon: 'mdi:database-cog-outline',
    disabled: false,
    order: 3,
    component: loadAsyncComponent(() => import('./pages/designer/left/modules/design-datasource/index')),
    key: 'datasource'
  },
  {
    key: 'filter',
    icon: 'mdi:filter-cog-outline',
    disabled: false,
    order: 3,

    component: loadAsyncComponent(() => import('./pages/designer/left/modules/design-filter/index')),
    label: '过滤器'
  },
  {
    key: 'history',
    label: '历史记录',
    disabled: false,
    order: 3,
    icon: 'mdi:history',
    component: loadAsyncComponent(() => import('./pages/designer/left/modules/design-history/index'))
  }
]

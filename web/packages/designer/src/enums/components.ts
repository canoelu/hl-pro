// 包分类枚举
export enum MaterialPackageEnum {
  CHARTS = 'charts',
  TABLES = 'tables',
  INFORMATIONS = 'informations',
  PHOTOS = 'photos',
  ICONS = 'icons',
  DECORATES = 'decorates',
}

// 包分类名称
export enum MaterialPackageNameEnum {
  CHARTS = '图表',
  TABLES = '列表',
  INFORMATIONS = '信息',
  PHOTOS = '图片',
  ICONS = '图标',
  DECORATES = '小组件',
}

// 获取组件
export enum FetchComFlagTypeEnum {
  VIEW,
  CONFIG,
}
export enum ComponentFrameEnum {
  // 支持 dataset 的 echarts 框架
  ECHARTS = 'echarts',
  // UI 组件框架
  NAIVE_UI = 'naiveUI',
  // 自定义带数据组件
  COMMON = 'common',
  // 无数据变更
  STATIC = 'static',
}

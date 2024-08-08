export enum SetupStoreId {
  App = 'app-store',
  Theme = 'theme-store',
  Auth = 'auth-store',
  Route = 'route-store',
  Tab = 'tab-store',
  DesignMenu = 'design-menu-store',
  DesignEdit = 'design-edit-store',
}
export enum DialogEnum {
  DELETE = 'delete',
  WARNING = 'warning',
  ERROR = 'error',
  SUCCESS = 'success',
}

// 预览展示
export enum PreviewScaleEnum {
  FIT = 'fit',
  SCROLL_Y = 'scrollY',
  SCROLL_X = 'scrollX',
  FULL = 'full',
}

export enum StorageEnum {
  // 全局设置
  HL_SETTING_STORE = 'HL_SETTING',
  // 登录信息
  HL_SYSTEM_STORE = 'HL_SYSTEM',
  // 语言
  HL_LANG_STORE = 'HL_LANG',
  // 当前选择的主题
  HL_DESIGN_STORE = 'HL_DESIGN',
  // 工作台布局配置
  HL_CHART_LAYOUT_STORE = 'HL_CHART_LAYOUT',
  // 工作台需要保存的数据
  HL_CHART_STORAGE_LIST = 'HL_CHART_STORAGE_LIST',
  // 用户存储的图片媒体
  HL_USER_MEDIA_PHOTOS = 'HL_USER_MEDIA_PHOTOS',
}
// 文件上传时的格式映射
export enum FileTypeEnum {
  // 文档
  TXT = 'text/plain',
  JSON = 'application/json',
  // 图片
  PNG = 'image/png',
  JPEG = 'image/jpeg',
  GIF = 'image/gif',
}
export * from './design'
export * from './eventEnum'
export * from './httpEnum'
export * from './components'

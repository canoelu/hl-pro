export enum DragKeyEnum {
  DRAG_KEY = 'hlDesign',
}
export enum MenuEnum {
  // 移动
  ARROW_UP = 'up',
  ARROW_RIGHT = 'right',
  ARROW_DOWN = 'down',
  ARROW_LEFT = 'left',
  // 删除
  DELETE = 'delete',
  // 复制
  COPY = 'copy',
  // 剪切
  CUT = 'cut',
  // 粘贴
  PARSE = 'parse',
  // 置顶
  TOP = 'top',
  // 置底
  BOTTOM = 'bottom',
  // 上移
  UP = 'up',
  // 下移
  DOWN = 'down',
  // 清空剪贴板
  CLEAR = 'clear',
  // 成组
  GROUP = 'group',
  // 解组
  UN_GROUP = 'unGroup',
  // 后退
  BACK = 'back',
  FORWORD = 'forward',
  // 保存
  SAVE = 'save',
  // 锁定
  LOCK = 'lock',
  // 解除锁定
  UNLOCK = 'unLock',
  // 隐藏
  HIDE = 'hide',
  // 显示
  SHOW = 'show',
}
// 鼠标点击左右键
export enum MouseEventButton {
  LEFT = 1,
  RIGHT = 2,
}

export enum WindKeyboard {
  CTRL = 'ctrl',
  SHIFT = 'shift',
  ALT = 'alt',
  CTRL_SOURCE_KEY = 'control',
  SHIFT_SOURCE_KEY = 'shift',
  ALT_SOURCE_KEY = 'alt',
  SPACE = 'Space',
}
// Mac 键盘枚举
export enum MacKeyboard {
  COMMAND = '⌘',
  SHIFT = '⇧',
  ALT = '⌥',
  COMMAND_SOURCE_KEY = '⌘',
  SHIFT_SOURCE_KEY = '⇧',
  ALT_SOURCE_KEY = '⌥',
  SPACE = 'Space',
}

// 同步状态枚举
export enum SyncEnum {
  // 等待
  PENDING,
  // 开始
  START,
  // 成功
  SUCCESS,
  // 失败
  FAILURE,
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
  BLEND_MODE = 'blendMode',
}

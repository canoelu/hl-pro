interface ILayoutConfig {
  visible?: boolean
  class?: string
  height?: number
  width?: number
  mobileSiderClass?: string
}
interface BaseLayoutHeaderConfig extends ILayoutConfig {
  /**
   *
   * @default ''
   */
  headerClass?: string
}

/** Tab config */
interface BaseLayoutTabConfig extends ILayoutConfig {
  /**
   * Tab class
   *
   * @default ''
   */
  tabClass?: string
}

/** Sider config */
interface BaseLayoutSiderConfig extends ILayoutConfig {
  /**
   * Sider class
   *
   * @default ''
   */
  siderClass?: string
  /**
   * Mobile sider class
   *
   * @default ''
   */
  mobileSiderClass?: string
  /**
   * Sider collapse status
   *
   * @default false
   */
  collapse?: boolean

  /**
   * Sider width when collapse is true
   *
   * @default '64px'
   */
  collapsedWidth?: number
}

/** Content config */
export interface BaseLayoutContentConfig {
  /**
   * Content class
   *
   * @default ''
   */
  contentClass?: string
  /**
   * Whether content is full the page
   *
   * If true, other elements will be hidden by `display: none`
   */
  fullContent?: boolean
}

/** Footer config */
export interface BaseLayoutFooterConfig extends ILayoutConfig {
  /**
   * Whether footer is fixed
   *
   * @default true
   */
  fixed?: boolean
  /**
   * Footer class
   *
   * @default ''
   */
  footerClass?: string

  /**
   * Whether footer is on the right side
   *
   * When the layout is vertical, the footer is on the right side
   */
  rightFooter?: boolean
}

/**
 * Layout mode
 *
 * - Horizontal
 * - Vertical
 */
export type LayoutMode = 'horizontal' | 'vertical'

/**
 * The scroll mode when content overflow
 *
 * - Wrapper: 外层滚动
 * - Content: 主体滚动
 *
 * @default 'wrapper'
 */
export type LayoutScrollMode = 'wrapper' | 'content'

type Kebab<S extends string> = S extends Uncapitalize<S> ? S : `-${Uncapitalize<S>}`

type KebabCase<S extends string> = S extends `${infer Start}${infer End}`
  ? `${Uncapitalize<Start>}${KebabCase<Kebab<End>>}`
  : S

type Prefix = '--hl-'

export type LayoutCssVarsProps = {
  headerHeight?: number
  headerZIndex?: number
  tabZIndex?: number
  tabHeight?: number
  siderZIndex?: number
  mobileSiderZIndex?: number
  footerZIndex?: number
  siderWidth?: number
  rightSiderWidth?: number
  siderCollapsedWidth?: number
  rightSiderCollapsedWidth?: number
  footerHeight?: number
}

export type LayoutCssVars = {
  [K in keyof LayoutCssVarsProps as `${Prefix}${KebabCase<K>}`]: string | number
}

/**
 * The mode of the tab
 *
 * - Button: button style
 * - Chrome: chrome style
 *
 * @default chrome
 */
export type PageTabMode = 'button' | 'chrome'

export interface PageTabProps {
  /** Whether is dark mode */
  darkMode?: boolean
  /**
   * The mode of the tab
   *
   * - {@link TabMode}
   */
  mode?: PageTabMode
  /**
   * The common class of the layout
   *
   * Is can be used to configure the transition animation
   *
   * @default 'transition-all-300'
   */
  commonClass?: string
  /** The class of the button tab */
  buttonClass?: string
  /** The class of the chrome tab */
  chromeClass?: string
  /** Whether the tab is active */
  active?: boolean
  /** The color of the active tab */
  activeColor?: string
  /**
   * Whether the tab is closable
   *
   * Show the close icon when true
   */
  closable?: boolean
}

export type PageTabCssVarsProps = {
  primaryColor: string
  primaryColor1: string
  primaryColor2: string
  primaryColorOpacity1: string
  primaryColorOpacity2: string
  primaryColorOpacity3: string
}

export type PageTabCssVars = {
  [K in keyof PageTabCssVarsProps as `${Prefix}${KebabCase<K>}`]: string | number
}

export interface IBaseLayout extends BaseLayoutContentConfig {
  /**
   * @default --hl-
   */
  prefix?: string
  scrollWrapperClass?: string
  /**
   * 布局模式
   * - {@link LayoutMode}
   * @default vertical
   */
  mode: LayoutMode
  /**
   * @default 'transition-all-300'
   */
  commonClass?: string
  /**
   * 头部高度
   * @default 56px
   */
  headerHeight?: number
  /**
   * 滚动元素ID
   */
  scrollElId?: string
  /**
   * tab高度
   * @default 48
   */
  tabHeight?: number
  /**
   * @default false
   */
  isMobile?: boolean

  footerHeight?: number
  maxZIndex?: number
  /**
   * 是否固定顶部
   */
  fixedTop?: boolean
  /**
   * 是否显示头部
   * @default true
   */
  headerVisible?: boolean
  /**
   * 滚动模式
   * @default content
   */
  scrollMode?: LayoutScrollMode
  header: BaseLayoutHeaderConfig
  tab: BaseLayoutTabConfig
  rightSider: BaseLayoutSiderConfig
  leftSider: BaseLayoutSiderConfig
  footer: BaseLayoutFooterConfig
}
export type SlotFn = (props?: Record<string, unknown>) => unknown
export type Slots = {
  default?: SlotFn
  header?: SlotFn
  sider?: SlotFn
  rightSider?: SlotFn
  footer?: SlotFn
  tab?: SlotFn
}
export interface Emits {
  /** Update siderCollapse */
  (e: 'update:siderCollapse', collapse: boolean): void
}

import type { AdminLayoutProps, LayoutCssVars, LayoutCssVarsProps } from '../types'

export const LAYOUT_SCROLL_EL_ID = '__SCROLL_EL_ID__'

export const LAYOUT_MAX_Z_INDEX = 100

function createLayoutCssVarsByCssVarsProps(props: LayoutCssVarsProps) {
  const cssVars: LayoutCssVars = {
    '--hl-header-height': `${props.headerHeight}px`,
    '--hl-header-z-index': props.headerZIndex,
    '--hl-tab-height': `${props.tabHeight}px`,
    '--hl-tab-z-index': props.tabZIndex,
    '--hl-sider-width': `${props.siderWidth}px`,
    '--hl-sider-collapsed-width': `${props.siderCollapsedWidth}px`,
    '--hl-sider-z-index': props.siderZIndex,
    '--hl-mobile-sider-z-index': props.mobileSiderZIndex,
    '--hl-footer-height': `${props.footerHeight}px`,
    '--hl-footer-z-index': props.footerZIndex,
  }
  return cssVars
}

/**
 * Create layout css vars
 *
 * @param props
 */
export function createLayoutCssVars(props: AdminLayoutProps) {
  const {
    mode,
    isMobile,
    maxZIndex = LAYOUT_MAX_Z_INDEX,
    headerHeight,
    tabHeight,
    siderWidth,
    siderCollapsedWidth,
    footerHeight,
  } = props

  const headerZIndex = maxZIndex - 3
  const tabZIndex = maxZIndex - 5
  const siderZIndex = mode === 'vertical' || isMobile ? maxZIndex - 1 : maxZIndex - 4
  const mobileSiderZIndex = isMobile ? maxZIndex - 2 : 0
  const footerZIndex = maxZIndex - 5

  const cssProps: LayoutCssVarsProps = {
    headerHeight,
    headerZIndex,
    tabHeight,
    tabZIndex,
    siderWidth,
    siderZIndex,
    mobileSiderZIndex,
    siderCollapsedWidth,
    footerHeight,
    footerZIndex,
  }

  return createLayoutCssVarsByCssVarsProps(cssProps)
}

import { computed, unref } from 'vue'
import { IBaseLayout, LayoutCssVars, LayoutCssVarsProps } from '../types'

export const LAYOUT_MAX_Z_INDEX = 100

export const useBaseLayout = (props: IBaseLayout) => {
  const { maxZIndex = LAYOUT_MAX_Z_INDEX } = props

  // 滚动模式
  const isWrapperScroll = computed(() => props.scrollMode === 'wrapper')
  const isContentScroll = computed(() => props.scrollMode === 'content')
  // 布局模式
  const isVertical = computed(() => props.mode === 'vertical')
  const isHorizontal = computed(() => props.mode === 'horizontal')
  const fixedHeaderAndTab = computed(() => props.fixedTop || (isHorizontal.value && isWrapperScroll.value))
  const headerZIndex = maxZIndex - 3
  const tabZIndex = maxZIndex - 5
  const siderZIndex = unref(isVertical) || props.isMobile ? maxZIndex - 1 : maxZIndex - 4
  const mobileSiderZIndex = props.isMobile ? maxZIndex - 2 : 0
  const footerZIndex = maxZIndex - 5
  const cssVars = computed(() => ({
    '--hl-header-height': `${props.header?.height}px`,
    '--hl-header-z-index': headerZIndex,
    '--hl-tab-height': `${props.tab?.height}px`,
    '--hl-tab-z-index': tabZIndex,
    '--hl-sider-width': `${props.leftSider?.width}px`,
    '--hl-right-sider-width': `${props.rightSider?.width}px`,
    '--hl-sider-collapsed-width': `${props.leftSider?.collapsedWidth}px`,
    '--hl-right-sider-collapsed-width': `${props.rightSider?.collapsedWidth}px`,
    '--hl-sider-z-index': siderZIndex,
    '--hl-mobile-sider-z-index': mobileSiderZIndex,
    '--hl-footer-height': `${props.footer?.height}px`,
    '--hl-footer-z-index': footerZIndex
  }))

  return { cssVars, fixedHeaderAndTab, isContentScroll, isWrapperScroll, isVertical, isHorizontal }
}

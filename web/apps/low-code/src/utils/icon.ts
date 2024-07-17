import SvgIcon from '@/components/custom/svg-icon.vue'

export function getLocalIcons() {
  const svgIcons = import.meta.glob('/src/assets/svg-icon/*.svg')

  const keys = Object.keys(svgIcons)
    .map((item) => item.split('/').at(-1)?.replace('.svg', '') || '')
    .filter(Boolean)

  return keys
}

/**
 * * render 图标
 *  @param icon 图标
 *  @param set 设置项
 */
export const renderIcon = (icon: any, set = {}) => {
  return () => h(SvgIcon, { props: { icon }, ...set })
}

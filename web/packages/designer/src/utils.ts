import { filterStyle, Material, stylePropToCss } from '@hl/core'
import { cloneDeep, isNumber } from 'lodash-es'
import { AsyncComponentLoader, defineAsyncComponent } from 'vue'

export function toPercent(val: number) {
  return parseFloat((val * 100).toFixed(4))
}
/**
 * * 异步加载组件
 * @param loader
 * @returns
 */
export const loadAsyncComponent = (loader: AsyncComponentLoader<any>) =>
  defineAsyncComponent({
    loader,
    // loadingComponent: AsyncLoading,
    delay: 10
  })

/**
 * 剔除指定样式，并转化为css
 * @param style  原始样式
 * @param excludes 剔除条件
 * @returns css
 */
export function excludeStyle(style: Record<string, any>, excludes: Array<string> = []) {
  let result: Record<string, string> = {}
  Object.keys(style).forEach(key => {
    if (!excludes.includes(key)) {
      const css = stylePropToCss(key, style[key])
      result = { ...result, ...css }
    }
  })

  return result
}
/**
 * 生成群组样式
 * @param style 原始样式
 * @returns css
 */

export const getGroupStyle = (style: Record<string, any>) => {
  const filters = ['gtop', 'gheight', 'gwidth', 'gleft', 'grotate']
  return filterStyle(style, filters)
}
export const getMaterialShapeStyle = (material: Material) => {
  const style = cloneDeep(material.style)
  const groupStyle = cloneDeep(material.groupStyle)
  if (groupStyle) {
    return {
      ...excludeStyle(style, ['top', 'left', 'width', 'height', 'rotate']),
      ...getGroupStyle(groupStyle)
    }
  } else {
    return excludeStyle(style, ['top', 'left', 'width', 'height', 'rotate'])
  }
}

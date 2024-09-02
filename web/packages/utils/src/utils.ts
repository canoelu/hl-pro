import html2canvas from 'html2canvas'
import { AsyncComponentLoader, defineAsyncComponent } from 'vue'
import Color from 'color'

import { isFunction, isUndefined } from 'lodash-es'
import { downloadByA } from './file'
import { DOMRectStyle, IClass, IGroupByConfig, IVector } from './types'

/**
 * * 截取画面为图片并下载
 * @param html 需要截取的 DOM
 */
export const canvasCut = (html: HTMLElement | null, callback?: Function) => {
  if (!html) {
    if (callback) callback()
    return
  }
  html2canvas(html, {
    backgroundColor: null,
    allowTaint: true,
    useCORS: true
  }).then((canvas: HTMLCanvasElement) => {
    downloadByA(canvas.toDataURL(), undefined, 'png')
    if (callback) callback()
  })
}

/**
 * * 生成一个不重复的ID
 * @param { Number } randomLength
 */
export const makeUuid = (randomLength = 10) => {
  return 'id_' + Number(Math.random().toString().substring(2, randomLength) + Date.now()).toString(36)
}

export function groupByConfig<T>(
  array: T[],
  config: IGroupByConfig<T>
): Array<{ key: string; label: string; list: T[] }> {
  console.log(array)
  const { key, label } = config
  const groupedObj = array.reduce(
    (acc, item) => {
      const keyValue = item[key] as unknown as string
      if (!acc[keyValue]) {
        acc[keyValue] = []
      }
      acc[keyValue].push(item)
      return acc
    },
    {} as Record<string, T[]>
  )

  return Object.keys(groupedObj).map(key => ({
    key,
    label: groupedObj[key][0][label] as unknown as string,
    list: groupedObj[key]
  }))
}
interface GroupedData<T> {
  label: string
  key: string
  icon?: string
  children: {
    label: string
    key: string
    icon?: string
    image?: string
    children: T[]
  }[]
}
export function groupByPackageAndCategory<T extends Record<string, any>>(
  data: T[],
  config: IGroupByConfig<T>
): GroupedData<T>[] {
  const { parent, pTitle, children, cTitle, icon, cIcon } = config

  const result = data.reduce((acc, item) => {
    const packageKey = item[parent]
    const pName = item[pTitle]
    const picon = icon ? item[icon] : ''
    const categoryKey = item[children]
    const cName = item[cTitle]
    const image = item[cIcon]
    let packageGroup = acc.find(pkg => pkg.key === packageKey)
    if (!packageGroup) {
      packageGroup = {
        label: pName,
        key: packageKey,
        icon: picon,
        children: []
      }
      acc.push(packageGroup)
    }
    let categoryGroup = packageGroup.children.find(cat => cat.key === categoryKey)
    if (!categoryGroup) {
      categoryGroup = {
        label: cName,
        key: categoryKey,
        image,
        children: []
      }
      packageGroup.children.push(categoryGroup)
    }

    categoryGroup.children.push(item)

    return acc
  }, [] as GroupedData<T>[])

  return result
}
export function singleton(className: IClass): IClass {
  let ins: IClass
  return new Proxy(className, {
    construct(target, args) {
      if (!ins) {
        ins = new target(...args)
      }
      return ins
    }
  })
}

export const copyInfo = (text: string): void => {
  const copy = (event: ClipboardEvent) => {
    event.clipboardData?.setData('text', text)
    event.preventDefault()
  }
  document.addEventListener('copy', copy)
  document.execCommand('copy')
  document.removeEventListener('copy', copy)
}
export const isClass = (varValue: any) => {
  return isFunction(varValue) && !isUndefined(varValue.prototype)
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

export const copyText = (text: string): void => {
  const copy = (event: ClipboardEvent) => {
    event.clipboardData?.setData('text', text)
    event.preventDefault()
  }
  document.addEventListener('copy', copy)
  document.execCommand('copy')
  document.removeEventListener('copy', copy)
}
/**
 * 请求动画帧的节流工具
 * @param fn 被执行的函数
 * @returns
 */
export function throttleFrame(fn: Function) {
  let timer = 0
  return function (this: any, ...args: any[]) {
    const self = this
    if (timer) {
      cancelAnimationFrame(timer)
      timer = 0
    }
    timer = requestAnimationFrame(() => {
      timer = 0
      fn.apply(self, args)
    })
  }
}


/**
 * * hsla 转换
 * @param color 颜色
 * @param alpha 默认1
 * @returns
 */
export function alpha(color: string, alpha = 1) {
  return Color(color).alpha(alpha).toString()
}
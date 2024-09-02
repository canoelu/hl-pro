import { defineAsyncComponent, AsyncComponentLoader } from 'vue'
import Image_404 from '../assets/images/exception/image-404.png'
import html2canvas from 'html2canvas'
import screenfull from 'screenfull'
import { excludeParseEventKeyList, excludeParseEventValueList } from '@/enums'

/**
 * * 获取错误处理图片，默认 404 图
 * @returns url
 */
export const requireErrorImg = () => {
  return Image_404
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
    delay: 20
  })

export const loadSkeletonAsyncComponent = (loader: AsyncComponentLoader<any>) =>
  defineAsyncComponent({
    loader,
    // loadingComponent: AsyncSkeletonLoading,
    delay: 20
  })
/**
 * * 生成一个不重复的ID
 * @param { Number } randomLength
 */
export const makeUuid = (randomLength = 10) => {
  return 'id_' + Number(Math.random().toString().substring(2, randomLength) + Date.now()).toString(36)
}
/**
 * * 判断是否是预览页
 * @returns boolean
 */
export const isPreview = () => {
  return document.location.hash.includes('preview')
}
export function isArray(p: any): p is [] {
  return Array.isArray(p)
}
export function isString(p: any): p is string {
  return typeof p === 'string'
}
export function isNumber(p: any): p is number {
  return typeof p === 'number'
}

export function isBoolean(p: any): p is boolean {
  return typeof p === 'boolean'
}
export function isUndefined(p: any): p is undefined {
  return typeof p === 'undefined'
}

export function isNull(p: any): p is null {
  return p === null
}
/**
 * * JSON序列化，支持函数和 undefined
 * @param data
 */
export const JSONStringify = <T>(data: T) => {
  return JSON.stringify(
    data,
    (key, val) => {
      // 处理函数丢失问题
      if (typeof val === 'function') {
        return `${val}`
      }
      // 处理 undefined 丢失问题
      if (typeof val === 'undefined') {
        return null
      }
      return val
    },
    2
  )
}
export const evalFn = (fn: string) => {
  var Fun = Function // 一个变量指向Function，防止前端编译工具报错
  return new Fun('return ' + fn)()
}
/**
 * TODO
 * * JSON反序列化，支持函数和 undefined
 * @param data
 */
export const JSONParse = (data: string) => {
  return JSON.parse(data, (k, v) => {
    // 过滤函数字符串
    if (excludeParseEventKeyList.includes(k)) return v
    // 过滤函数值表达式
    if (typeof v === 'string') {
      const someValue = excludeParseEventValueList.some(excludeValue => v.indexOf(excludeValue) > -1)
      if (someValue) return v
    }
    // 还原函数值
    if (typeof v === 'string' && v.indexOf && (v.indexOf('function') > -1 || v.indexOf('=>') > -1)) {
      return evalFn(`(function(){return ${v}})()`)
    } else if (typeof v === 'string' && v.indexOf && v.indexOf('return ') > -1) {
      const baseLeftIndex = v.indexOf('(')
      if (baseLeftIndex > -1) {
        const newFn = `function ${v.substring(baseLeftIndex)}`
        return evalFn(`(function(){return ${newFn}})()`)
      }
    }
    return v
  })
}

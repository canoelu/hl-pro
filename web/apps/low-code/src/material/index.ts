import { ChartList } from '@/material/components/charts/index'
import { TableList } from '@/material/components/tables/index'
import { DecorateList } from '@/material/components/decorates/index'
import { InformationList } from '@/material/components/informations/index'
import { PhotoList } from '@/material/components/photos/index'
import { PackagesType, MaterialItem } from '@/typings/design.d'
import { MaterialPackageEnum, FetchComFlagTypeEnum } from '@/enums'
import { loadAsyncComponent } from '@/utils'
const imagesModules: Record<string, { default: string }> = import.meta.glob('@/assets/images/chart/**', {
  eager: true
})
const configModules: Record<string, { default: string }> = import.meta.glob('@/material/components/**/config.vue', {
  eager: true
})
const materialModules: Record<string, { default: string }> = import.meta.glob('@/material/components/**/index.vue', {
  eager: true
})

// * 所有图表
export let materialList: PackagesType = {
  [MaterialPackageEnum.CHARTS]: ChartList,
  [MaterialPackageEnum.INFORMATIONS]: InformationList,
  [MaterialPackageEnum.TABLES]: TableList,
  [MaterialPackageEnum.DECORATES]: DecorateList,
  [MaterialPackageEnum.PHOTOS]: PhotoList
  // [MaterialPackageEnum.ICONS]: IconList,
}

// 组件缓存, 可以大幅度提升组件加载速度
const componentCacheMap = new Map<string, any>()

const loadConfig = (packageName: string, categoryName: string, keyName: string) => {
  const key = packageName + categoryName + keyName
  if (!componentCacheMap.has(key)) {
    componentCacheMap.set(key, import(`@/material/components/${packageName}/${categoryName}/${keyName}/config.ts`))
  }
  return componentCacheMap.get(key)
}

/**
 * * 获取目标组件配置信息
 * @param targetData
 */
export const createComponent = async (targetData: MaterialItem) => {
  const { redirectComponent, category, key } = targetData
  // redirectComponent 是给图片组件库和图标组件库使用的
  if (redirectComponent) {
    const [packageName, categoryName, keyName] = redirectComponent.split('/')
    const redirectChart = await loadConfig(packageName, categoryName, keyName)
    return new redirectChart.default()
  }
  const chart = await loadConfig(targetData.package, category, key)
  return new chart.default()
}

/**
 * * 获取组件
 * @param {string} chartName 名称
 * @param {FetchComFlagType} flag 标识 0为展示组件, 1为配置组件
 */
const fetchComponent = (name: string, flag: FetchComFlagTypeEnum) => {
  const module = flag === FetchComFlagTypeEnum.VIEW ? materialModules : configModules
  for (const key in module) {
    const urlSplit = key.split('/')
    if (urlSplit[urlSplit.length - 2] === name) {
      return module[key]
    }
  }
}

/**
 * * 获取展示组件
 * @param {MaterialItem} dropData 配置项
 */
export const fetchMaterial = (dropData: MaterialItem) => {
  const { key } = dropData
  console.log(fetchComponent(key, FetchComFlagTypeEnum.VIEW)?.default)
  return fetchComponent(key, FetchComFlagTypeEnum.VIEW)?.default
}

/**
 * * 获取配置组件
 * @param {MaterialItem} dropData 配置项
 */
export const fetchConfigComponent = (dropData: MaterialItem) => {
  const { key } = dropData
  return fetchComponent(key, FetchComFlagTypeEnum.CONFIG)?.default
}

/**
 * * 获取图片内容
 * @param {MaterialItem} targetData 配置项
 */
export const fetchImages = async (targetData?: MaterialItem) => {
  if (!targetData) return ''
  // 正则判断图片是否为 url，是则直接返回该 url
  if (/^(http|https):\/\/([\w.]+\/?)\S*/.test(targetData.image)) return targetData.image
  // 新数据动态处理
  const { image } = targetData
  // 兼容旧数据
  if (image.includes('@') || image.includes('base64')) return image

  const imageName = image.substring(image.lastIndexOf('/') + 1)
  for (const key in imagesModules) {
    const urlSplit = key.split('/')
    if (urlSplit[urlSplit.length - 1] === imageName) {
      return imagesModules[key]?.default
    }
  }
  return ''
}

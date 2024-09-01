import { isFunction, isUndefined } from 'lodash-es'
import {
  IMetaForm,
  IMetaContainerItem,
  IDataOption,
  IMaterial,
  IScriptOption,
  DOMRectStyle,
  IILocation,
  IVector,
  ILocation
} from '../../types'
import { ContainerType, DataMode, FormTypeEnum } from '../enums'
import { useCanvas, useDataSourceState, useDesigner } from '../hooks'
import { Material } from '../base'
import { useScriptState, useData } from '../hooks/index'
import { mod360, rotatePoint } from '@hl/utils'
export * from './style'
export const isClass = (varValue: any) => {
  return isFunction(varValue) && !isUndefined(varValue.prototype)
}
/**
 * 根据表单配置，生成初始化表单值
 * @param formItems 表单配置项
 * @param modelValue 表单初始值
 */
export const buildModeValue = (
  formItems: Array<IMetaForm> | Array<IMetaContainerItem>,
  modelValue: Record<string, any>
) => {
  formItems.forEach(el => {
    if (el.children) {
      const childModelValue = {}
      buildModeValue(el.children, childModelValue)
      modelValue[el.prop] = childModelValue
    } else {
      modelValue[el.prop] = el.props?.defaultValue
    }
  })
}

export const updateFormItemsValue = (
  formItems: Array<IMetaForm> | Array<IMetaContainerItem>,
  modelValue: Record<string, any>
) => {
  formItems.forEach(item => {
    if (item.children) {
      if (isUndefined(modelValue[item.prop])) {
        modelValue[item.prop] = {}
      }
      return updateFormItemsValue(item.children, modelValue[item.prop])
    }
    if (!isUndefined(modelValue[item.prop]) && (item.props || item.componentOptions)) {
      return ((item.props || item.componentOptions).defaultValue = modelValue[item.prop])
    } else {
      modelValue[item.prop] = (item.props || item.componentOptions).defaultValue
    }
  })
}
/**
 * 根据对象属性路径更新对象
 * @param modelValue 对象
 * @param keys 属性路径
 * @param value 属性值
 */
export const updateModeValue = (modelValue: Record<string, any>, keys: Array<string>, value: any) => {
  keys.reduce((acc, cur, i) => {
    return (acc[cur] = i === keys.length - 1 ? value : acc[cur] || {})
    // 根据递归创建空对象，直到是最后一个属性并赋值
  }, modelValue)
}

export const getObjProp = (
  obj: Array<IMetaContainerItem> | Array<IMetaForm>,
  propKeys: Array<string>,
  start = 0
): IMetaForm | IMetaContainerItem => {
  // @ts-ignore
  const chidObj = obj.find(item => item.prop === propKeys[start])
  if (chidObj && chidObj.children && start < propKeys.length) {
    return getObjProp(chidObj.children, propKeys, start + 1)
  }
  return chidObj as IMetaForm | IMetaContainerItem
}
export const getMaterialCommonProps = ({ name, component, id }): IMetaContainerItem[] => [
  {
    label: '公共属性',
    prop: 'common',
    children: [
      {
        label: '名称',
        prop: 'name',
        type: FormTypeEnum.TEXT,
        props: {
          defaultValue: name
        }
      },
      {
        label: '组件',
        prop: 'component',
        type: FormTypeEnum.TEXT,
        props: {
          defaultValue: component,
          editable: false
        }
      },
      {
        label: '组件ID',
        prop: 'id',
        type: FormTypeEnum.TEXT,
        props: {
          defaultValue: id,
          editable: false
        }
      }
    ]
  }
]

export function getMaterialInstance({
  component,
  id,
  name,
  icon
}: {
  component: string
  id?: string
  name?: string
  icon?: string
}) {
  const designer = useDesigner()
  const materials = designer.materials
  const materialName = component
  const _class = materials[materialName]
  let obj
  if (_class) {
    obj = new _class(id, name, icon)
  } else {
    const materialInfo = designer.materialMetaMap.get(materialName)
    if (!materialInfo) {
      return
    }
    const clazz = materialInfo.clazz

    if (clazz) {
      obj = new clazz(id, name, icon)
    } else {
      obj = new Material({
        id: id,
        width: materialInfo.size.width,
        height: materialInfo.size.height,
        group: materialInfo.category,
        icon: icon || materialInfo.icon,
        name: name || materialInfo.title,
        component: materialInfo.name
      })
      obj.loadExtraProp(materialInfo.propValueConfig!())
      obj.loadExtraStyle(materialInfo.styleConfig!())
      console.log(materialInfo)
      obj.setExampleData(materialInfo.demoLoader)
    }
  }
  return obj
}

export const buildDataHandler = async (material: Material, data?: IDataOption) => {
  const dataState = useDataSourceState()
  if (!(data && data.requestOptions)) {
    await material.loadStaticData()
    return
  }
  const plugin = dataState.getPlugin(data.type)
  if (!plugin) {
    return
  }
  const dataHandler = plugin.handler
  const { options } = data.requestOptions!
  const otherConfig = data.otherConfig
  if (otherConfig) {
    options.otherConfig = otherConfig
  }
  const dataConfig = {
    type: data.type,
    dataInstance: new dataHandler(options)
  }
  console.log('buildDataHandler-dataConfig', dataConfig)
  material.changeDataConfig(dataConfig)
}
const buildAfterCallback = (componentObj: Material, script?: IScriptOption) => {
  if (!script) {
    return
  }
  const scriptState = useScriptState()
  const plugin = scriptState.getPlugin(script.type)
  if (!plugin) {
    return
  }
  const scriptHandlerClasss = plugin.handler
  const scriptHandler = new scriptHandlerClasss(script.key)
  componentObj.afterCallbackChange(scriptHandler)
}
export function createMaterial(material: IMaterial): any {
  const canvasState = useCanvas()
  const obj = getMaterialInstance({
    component: material.component,
    name: material.name,
    icon: material.icon,
    id: material.id
  })
  obj.groupStyle = material.groupStyle
  obj.setPropValue({ propValue: material.propValue })
  obj.setStyleValue({ style: material.style })
  obj.dataMode = material.dataMode || DataMode.SELF
  const data = material.data
  if (obj.dataMode || obj.dataIntegrationMode === DataMode.UNIVERSAL) {
    buildDataHandler(obj, data)
  }
  buildAfterCallback(obj, material.script)
  material.subMaterials?.forEach(item => {
    const subObj = createMaterial(item)
    subObj.parent = obj
    obj.subMaterials.push(subObj)
  })

  const viewType = canvasState.canvasStyleConfig.mode || ContainerType.CARD
  obj.setViewType(viewType)
  return obj
}
export function swap<T>(arr: Array<T>, i: number, j: number) {
  arr.splice(j, 1, ...arr.splice(i, 1, arr[j]))
}

export function toPercent(val: number) {
  return parseFloat((val * 100).toFixed(4))
}

/**
 * 计算组件笛卡尔坐标系坐标
 * @param style 组件在画布中的位置
 * @returns 组件坐标
 */
export function calcComponentAxis(style: DOMRectStyle): IILocation {
  const leftUpPoint: IVector = { x: style.left, y: style.top }
  const rightUpPoint: IVector = { x: style.left + style.width, y: style.top }
  const rightDownPoint: IVector = { x: style.left + style.width, y: style.top + style.height }
  const leftDownPoint: IVector = { x: style.left, y: style.top + style.height }
  const center: IVector = { x: style.left + style.width / 2, y: style.top + style.height / 2 }
  const realRotate = mod360(style.rotate)
  if (realRotate != 0) {
    const alu: IVector = rotatePoint(leftUpPoint, center, realRotate)
    const aru: IVector = rotatePoint(rightUpPoint, center, realRotate)
    const ard: IVector = rotatePoint(rightDownPoint, center, realRotate)
    const ald: IVector = rotatePoint(leftDownPoint, center, realRotate)
    const left = Math.min(alu.x, aru.x, ard.x, ald.x)
    const right = Math.max(alu.x, aru.x, ard.x, ald.x)
    const top = Math.min(alu.y, aru.y, ard.y, ald.y)
    const bottom = Math.max(alu.y, aru.y, ard.y, ald.y)
    return { left, right, top, bottom }
  } else {
    return {
      top: style.top,
      left: style.left,
      right: style.left + style.width,
      bottom: style.top + style.height
    }
  }
}
/**
 * 计算组合组件的位置信息
 */
export function calcComponentsRect(components: Material[]) {
  const leftSet: Set<number> = new Set()
  const topSet: Set<number> = new Set()
  const rightSet: Set<number> = new Set()
  const bottomSet: Set<number> = new Set()
  components.forEach(component => {
    // 获取位置大小信息：left, top, width, height
    const style: DOMRectStyle = component.positionStyle
    const componentRect: IILocation = calcComponentAxis(style)
    leftSet.add(componentRect.left)
    topSet.add(componentRect.top)
    rightSet.add(componentRect.right)
    bottomSet.add(componentRect.bottom)
  })

  const left = Math.min(...leftSet)
  const right = Math.max(...rightSet)
  const top = Math.min(...topSet)
  const bottom = Math.max(...bottomSet)
  return { left, top, width: right - left, height: bottom - top }
}

/**
 * 给定区域获取该区域范围内的所有组件和包含该这些组件的最小区域
 * @param rect 区域范围
 * @param componentData 所有组件数据
 *
 *@return {components: Material[], rect: Position} components 所有组件， minRect 最小区域
 */
export const getSelectComponents = (
  rect: ILocation,
  componentData: Material[]
):
  | {
      materials: Array<Material>
      rect: { left: number; right: number; top: number; bottom: number }
    }
  | undefined => {
  const selectedComponents: Array<Material> = []
  const leftSet: Set<number> = new Set()
  const topSet: Set<number> = new Set()
  const rightSet: Set<number> = new Set()
  const bottomSet: Set<number> = new Set()

  // 计算所有的组件数据，判断是否在选中区域内
  componentData.forEach(component => {
    // 获取位置大小信息：left, top, width, height
    const { width, height, left, top, rotate } = component.style
    const componentRect: ILocation = calcComponentAxis({
      width,
      height,
      left,
      top,
      rotate
    })
    if (
      componentRect.left >= rect.left &&
      componentRect.right <= rect.right &&
      componentRect.top >= rect.top &&
      componentRect.bottom <= rect.bottom
    ) {
      selectedComponents.push(component)
      leftSet.add(componentRect.left)
      topSet.add(componentRect.top)
      rightSet.add(componentRect.right)
      bottomSet.add(componentRect.bottom)
    }
  })

  if (selectedComponents.length > 0) {
    const left = Math.min(...leftSet)
    const right = Math.max(...rightSet)
    const top = Math.min(...topSet)
    const bottom = Math.max(...bottomSet)
    return {
      materials: selectedComponents,
      rect: { left, right, top, bottom }
    }
  }
}

export function createGroupStyle(groupComponent: Material) {
  const parentStyle: DOMRectStyle = groupComponent.positionStyle
  groupComponent.subMaterials!.forEach(component => {
    // component.groupStyle 的 gtop gsleft 是相对于 group 组件的位置
    // 如果已存在 component.groupStyle，说明已经计算过一次了。不需要再次计算
    component.groupStyle = {
      gleft: toPercent((component.positionStyle.left - parentStyle.left) / parentStyle.width),
      gtop: toPercent((component.positionStyle.top - parentStyle.top) / parentStyle.height),
      gwidth: toPercent(component.positionStyle.width / parentStyle.width),
      gheight: toPercent(component.positionStyle.height / parentStyle.height),
      grotate: component.positionStyle.rotate
    }
  })
}

/**
 * 获取一组组件真实区域坐标
 * @param components
 * @returns
 */
export const getComponentRealRect = (components: Material[]) => {
  const maxRect: {
    right: number
    left: number
    top: number
    bottom: number
    center: IVector
    component: Material
  }[] = []

  const xAxisSet: Array<number> = []
  const yAxisSet: Array<number> = []
  components.forEach(ele => {
    const left: number = ele.positionStyle.left
    const width: number = ele.positionStyle.width
    const top: number = ele.positionStyle.top
    const height: number = ele.positionStyle.height
    const rotate = Number(ele.positionStyle.rotate)
    const leftTop: IVector = { x: left, y: top }
    const rightTop: IVector = { x: left + width, y: top }
    const rightBottom: IVector = { x: left + width, y: top + height }
    const leftBottom: IVector = { x: left, y: top + height }
    const center: IVector = { x: left + width / 2, y: top + height / 2 }
    const locations = [leftTop, rightBottom, leftBottom, rightTop]
    const xAxis: number[] = []
    const yAxis: number[] = []
    locations.forEach((el: IVector) => {
      const point = rotatePoint(el, center, rotate)
      xAxis.push(point.x)
      yAxis.push(point.y)
      xAxisSet.push(point.x)
      yAxisSet.push(point.y)
    })
    const newLeft: number = Math.min(...xAxis)
    const newTop: number = Math.min(...yAxis)
    const newRight: number = Math.max(...xAxis)
    const newBottom: number = Math.max(...yAxis)
    maxRect.push({
      left: newLeft,
      top: newTop,
      right: newRight,
      bottom: newBottom,
      center: center,
      component: ele
    })
  })
  return {
    items: maxRect,
    left: Math.min(...xAxisSet),
    top: Math.min(...yAxisSet),
    right: Math.max(...xAxisSet),
    bottom: Math.max(...yAxisSet)
  }
}

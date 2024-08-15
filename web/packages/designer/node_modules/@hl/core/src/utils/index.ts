import { isFunction, isUndefined } from 'lodash-es'
import { IMetaForm, IMetaContainerItem } from '../../types'
import { FormTypeEnum } from '../enums'
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

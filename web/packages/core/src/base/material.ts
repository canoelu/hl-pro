import { h } from 'vue'
import { getUUID } from '@hl/utils'
import { FormTypeEnum, ContainerTypeEnum } from '../enums'
import {
  buildModeValue,
  getMaterialCommonProps,
  getMaterialCommonStyle,
  getObjProp,
  updateFormItemsValue,
  updateModeValue
} from '../utils'
import { IMaterialStyle, IMaterialConfig, IMetaContainerItem, IDOMRectStyle, IMetaForm } from '../../types'
import { cloneDeep, isNumber } from 'lodash-es'

/**
 * 物料
 */
export class Material {
  id: string
  name: string
  component: string
  icon: string = ''
  selected = false
  locked = false
  show = true
  active = false
  display = true
  positionStyle: IDOMRectStyle = { left: 0, top: 0, width: 0, height: 0, rotate: 0 }
  parent?: Material
  subMaterials: Material[] = []

  // form表单中使用
  private _formProp: IMetaContainerItem[] = []
  private _style: IMetaContainerItem[] = []
  _formPropValue: Record<string, any> = {}
  _styleValue: IMaterialStyle = {
    ...this.positionStyle
  }
  extraStyle: Record<string, string | number | boolean> = {}
  formPropIsChange = true
  styleIsChange = true
  defaultViewType: ContainerTypeEnum = ContainerTypeEnum.CARD
  callbackProp?: (propKeys: Array<string>, value: any) => void
  callbackStyle?: (propKeys: Array<string>, value: any) => void
  callbackData?: (result: any, type?: string) => void
  constructor(config: IMaterialConfig) {
    this.id = config.id || getUUID()
    this.name = config.name
    this.component = config.component
    this.icon = config.icon || ''
  }
  get fromPropValue(): IMetaContainerItem[] {
    const common = getMaterialCommonProps({
      id: this.id,
      name: this.name,
      component: this.component
    })
    const propFrom = [...common, ...this._formProp]
    const propValue = {}
    buildModeValue(propFrom, propValue)
    return propFrom
  }
  setPropValue({ propValue }: { propValue: Record<string, any> }) {
    this.formPropIsChange = true
    updateFormItemsValue(this._formProp, propValue)
    this._formPropValue = propValue
  }
  get styleFormValue(): IMetaContainerItem[] {
    if (!this._style.find(item => item.prop === 'position')) {
      const common: IMetaContainerItem = getMaterialCommonStyle({ positionStyle: this.positionStyle })
      this._style = [common, ...this._style]
    }
    return this._style
  }
  // 自定义样式编辑框数据处理
  styleToCss(_: Record<string, any>[]): Nullable<Record<string, any>> {
    return null
  }
  get style(): IMaterialStyle {
    if (this.styleIsChange) {
      const customStyle: Record<string, any>[] = []
      this.styleFormValue.forEach(item => {
        ;(item.children || []).forEach(obj => {
          const objProps = obj.props || obj.componentOptions
          if (objProps) {
            if (obj.type === FormTypeEnum.CUSTOM) {
              customStyle[obj.prop] = objProps['default-Value']
            }
            this._styleValue[obj.prop] = objProps!['defaultValue']
          }
        })
      })

      Object.assign(this._styleValue, this.extraStyle)
      const res = this.styleToCss(customStyle)
      if (res) {
        Object.assign(this._styleValue, res)
      }
      this.styleIsChange = false
    }
    return this._styleValue
  }
  get formPropValue() {
    if (this.formPropIsChange) {
      updateFormItemsValue(this._formProp, this._formPropValue)
      this.formPropIsChange = false
    }
    return this._formPropValue
  }
  setViewType(viewType: ContainerTypeEnum) {
    this.defaultViewType = viewType
  }
  toJson() {
    return {}
  }
  changeProps(propKeys: Array<string>, value: string | number | boolean | any) {
    this.formPropIsChange = true
    if (propKeys.length === 2 && propKeys[0] === 'common' && propKeys[1] === 'name') {
      this.name = value as string
      return
    }
    updateModeValue(this._formPropValue, propKeys, value)
    this.callbackProp?.(propKeys, value)
  }
  changeStyle(propKeys: Array<string>, value: any) {
    const positionKey = ['top', 'left', 'height', 'width', 'rotate']
    let changeValue = value
    if (propKeys[0] === 'position') {
      if (propKeys.length === 2 && positionKey.includes(propKeys[1])) {
        changeValue = Math.round(value)
        this.positionStyle[propKeys[1]] = changeValue
      } else if (propKeys.length === 1) {
        positionKey.forEach(el => {
          if (!isNumber(value[el])) {
            return
          }
          this.positionStyle[el] = value[el]
        })
      }
    }
    this.styleIsChange = true
    const curObj = getObjProp(this.styleFormValue, propKeys) as IMetaForm
    const objProps = curObj && (curObj.props || curObj.componentOptions)
    if (objProps) {
      objProps['default-value'] = value
    }

    if (this.callbackStyle) this.callbackStyle(propKeys, value)
  }

  addMaterial(materials: Material[], deep = false, clear = false) {
    if (clear) {
      this.subMaterials = []
    }

    materials.forEach(item => {
      let com = item
      if (deep) {
        com = cloneDeep(item)
      }
      com.parent = this
      this.subMaterials.push(com)
    })
  }
  appendChild(child: Material) {
    this.subMaterials.push(child)
  }
  updateChild(index: number, child: Material) {
    this.subMaterials[index] = child
  }
  setVisible(visible: boolean) {
    this.display = visible
  }
}
export default Material

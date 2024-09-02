import { h } from 'vue'
import { makeUuid } from '@hl/utils'
import { FormTypeEnum, ContainerTypeEnum, DataMode } from '../enums'
import {
  buildModeValue,
  getMaterialCommonProps,
  getMaterialCommonStyle,
  getObjProp,
  updateFormItemsValue,
  updateModeValue
} from '../utils'
import {
  IMaterialStyle,
  IMaterialConfig,
  IMetaContainerItem,
  IDOMRectStyle,
  IMetaForm,
  IDataConfig,
  IBaseScript,
  IResponse,
  IGroupStyle
} from '../../types'
import { cloneDeep, isNumber } from 'lodash-es'

/**
 * 物料
 * 组件基本信息-名称，状态，组件，位置
 * 组件配置
 * 组件数据
 */
export class Material {
  id: string
  name: string
  component: string // 具体的组件
  icon: string = ''
  selected = false
  locked = false
  disabled = false
  show = true
  active = false
  display = true
  positionStyle: IDOMRectStyle = { left: 0, top: 0, width: 0, height: 0, rotate: 0 }
  parent?: Material
  subMaterials: Material[] = []
  dataMode: DataMode = DataMode.SELF
  propIsChange = true

  // form表单中使用
  _formProp: IMetaContainerItem[] = []
  _style: IMetaContainerItem[] = []
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
  protected materialDataCallback?: (result: any, type?: string) => void

  dataConfig?: IDataConfig
  scriptConfig?: IBaseScript

  groupStyle?: IGroupStyle

  constructor(config: IMaterialConfig) {
    this.id = config.id || makeUuid()
    this.name = config.name
    this.component = config.component
    this.icon = config.icon || ''
    this.positionStyle.width = config.width || 100
    this.positionStyle.height = config.height || 100
    this.dataMode = config.dataMode || DataMode.SELF
  }
  get propFormValue(): IMetaContainerItem[] {
    const common = getMaterialCommonProps({
      id: this.id,
      name: this.name,
      component: this.component
    })
    const propForm = [...common, ...this._formProp]
    const propValue = {}
    buildModeValue(propForm, propValue)
    return propForm
  }

  setFormPropValue({ propValue }: { propValue: Record<string, any> }) {
    this.formPropIsChange = true
    updateFormItemsValue(this._formProp, propValue)
    this._formPropValue = propValue
  }
  get propValue() {
    if (this.formPropIsChange) {
      updateFormItemsValue(this._formProp, this._formPropValue)
      this.formPropIsChange = false
    }
    return this._formPropValue
  }
  get styleFormValue(): IMetaContainerItem[] {
    if (!this._style.find(item => item.prop === 'position')) {
      const common: IMetaContainerItem = getMaterialCommonStyle({ positionStyle: this.positionStyle })
      this._style = [common, ...this._style]
    }
    return this._style
  }
  changeProp(propKeys: Array<string>, value: string | number | boolean | any) {
    this.propIsChange = true
    if (propKeys.length === 2 && propKeys[0] === 'common' && propKeys[1] === 'name') {
      this.name = value as string
      return
    }
    updateModeValue(this.propValue, propKeys, value)
    if (this.callbackProp) {
      this.callbackProp(propKeys, value)
    }
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
              customStyle[obj.prop] = objProps.defaultValue
            }
            this._styleValue[obj.prop] = objProps!.defaultValue
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
    console.log('_styleValue', this._styleValue)
    return this._styleValue
  }

  setViewType(viewType: ContainerTypeEnum) {
    this.defaultViewType = viewType
  }
  get exampleData(): any {
    return undefined
  }
  private loadExampleData?: () => any
  public setExampleData(loader: () => any) {
    this.loadExampleData = loader
  }
  public getExampleData() {
    if (this.exampleData) {
      return this.exampleData
    } else {
      return this.loadExampleData ? this.loadExampleData() : undefined
    }
  }
  async loadStaticData() {
    const exampleData = await this.getExampleData()
    this.callbackData = this.buildDataCallback()

    if (this.callbackData) {
      this.callbackData({ status: 'SUCCESS', data: exampleData, afterData: exampleData }, 'DEMO')
    }
  }
  toJson() {
    return {}
  }
  /**
   * 修改属性
   * @param propKeys
   * @param value
   * @returns
   */
  changeProps(propKeys: Array<string>, value: string | number | boolean | any) {
    this.formPropIsChange = true
    if (propKeys.length === 2 && propKeys[0] === 'common' && propKeys[1] === 'name') {
      this.name = value as string
      return
    }
    updateModeValue(this._formPropValue, propKeys, value)
    this.callbackProp?.(propKeys, value)
  }
  /**
   * 修改样式
   * @param propKeys
   * @param value
   */
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
      objProps.defaultValue = value
    }
    console.log(this.callbackStyle)

    if (this.callbackStyle) this.callbackStyle(propKeys, value)
  }
  /**
   * 添加物料
   * @param materials
   * @param deep
   * @param clear
   */
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
  /**
   * 添加子物料
   * @param child
   */
  appendChild(child: Material) {
    this.subMaterials.push(child)
  }
  updateChild(index: number, child: Material) {
    this.subMaterials[index] = child
  }
  setVisible(visible: boolean) {
    this.display = visible
  }
  // TODO
  buildDataCallback() {
    return (resp: IResponse) => {
      if (this.scriptConfig && this.scriptConfig.afterCallback) {
        const afterCallback = this.scriptConfig.afterCallback
        const { status, data } = resp
        if (status === 'SUCCESS') {
          try {
            const afterData = afterCallback(data, this.propValue)
            resp['afterData'] = afterData
          } catch (err) {
            resp['afterData'] = undefined
            resp.status = 'FAILED'
          }
        }
      } else {
        resp['afterData'] = resp.data
      }
      if (this.materialDataCallback) {
        this.materialDataCallback(resp)
      }
    }
  }
  async changeDataConfig(dataConfig: IDataConfig) {
    const { dataInstance } = this.dataConfig || {}
    if (dataInstance && dataInstance.close) {
      dataInstance.close()
    }
    this.dataConfig = dataConfig
    if (this.callbackData) {
      await this.dataConfig?.dataInstance.connect!(this.callbackData)
    }
  }
  afterCallbackChange(scriptHandler: IBaseScript) {
    this.scriptConfig = scriptHandler
    if (this.dataConfig?.dataInstance && this.materialDataCallback) {
      this.callbackData = this.buildDataCallback()
      const { dataInstance } = this.dataConfig || {}
      if (dataInstance && dataInstance.close) {
        dataInstance.close()
        dataInstance.connect!(this.callbackData)
      }
    }
  }
  // TODO
  setDataChangeCallback(callback: (result: any, type?: string) => void) {
    this.materialDataCallback = callback
    this.callbackData = this.buildDataCallback()
    this.loadStaticData()

    const { dataInstance } = this.dataConfig || {}
    if (!dataInstance) {
      return
    }
    if (dataInstance.close) {
      dataInstance.close()
    }
    dataInstance.connect!(this.callbackData)
  }
  setPropChangeCallback(callback: (propKeys: Array<string>, value: any) => void) {
    this.callbackProp = callback
  }
  setStyleChangeCallback(callback: (propKeys: Array<string>, value: any) => void) {
    this.callbackStyle = callback
  }
  loadExtraStyle(style: Array<IMetaContainerItem>) {
    this._style = style
  }
  loadExtraProp(prop: Array<IMetaContainerItem>) {
    this._formProp = prop
  }
}
export default Material

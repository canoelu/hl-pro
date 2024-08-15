import { reactive } from 'vue'
import {
  ICanvasOpt,
  ICanvasState,
  IMaterialMeta,
  ICanvasStyleConfig,
  ICanvasStyleData,
  IMetaContainerItem,
  SnapMessageEnum
} from '../../types'
import Material from './material'
import { ContainerType } from '../enums'
import { BASE_CANVAS_STYLE_CONFIG, BASE_CANVAS_STYLE_DATA } from '../constants'
import { useSnapshotState } from '../hooks'
import { updateModeValue } from '../utils'
import { isUndefined } from 'lodash-es'

const snapShotState = useSnapshotState()
/**
 * 物料到画布中变为组件
 */
export class Canvas {
  public _state = reactive<ICanvasState>({
    name: '',
    scale: 1,
    activeMaterial: undefined,
    materialsObj: {},

    materials: [],
    ids: new Set(),
    canvasStyleConfig: {
      formItems: BASE_CANVAS_STYLE_CONFIG,
      mode: ContainerType.CARD
    },
    materialData: [],
    canvasStyleData: BASE_CANVAS_STYLE_DATA
  })
  public materialMetaMap: Map<string, IMaterialMeta> = new Map()
  constructor(opt: ICanvasOpt) {
    const allOpt = opt ? opt : {}
  }
  private get ids(): Set<string> {
    return this._state.ids
  }
  private set ids(ids: Set<string>) {
    this._state.ids = ids
  }
  get name() {
    return this._state.name
  }
  set name(name) {
    this._state.name = name
  }
  get canvasStyleData() {
    return this._state.canvasStyleData
  }
  set canvasStyleData(config) {
    this._state.canvasStyleData = config
  }
  get canvasStyleConfig() {
    return this._state.canvasStyleConfig
  }
  get scale(): number {
    return this._state.scale
  }
  set scale(scale: number) {
    this._state.scale = scale
  }

  get globalOption() {
    return {
      basic: {
        width: this.canvasStyleData?.width,
        height: this.canvasStyleData?.height,
        background: this.canvasStyleData?.background
      },
      ...this.canvasStyleData?.extraAttrs
    }
  }
  get materials() {
    return this._state.materials
  }
  get activeMaterial(): Optional<Material> {
    return this._state.activeMaterial
  }
  private set activeMaterial(component: Optional<Material>) {
    this._state.activeMaterial = component
  }
  get materialData(): Material[] {
    return this._state.materialData
  }
  set materialData(materialData: Material[]) {
    this._state.materialData = materialData
  }
  public loadMaterial(name: string, material: Material, manifest?: any) {
    if (!name || !material) return
    if (manifest) {
    } else {
      this._state.materials[name] = material
    }
  }
  /**
   * 实例化物料
   * @param name
   * @returns
   */
  public async loadMaterialClazz(name: string) {
    const materialInfo = this.materialMetaMap.get(name) as IMaterialMeta
    if (!materialInfo) {
      return
    }
    if (materialInfo?.clazz) {
      return
    } else {
      const remoteClazz = materialInfo.remoteClazz
      if (remoteClazz) {
        const result = await remoteClazz()
        materialInfo.clazz = result?.default
      }
    }
    await this.loadMaterialConfig(name)
  }
  /**
   * 根据名字获取物料配置
   * @param name
   */
  public async loadMaterialConfig(name: string) {
    const materialInfo = this.materialMetaMap.get(name) as IMaterialMeta
    if (!materialInfo) {
      return
    }
    const { propValueConfig, styleConfig, panel } = materialInfo
    if (isUndefined(propValueConfig) && isUndefined(styleConfig)) {
      if (panel) {
        const result = await panel()
        const { propValue, style, demoLoader } = result.default
        materialInfo.propValueConfig = propValue || (() => [])
        materialInfo.styleConfig = style || (() => [])
        materialInfo.demoLoader = demoLoader || (() => {})
      } else {
        materialInfo.propValueConfig = () => []
        materialInfo.styleConfig = () => []
        materialInfo.demoLoader = () => {}
      }
    }
  }
  public loadMaterialss(name: string, componentInfo: any, panel: any): void {
    this.materialMetaMap.set(name, {
      ...componentInfo,
      panel: panel
    })
  }
  public getMaterialById(id: string): Material | undefined {
    return this.findMaterialById(id, this.materialData)
  }
  getMaterialIndexById(id: string, parent: Optional<Material>): number {
    if (parent) {
      return parent.subMaterials.findIndex(item => item.id === id)
    }
    return this.materialData.findIndex(item => item.id === id)
  }

  private findMaterialById(id: string, data: Array<Material>): Material | undefined {
    const len = data.length
    for (let i = 0; i < len; i++) {
      if (data[i].id === id) {
        return data[i]
      } else {
        const subMaterials = data[i].subMaterials
        if (subMaterials) {
          return this.findMaterialById(id, subMaterials)
        }
      }
    }
  }
  get canvasData() {
    const result = []
    this.materials.forEach(item => {
      result.push(item.toJson())
    })
    return result
  }
  /**
   * 设计画布样式
   * @param keys
   * @param val
   */
  setCanvasStyle(keys: Array<string>, val) {
    if (keys.length === 2 && keys[0] === 'basic') {
      if (keys[1] === 'pixel') {
        const pixels = val.split('X')
        this.canvasStyleData.height = parseInt(pixels[1])
        this.canvasStyleData.width = parseInt(pixels[0])
      } else {
        this.canvasStyleData[keys[1]] = val
      }
    } else {
      const extraAttrs = this.canvasStyleData.extraAttrs
      updateModeValue(extraAttrs, keys, val)
    }
    this.saveStepData(SnapMessageEnum.UpdateCanvas)
  }
  /**
   * TODO  本地持久化
   * 存储快照
   */
  saveStepData(message) {
    snapShotState.push(message, {
      canvasData: this.canvasData,
      canvasStyle: this.canvasStyleData,
      dataSlotters: []
    })
  }
  /**
   * 像画布中添加物料
   * @param material
   */
  appendMaterial(material: Material) {}
  /**
   * 清空画布
   */
  clearCanvas() {
    this.activeMaterial = undefined
    this.name = ''

    this._state.materials = []
  }
}
export default Canvas

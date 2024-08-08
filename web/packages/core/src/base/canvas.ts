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

const snapShotState = useSnapshotState()
class Canvas {
  public state = reactive<ICanvasState>({
    name: '',
    scale: 1,
    materialsObj: {},
    materials: [],
    ids: new Set(),
    canvasStyleConfig: {
      formItems: BASE_CANVAS_STYLE_CONFIG,
      mode: ContainerType.CARD
    },

    canvasStyleData: BASE_CANVAS_STYLE_DATA
  })
  public materialMetaMap: Map<string, IMaterialMeta> = new Map()
  constructor(opt: ICanvasOpt) {
    const allOpt = opt ? opt : {}
  }
  get name() {
    return this.state.name
  }
  set name(name) {
    this.state.name = name
  }
  get canvasStyleData() {
    return this.state.canvasStyleData
  }
  set canvasStyleData(config) {
    this.state.canvasStyleData = config
  }
  get canvasStyleConfig() {
    return this.state.canvasStyleConfig
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
    return this.state.materials
  }
  public loadMaterial(name: string, material: Material, manifest?: any) {
    if (!name || !material) return
    if (manifest) {
    } else {
      this.state.materials[name] = material
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
      // TODO
      // updateModeValue(extraAttrs, keys, val)
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
    this.state.materials = []
  }
}
export default Canvas

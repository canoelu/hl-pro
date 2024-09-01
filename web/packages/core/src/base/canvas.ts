import { reactive } from 'vue'
import { getUUID, DOMRectStyle, mod360, IVector, rotatePoint } from '@hl/utils'
import { ICanvasOpt, ICanvasState, ICanvasStyleConfig, IMaterialMeta, SnapMessageEnum } from '../../types'
import Material from './material'
import { ContainerType, EditModeEnum } from '../enums'
import { BASE_CANVAS_STYLE_CONFIG, BASE_CANVAS_STYLE_DATA } from '../constants'
import { useDesigner, useSnapshotState } from '../hooks'
import Designer from './designer'
import { updateModeValue, swap, toPercent, calcComponentsRect } from '../utils'
import { cloneDeep } from 'lodash-es'

const snapShotState = useSnapshotState()
// const designer = useDesigner()
/**
 * 物料到画布中变为组件
 */
export class Canvas {
  public _info = reactive<ICanvasState>({
    name: '',
    scale: 1,
    activeMaterial: undefined,
    activeIndex: undefined,
    materialsObj: {},
    editMode: EditModeEnum.PREVIEW,
    benchmarkComponent: undefined,
    materials: [],
    ids: new Set(),
    canvasStyleConfig: {
      formItems: BASE_CANVAS_STYLE_CONFIG,
      mode: ContainerType.CARD
    },
    isShowEm: false,
    cavansMaterials: [],
    canvasStyleData: BASE_CANVAS_STYLE_DATA
  })
  designer: Designer
  constructor(opt: ICanvasOpt) {
    const allOpt = opt ? opt : {}
    this.designer = useDesigner()
  }
  private get ids(): Set<string> {
    return this._info.ids
  }
  private set ids(ids: Set<string>) {
    this._info.ids = ids
  }
  get name() {
    return this._info.name
  }
  set name(name) {
    this._info.name = name
  }
  get canvasStyleData() {
    return this._info.canvasStyleData
  }
  set canvasStyleData(config) {
    this._info.canvasStyleData = config
  }
  get canvasStyleConfig() {
    return this._info.canvasStyleConfig
  }
  get scale(): number {
    return this._info.scale
  }
  set scale(scale: number) {
    this._info.scale = scale
  }
  setScale(value: number) {
    this.scale = value / 100
  }
  get isShowEm(): boolean {
    return this._info.isShowEm
  }
  set isShowEm(isShowEm: boolean) {
    this._info.isShowEm = isShowEm
  }

  get editMode(): EditModeEnum {
    return this._info.editMode
  }
  set editMode(editMode: EditModeEnum) {
    this._info.editMode = editMode
  }
  get isEditMode(): boolean {
    return this.editMode === EditModeEnum.EDIT
  }
  get layoutData() {
    const result = []
    this.cavansMaterials.forEach(item => {
      result.push(item.toJson())
    })
    // eslint-disable-next-line prettier/prettier
    return result
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
    return this._info.materials
  }
  get activeMaterial(): Optional<Material> {
    return this._info.activeMaterial
  }
  get benchmarkComponent(): Optional<Material> {
    return this._info.benchmarkComponent
  }
  set benchmarkComponent(benchmarkComponent: Optional<Material>) {
    this._info.benchmarkComponent = benchmarkComponent
  }

  private set activeMaterial(component: Optional<Material>) {
    this._info.activeMaterial = component
  }
  get activeIndex(): string | undefined {
    return this._info.activeIndex
  }
  set activeIndex(activeIndex: string | undefined) {
    this._info.activeIndex = activeIndex
  }
  get cavansMaterials(): Material[] {
    return this._info.cavansMaterials
  }
  set cavansMaterials(_cavansMaterials: Material[]) {
    this._info.cavansMaterials = _cavansMaterials
  }

  public getMaterialById(id: string): Material | undefined {
    return this.findMaterialById(id, this.cavansMaterials)
  }
  setEditMode(mode: EditModeEnum): void {
    this.editMode = mode
  }
  toggleShowEm(): void {
    this.isShowEm = !this.isShowEm
  }
  getMaterialIndexById(id: string, parent: Optional<Material>): number {
    if (parent) {
      return parent.subMaterials.findIndex(item => item.id === id)
    }
    return this.cavansMaterials.findIndex(item => item.id === id)
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
      // result.push(item.toJson())
    })
    return result
  }
  /**
   * 设置当前组件的PropValue
   * @param component
   * @param keys 属性组
   * @param value 值
   * @returns
   */
  setComponentPropValue(component: Material, keys: Array<string>, value: any): void {
    component.changeProp(keys, value)
    this.saveCavansMaterials()
  }
  /**
   * 激活当前物料
   * @param component
   * @param index
   */
  activateMaterial(material: Optional<Material>, index?: string): void {
    // 设置前清理当前
    if (this.activeMaterial) {
      this.activeMaterial.active = false
    }
    this.activeMaterial = material
    this.activeIndex = index
    if (this.activeMaterial) {
      this.activeMaterial.active = true
      // TODO
      // this.benchmarkComponent = this.activeMaterial.parent
    }
  }
  /**
   * 取消组件的激活状态
   * @param component 当前组件
   * @param index
   */
  deactivateMaterial(): void {
    // 设置前清理当前
    if (this.activeMaterial) {
      this.activeMaterial.active = false
    }
    this.activeMaterial = undefined
    this.activeIndex = undefined
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
   * 重置组件数据ID
   * @param materials
   */
  resetCanvasMaterial(materials: Array<Material>) {
    materials.forEach(item => {
      // 重置组件 ID

      if (this.ids.has(item.id!)) {
        item.id = getUUID()
      }

      this.ids.add(item.id!)
      this.designer.materialMetaMap.set(item.id!, item)
      if (item.subMaterials) {
        this.resetCanvasMaterial(item.subMaterials)
      }
    })
  }
  saveCavansMaterials() {
    // window.localStorage.setItem('cavansMaterials', JSON.stringify(this.layoutData))
    new Promise(resolve => {
      // TODO 快照
      // resolve(
      //   // snapShotState.saveSnapshot(this.layoutData, this.canvasStyleData, this.dataSlotterData)
      // )
    })
  }
  /**
   * 像画布中添加物料
   * @param material
   */
  appendMaterial(material: Material) {
    if (material.subMaterials) {
      this.resetCanvasMaterial(material.subMaterials)
    }
    material.parent = undefined

    this.cavansMaterials.push(cloneDeep(material))
    this.resetCanvasMaterial(this.cavansMaterials)
    this.saveStepData(SnapMessageEnum.InsertNode)
  }
  /**
   * 根据索引移除组件
   * @param index 索引
   * @param parent
   * @returns 移除结果
   */
  removeMaterial(index: number, parent: Optional<Material>) {
    if (parent && parent.subMaterials) {
      parent.subMaterials.splice(index, 1)
    } else {
      this.cavansMaterials.splice(index, 1)
    }
    this.saveCavansMaterials()
  }
  /**
   * 组件图层上移
   * @param index 组件索引
   * @param parent
   */
  upMaterial(index: number, parent: Optional<Material>) {
    let cavansMaterials = this.cavansMaterials
    if (parent && parent.subMaterials) {
      cavansMaterials = parent.subMaterials
    }

    const len: number = cavansMaterials.length
    if (index < len - 1 && index >= 0) {
      swap(cavansMaterials, index, index + 1)
      this.saveCavansMaterials()
    } else {
      // TODO logger 图层已经到顶了
    }
  }

  /**
   * 组件图层置顶
   * @param index 组件索引
   * @param parent
   */
  topMaterial(index: number, parent: Optional<Material>) {
    let cavansMaterials = this.cavansMaterials
    if (parent && parent.subMaterials) {
      cavansMaterials = parent.subMaterials
    }
    const len: number = cavansMaterials.length
    if (index < len - 1 && index >= 0) {
      const myComponments: Material[] = cavansMaterials.splice(index, 1)
      cavansMaterials.push(myComponments[0])
      this.saveCavansMaterials()
    } else {
      // TODO logger 图层已经到顶了
    }
  }
  /**
   * 组件图层下移
   * @param index 组件索引
   * @param parent
   */
  downMaterial(index: number, parent: Optional<Material>) {
    let componentData = this.cavansMaterials
    if (parent && parent.subMaterials) {
      componentData = parent.subMaterials
    }
    if (index > 0) {
      swap(componentData, index, index - 1)
      this.saveCavansMaterials()
    } else {
      // TODO logger 图层已经到底了
    }
  }
  /**
   * 组件图层置底
   * @param index 组件索引
   * @param parent
   */
  bottomMaterial(index: number, parent: Optional<Material>) {
    let cavansMaterials = this.cavansMaterials
    if (parent && parent.subMaterials) {
      cavansMaterials = parent.subMaterials
    }

    if (index > 0) {
      const myComponments: Material[] = cavansMaterials.splice(index, 1)
      cavansMaterials.unshift(myComponments[0])
      this.saveCavansMaterials()
    } else {
      // TODO logger 图层已经到底了
    }
  }
  /**
   * 重新自动调整组件尺寸
   * @param parentComponent
   */
  public resizeAutoMaterial(parentComponent: Optional<Material>): void {
    if (parentComponent && parentComponent.component === 'Group') {
      const parentStyle = parentComponent.positionStyle
      const { top, left, height, width } = calcComponentsRect(parentComponent.subMaterials)
      if (
        top === parentStyle.top &&
        left === parentStyle.left &&
        height === parentStyle.height &&
        width === parentStyle.width
      ) {
        return
      } else {
        const newGroupStyle = { ...parentStyle, top, left, height, width }
        for (const key in newGroupStyle) {
          parentComponent.changeStyle(['position', key], newGroupStyle[key])
        }
        parentComponent.subMaterials?.forEach((el: Material) => {
          el.groupStyle = {
            gleft: toPercent((el.positionStyle.left - newGroupStyle.left) / newGroupStyle.width),
            gtop: toPercent((el.positionStyle.top - newGroupStyle.top) / newGroupStyle.height),
            gwidth: toPercent(el.positionStyle.width / newGroupStyle.width),
            gheight: toPercent(el.positionStyle.height / newGroupStyle.height),
            grotate: el.positionStyle.rotate
          }
        })
        if (parentComponent.parent) {
          this.resizeAutoMaterial(parentComponent.parent)
        }
      }
    }
  }
  /**
   * 重新调整当前组件的子组件
   * @param component 当前组件
   */
  private resizeSubMaterial(component: Material) {
    if (!component.subMaterials) return
    const subMaterials = component.subMaterials
    const parentStyle = component.positionStyle
    subMaterials.forEach((el: Material) => {
      const groupStyle = el.groupStyle!
      const center: IVector = {
        y: parentStyle.top + parentStyle.height / 2,
        x: parentStyle.left + parentStyle.width / 2
      }
      const { top, left, height, width, rotate } = {
        top: parentStyle.top + (parentStyle.height * groupStyle.gtop) / 100,
        left: parentStyle.left + (parentStyle.width * groupStyle.gleft) / 100,
        height: (parentStyle.height * groupStyle.gheight) / 100,
        width: (parentStyle.width * groupStyle.gwidth) / 100,
        rotate: mod360(parentStyle.rotate + (groupStyle.grotate || 0))
      }
      const point: IVector = {
        y: top + height / 2,
        x: left + width / 2
      }

      const afterPoint: IVector = rotatePoint(point, center, parentStyle.rotate)
      el.changeStyle(['position'], {
        top: Math.round(afterPoint.y - height / 2),
        left: Math.round(afterPoint.x - width / 2),
        height: Math.round(height),
        width: Math.round(width),
        rotate: rotate
      })
    })
  }
  /**
   * 同步当前组件的位置
   * @param position 位置
   * @param parentComponent 父组件
   * @param isSave 是否保存
   * @returns
   */
  syncMaterialLocation(position: Partial<DOMRectStyle>, parentComponent?: Material, isSave = true): void {
    if (!this.activeMaterial) {
      return
    }
    const styleKeys = ['top', 'left', 'width', 'height', 'rotate']
    const ablePosition: Partial<DOMRectStyle> = {}
    styleKeys.forEach(el => {
      if (position[el] != undefined) {
        ablePosition[el] = position[el]
      }
    })
    if (parentComponent) {
      const parentStyle = parentComponent.positionStyle
      const groupStyle = this.activeMaterial.groupStyle!
      const gStyle = {
        gleft:
          ablePosition.left !== undefined
            ? toPercent((ablePosition.left! - parentStyle.left) / parentStyle.width)
            : groupStyle.gleft,
        gtop:
          ablePosition.top !== undefined
            ? toPercent((ablePosition.top! - parentStyle.top) / parentStyle.height)
            : groupStyle.gtop,
        gwidth:
          ablePosition.width !== undefined ? toPercent(ablePosition.width! / parentStyle.width) : groupStyle.gwidth,
        gheight:
          ablePosition.height !== undefined ? toPercent(ablePosition.height! / parentStyle.height) : groupStyle.gheight,
        grotate: ablePosition.rotate !== undefined ? ablePosition.rotate! : groupStyle.grotate
      }
      const newStyle = {
        left: ablePosition.left !== undefined ? ablePosition.left : this.activeMaterial.positionStyle.left,
        top: ablePosition.top !== undefined ? ablePosition.top : this.activeMaterial.positionStyle.top,
        width: ablePosition.width !== undefined ? ablePosition.width : this.activeMaterial.positionStyle.width,
        height: ablePosition.height !== undefined ? ablePosition.height : this.activeMaterial.positionStyle.height,
        rotate: ablePosition.rotate !== undefined ? ablePosition.rotate! : this.activeMaterial.positionStyle.rotate
      }
      this.activeMaterial.groupStyle = gStyle
      for (const key in newStyle) {
        this.activeMaterial.changeStyle(['position', key], newStyle[key])
      }
    } else {
      for (const key in ablePosition) {
        this.activeMaterial.changeStyle(['position', key], ablePosition[key])
      }
    }

    if (this.activeMaterial.subMaterials) {
      this.resizeSubMaterial(this.activeMaterial)
    }
    if (isSave) {
      this.saveCavansMaterials()
    }
  }
  /**
   * 清空画布
   */
  clearCanvas() {
    this.activeMaterial = undefined
    this.name = ''

    this._info.materials = []
  }
}
export default Canvas

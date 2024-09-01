import { reactive } from 'vue'
import { calcComponentsRect, createGroupStyle, getComponentRealRect, getSelectComponents } from '../utils'
import { ContainerType } from '../enums'

import Material from './material'
import { IActionState, IPosition, ILocation } from '../../types'
import Canvas from './canvas'

class Action {
  public _info = reactive<IActionState>({
    style: {
      top: 0,
      left: 0,
      width: 0,
      height: 0
    },
    materials: [],
    ids: new Set()
  })
  canvasState: Canvas
  constructor() {
    this.canvasState = new Canvas({ mode: ContainerType.CARD })
  }
  get style(): IPosition {
    return this._info.style
  }
  set style(style: IPosition) {
    this._info.style = style
  }

  get ids(): Set<string> {
    return this._info.ids
  }
  set ids(ids: Set<string>) {
    this._info.ids = ids
  }

  get materials(): Material[] {
    return this._info.materials
  }
  set materials(materials: Array<Material>) {
    this._info.materials = materials
  }
  get canCompose(): boolean {
    return this.materials.length > 1
  }
  get hidden(): boolean {
    return this.style.width > 0
  }
  /**
   * 判断组件是否在选取的组件内
   * @param component
   */
  isActived(component: Material): boolean {
    return this.materials.findIndex((el: Material) => el.id === component.id) !== -1
  }

  /**
   * 给定区域获取该区域的组件
   * @param position
   */
  setSelectComponents(position: ILocation) {
    const { materials, rect } = getSelectComponents(position, this.canvasState.cavansMaterials) || {}
    if (materials && rect) {
      this.style.left = rect.left
      this.style.top = rect.top
      this.style.width = rect.right - rect.left
      this.style.height = rect.bottom - rect.top
      this.materials = materials || []
      this.ids.clear()
      this.materials.forEach(item => this.ids.add(item.id))
    } else {
      this.setHidden()
    }
  }

  /**
   * 向store 中增加组件
   * @param component 组件
   */
  appendMaterial(component: Optional<Material>): void {
    if (!component) {
      return
    }
    if (!this.ids.has(component.id)) {
      this.materials.push(component)
      this.ids.add(component.id)
      if (this.materials.length > 1) {
        this.style = { ...this.style, ...calcComponentsRect(this.materials) }
      }
    }
  }

  /**
   * 隐藏选定区域
   */
  setHidden() {
    this.style = {
      left: 0,
      top: 0,
      width: 0,
      height: 0
    }
    this.materials = []
    this.ids.clear()
  }

  /**
   * 设置已选择的矩形位置
   * @param position 位置
   */
  setPostion(position: Partial<IPosition>) {
    if (position.left) {
      this.style.left = Math.round(position.left)
    }

    if (position.top) {
      this.style.top = Math.round(position.top)
    }

    if (position.width) {
      this.style.width = Math.round(position.width)
    }

    if (position.height) {
      this.style.height = Math.round(position.height)
    }
  }
  /**
   * 组件间组合
   * @returns
   */
  compose() {
    if (this.style.width === 0) {
      this.style = { ...this.style, ...calcComponentsRect(this.materials) }
    }
    const materials = this.canvasState.materials
    const GroupClass = materials['Group']
    const groupComponent: Material = new GroupClass()
    for (const prop in this.style) {
      groupComponent.changeStyle(['position', prop], this.style[prop])
    }
    groupComponent.addMaterial(this.materials, true)
    createGroupStyle(groupComponent)
    this.batchDeleteComponent(this.materials)
    this.canvasState.appendMaterial(groupComponent)

    const index = this.canvasState.cavansMaterials.length - 1
    this.canvasState.activateMaterial(this.canvasState.cavansMaterials[index], index.toString())
    this.materials = []
  }
  /**
   * 将已经放到 Group 组件数据删除，也就是在 cavansMaterials 中删除，因为它们已经放到 Group 组件中了
   * @param deleteData
   */
  batchDeleteComponent(deleteData: Material[]) {
    deleteData.forEach(component => {
      for (let i = 0, len = this.canvasState.cavansMaterials.length; i < len; i++) {
        if (component.id === this.canvasState.cavansMaterials[i].id) {
          this.canvasState.cavansMaterials.splice(i, 1)
          break
        }
      }
    })
    this.ids.clear()
  }
  /**
   * 右对齐
   */
  flushRight() {
    const { right, items } = getComponentRealRect(this.materials)
    items.forEach(el => {
      const distance = right - el.right
      el.component.changeStyle(['position', 'left'], el.component.positionStyle.left + distance)
    })
    this.canvasState.saveCavansMaterials()
  }
  /**
   * 左对齐
   */
  flushLeft() {
    const { left, items } = getComponentRealRect(this.materials)
    items.forEach(el => {
      const distance = el.left - left
      el.component.changeStyle(['position', 'left'], el.component.positionStyle.left - distance)
    })
    this.canvasState.saveCavansMaterials()
  }
  /**
   * 顶端对齐
   */
  flushTop() {
    const { top, items } = getComponentRealRect(this.materials)
    items.forEach(el => {
      const distance = el.top - top
      el.component.changeStyle(['position', 'top'], el.component.positionStyle.top - distance)
    })
    this.canvasState.saveCavansMaterials()
  }
  /**
   * 底部对齐
   */
  flushBottom() {
    const { bottom, items } = getComponentRealRect(this.materials)
    items.forEach(el => {
      const distance = bottom - el.bottom
      el.component.changeStyle(['position', 'top'], el.component.positionStyle.top + distance)
    })
    this.canvasState.saveCavansMaterials()
  }
  /**
   * 行对齐
   */
  flushRow() {
    const { top, bottom, items } = getComponentRealRect(this.materials)
    items.forEach(el => {
      const distanceY = (bottom + top) / 2 - el.center.y
      el.component.changeStyle(['position', 'top'], el.component.positionStyle.top + distanceY)
    })
    this.canvasState.saveCavansMaterials()
  }
  /**
   * 列对齐
   */
  flushColumn() {
    const { left, right, items } = getComponentRealRect(this.materials)
    items.forEach(el => {
      const distanceX = (left + right) / 2 - el.center.x
      el.component.changeStyle(['position', 'left'], el.component.positionStyle.left + distanceX)
    })
    this.canvasState.saveCavansMaterials()
  }
}
export default Action

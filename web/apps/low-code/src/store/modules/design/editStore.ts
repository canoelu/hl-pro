import { computed, ref, shallowRef } from 'vue'
import type { RouteRecordRaw } from 'vue-router'
import { defineStore } from 'pinia'
import { CreateComponentGroupType, CreateComponentType, MousePositionType, TargetComponentType } from './type'
import { loadingFinish } from '@/utils/common'

export const useDesignEditStore = defineStore({
  id: 'useDesignEditStore',
  state: () => ({
    // 组件列表
    componentList: [],
    // 右键菜单
    rightMenuShow: false,
    // 鼠标定位
    mousePosition: {
      startX: 0,
      startY: 0,
      x: 0,
      y: 0,
    },
    // 选中的组件
    targetComponent: {
      selectId: ['1'],
    },
  }),
  getters: {
    getRightMenuShow(): boolean {
      return this.rightMenuShow
    },
    getTargetComponent(): TargetComponentType {
      return this.targetComponent
    },
    getMousePosition(): MousePositionType {
      return this.mousePosition
    },
    getComponentList(): Array<CreateComponentType | CreateComponentGroupType> {
      return this.componentList
    },
  },
  actions: {
    // * 设置右键菜单
    setRightMenuShow(value: boolean) {
      this.rightMenuShow = value
    },
    /**
     * 锁定
     * @param status
     * @param isHistory
     */
    setLock(status: boolean = true, isHistory: boolean = true) {
      console.log('---锁定')
    },
    // * 解除锁定
    setUnLock(isHistory: boolean = true) {
      this.setLock(false, isHistory)
    },
    setShow(isHistory: boolean = true) {},
    setHide() {},
    setGroup() {},
    setUnGroup() {},
    /**
     * 复制
     */
    setCopy() {},
    /**
     * 剪切
     */
    setCut() {},
    /**
     * 粘贴
     */
    setParse() {},
    /**
     * 置顶
     */
    setTop() {},
    /**
     * 置底
     */
    setBottom() {},
    /**
     * 上移
     */
    setUp() {},
    /**
     * 下移
     */
    setDown() {},
    /**
     * 清空剪贴板
     */
    setRecordChart() {},
    /**
     * 删除
     */
    removeComponentList(id?: string | string[], isHistory = true) {},
    /**
     * 选中的组件
     */
    setTargetSelectComponent(id?: string) {},
    // * 设置鼠标位置
    setMousePosition(x?: number, y?: number, startX?: number, startY?: number): void {
      if (x) this.mousePosition.x = x
      if (y) this.mousePosition.y = y
      if (startX) this.mousePosition.startX = startX
      if (startY) this.mousePosition.startY = startY
    },
    // * 找到目标 id 数据的下标位置，id可为父级或子集数组（无则返回-1）
    fetchTargetIndex(id?: string): number {
      const targetId =
        id || (this.getTargetComponent.selectId.length && this.getTargetComponent.selectId[0]) || undefined
      if (!targetId) {
        loadingFinish()
        return -1
      }
      const targetIndex = this.componentList.findIndex((e) => e.id === targetId)

      // 当前
      if (targetIndex !== -1) {
        return targetIndex
      } else {
        const length = this.getComponentList.length
        for (let i = 0; i < length; i++) {
          if (this.getComponentList[i].isGroup) {
            for (const cItem of (this.getComponentList[i] as CreateComponentGroupType).groupList) {
              if (cItem.id === targetId) {
                return i
              }
            }
          }
        }
      }
      return -1
    },
  },
})

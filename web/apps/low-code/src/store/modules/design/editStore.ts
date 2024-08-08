import { computed, ref, shallowRef } from 'vue'
import type { RouteRecordRaw } from 'vue-router'
import { defineStore } from 'pinia'
import {
  CreateMaterialGroupType,
  CreateMaterialType,
  MousePositionType,
  TargetComponentType,
  IDesignState,
  MaterialType,
  EditCanvasType,
  TargetChartType,
  EditCanvasConfigType
} from './type'
import { loadingFinish, isString, isArray } from '@/utils'
import { SyncEnum } from '@/enums'
import { defaultTheme, globalThemeJson } from '@/constants'

export const useDesignEditStore = defineStore({
  id: 'useDesignEditStore',
  state: (): IDesignState => ({
    // 物料列表
    materialList: [],
    // 右键菜单
    rightMenuShow: false,
    // 鼠标定位
    mousePosition: {
      startX: 0,
      startY: 0,
      x: 0,
      y: 0
    },
    // 选中的组件
    targetComponent: {
      selectId: ['1']
    },
    // 画布属性
    editCanvas: {
      saveStatus: SyncEnum.PENDING,
      isCodeEdit: false,
      isSelect: false,
      isDrag: false,
      lockScale: false,
      scale: 1,
      userScale: 1,
      offset: 20,
      editContentDom: null,
      editLayoutDom: null,
      isCreate: false
    },
    // 画布属性（需存储给后端）
    editCanvasConfig: {
      projectId: undefined,
      // 项目名称
      projectName: undefined,
      // 默认宽度
      width: 1920,
      // 默认高度
      height: 1080,
      // 启用滤镜
      filterShow: false,
      // 色相
      hueRotate: 0,
      // 饱和度
      saturate: 1,
      // 对比度
      contrast: 1,
      // 亮度
      brightness: 1,
      // 透明度
      opacity: 1,
      // 变换（暂不更改）
      rotateZ: 0,
      rotateX: 0,
      rotateY: 0,
      skewX: 0,
      skewY: 0,
      // 混合模式
      blendMode: 'normal',
      // 默认背景色
      background: undefined,
      backgroundImage: undefined,
      // 是否使用纯颜色
      selectColor: true,
      // chart 主题色
      chartThemeColor: defaultTheme || 'dark',
      // 自定义颜色列表
      chartCustomThemeColorInfo: undefined,
      // 全局配置
      chartThemeSetting: globalThemeJson
      // 适配方式
      // previewScaleType: previewScaleType
    },
    // 目标图表
    targetChart: {
      hoverId: undefined,
      selectId: []
    }
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
    getMaterialList(): MaterialType[] {
      return this.materialList
    },
    getEditCanvas(): EditCanvasType {
      return this.editCanvas
    },
    getTargetChart(): TargetChartType {
      return this.targetChart
    },
    getEditCanvasConfig(): EditCanvasConfigType {
      return this.editCanvasConfig
    }
  },
  actions: {
    /**
     * 添加物料列表
     * @param componentInstance
     * @param isHead
     * @param isHistory
     */
    addMaterialList(
      componentInstance:
        | CreateMaterialType
        | CreateMaterialGroupType
        | Array<CreateMaterialType | CreateMaterialGroupType>,
      isHead = false,
      isHistory = false
    ) {
      if (componentInstance instanceof Array) {
        componentInstance.forEach(item => {
          this.addMaterialList(item, isHead, isHistory)
        })
        return
      }
      if (isHistory) {
        //TODO
      }
      if (isHead) {
        // TODO
        return
      }
      this.materialList.push(componentInstance)
    },
    setTargetSelectChart(selectId?: string | string[], push: boolean = false) {
      // 重复选中
      if (this.targetChart.selectId.find((e: string) => e === selectId)) return

      // 无 id 清空
      if (!selectId) {
        this.targetChart.selectId = []
        return
      }
      // 多选
      if (push) {
        // 字符串
        if (isString(selectId)) {
          this.targetChart.selectId.push(selectId)
          return
        }
        // 数组
        if (isArray(selectId)) {
          this.targetChart.selectId.push(...selectId)
          return
        }
      } else {
        // 字符串
        if (isString(selectId)) {
          this.targetChart.selectId = [selectId]
          return
        }
        // 数组
        if (isArray(selectId)) {
          this.targetChart.selectId = selectId
          return
        }
      }
    },
    // * 设置 editCanvasConfig（需保存后端） 数据项
    setEditCanvasConfig<T extends keyof EditCanvasConfigType, K extends EditCanvasConfigType[T]>(key: T, value: K) {
      this.editCanvasConfig[key] = value
    },
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
    // * 设置 editCanvas 数据项
    setEditCanvas<T extends keyof EditCanvasType, K extends EditCanvasType[T]>(key: T, value: K) {
      this.editCanvas[key] = value
    },
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
      const targetIndex = this.materialList.findIndex(e => e.id === targetId)

      // 当前
      if (targetIndex !== -1) {
        return targetIndex
      } else {
        const length = this.getMaterialList.length
        for (let i = 0; i < length; i++) {
          if (this.getMaterialList[i].isGroup) {
            for (const cItem of (this.getMaterialList[i] as CreateMaterialGroupType).groupList) {
              if (cItem.id === targetId) {
                return i
              }
            }
          }
        }
      }
      return -1
    }
  }
})

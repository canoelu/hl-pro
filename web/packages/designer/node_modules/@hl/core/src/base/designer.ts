import { reactive } from 'vue'
import {
  IWorkspace,
  SimulatorNameType,
  ISimulatorType,
  DesignerViewType,
  IViewportBounding,
  IDesignerState,
  IMaterialMeta,
  IPage,
  IMaterial
} from '../../types'
import { createMaterial, isClass } from '../utils/index'
import Material from './material'
import { isUndefined } from 'lodash-es'

export const ISimulatorTypes: Record<string, ISimulatorType> = {
  desktop: {
    name: 'desktop',
    width: 1366,
    height: 800
  },
  phone: {
    name: 'phone',
    width: 375,
    height: 812
  }
}
export class Designer {
  public _info = reactive<IDesignerState>({
    id: '',
    name: '',
    thumbnail: '',
    activeIndex: 0,
    activePanel: undefined,
    simulator: ISimulatorTypes.desktop,
    materialList: [],
    materials: {},
    pageList: [],
    filterList: [],
    varList: []
  })
  public materialMetaMap: Map<string, IMaterialMeta> = new Map()

  constructor() {}

  get pageList() {
    return this._info.pageList
  }
  get varList() {
    return this._info.varList
  }
  get filterList() {
    return this._info.filterList
  }
  get materials() {
    return this._info.materials
  }

  /**
   * 设计器数据
   */
  setDesignerData(data) {}
  /**
   * 添加页面
   */
  addPage(page: IPage) {
    this._info.pageList.push(page)
  }
  public loadMaterial(name: string, material, image, manifest?: any) {
    if (manifest) {
      this.materialMetaMap.set(name, {
        ...manifest,
        image,
        clazz: isClass(material) ? material : undefined,
        remoteClazz: isClass(material) ? undefined : material
      })
    } else {
      material.image = image
      this._info.materials[name] = material
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
        console.log('demoLoader', demoLoader)
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
  public loadMaterials(name: string, componentInfo: any, panel: any): void {
    this.materialMetaMap.set(name, {
      ...componentInfo,
      panel: panel
    })
  }
  public setDesignData() {}
  public setDesignStyle() {}
  /**
   * 设置物料的数据
   */
  setMaterialInitData(list: IMaterial[]) {
    list.forEach(item => {
      createMaterial(item)
    })
    // this.resetComponentData(this.componentData)
    // this.saveComponentData()
  }
}
export default Designer

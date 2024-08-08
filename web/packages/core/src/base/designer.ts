import { reactive } from 'vue'
import {
  IWorkspace,
  SimulatorNameType,
  ISimulatorType,
  DesignerViewType,
  IViewportBounding,
  IDesignerState,
  IMaterialMeta
} from '../../types'
import { isClass } from '../utils/index'

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
  public state = reactive<IDesignerState>({
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
    return this.state.pageList
  }
  get varList() {
    return this.state.varList
  }
  get filterList() {
    return this.state.filterList
  }
  get materials() {
    console.log(this.state.materials)
    return this.state.materials
  }

  /**
   * 设计器数据
   */
  setDesignerData(data) {}
  /**
   * 添加页面
   */
  addPage() {}
  /**
   * 加载物料
   * @param name
   * @param component
   * @param image
   * @param manifest
   */
  public loadMaterial(name: string, component, image, manifest?: any) {
    if (manifest) {
      this.materialMetaMap.set(name, {
        ...manifest,
        image,
        clazz: isClass(component) ? component : undefined,
        remoteClazz: isClass(component) ? undefined : component
      })
    } else {
      component.image = image
      this.state.materials[name] = component
    }
  }
  public async loadMaterials(name: string, component) {}
  public async loadMaterialClazz(name: string) {}
  public setDesignData() {}
  public setDesignStyle() {}
}
export default Designer

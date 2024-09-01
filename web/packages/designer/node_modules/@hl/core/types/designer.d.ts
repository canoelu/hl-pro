/**
 * 设计器
 */
export interface IDesignerState {
    name: string
    id: string
    activeIndex: number
    simulator?: SimulatorNameType | ISimulatorType
    activePanel?: string
    /**
     * 封面
     */
    thumbnail: string
    materialList: Material[]
    materials: Record<string, Material>
    /**
     * 页面
     */
    pageList: IPage[]
    /**
     * 全局变量
     */
    varList: IVar[]
    /**
     * 过滤器
     */
    filterList: IFilter[]
    /**
     * 全局请求配置
     */
    requestConfig?: IRequestConfig
  }
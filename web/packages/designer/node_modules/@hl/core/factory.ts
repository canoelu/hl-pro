import { IWorkspace, SimulatorNameType, DesignerViewType } from './types'

interface ICreateEngineOptions {
  /**
   * 自定义工作区
   */
  workspace?: IWorkspace
  /**
   * 默认的模拟器模式
   */
  defaultSimulatorMode: SimulatorNameType
  /**
   * 默认激活的侧边栏
   */
  defaultActiveSidebarPanel?: string
  /**
   * 默认激活的视图
   */
  defaultActiveView?: DesignerViewType
}

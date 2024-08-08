import { IStoreCanvasData } from './index'

export interface ISnapData {
  snapshotMax: number
  cursor: number
  // 最新快照
  latestSnapshot?: IStoreCanvasData
}

import { IStoreCanvasData } from './index'

/*******----------快照----------**** */
export enum SnapMessageEnum {
  InitView = 'initView', // 初始化页面
  UpdateCanvas = 'UpdateCanvas', // 修改画布
  DropNode = 'dropNode',
  RemoveNode = 'RemoveNode', // 删除节点
  ReplaceNode = 'ReplaceNode',
  CloneNode = 'CloneNode',
  InsertNode = 'insertNode',
  UpdateAttribute = 'updateAttribute' // 更新属性
}
export interface IRecord {
  time: string | number
  message: SnapMessageEnum
  data: IStoreCanvasData
}
export interface ISnapData {
  _maxSize: number
  _index: number
  // 最新快照
  latest?: IRecord
  _records: IRecord[]
}

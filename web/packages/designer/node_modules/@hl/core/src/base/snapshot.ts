import { reactive } from 'vue'
import { IStoreCanvasData, ISnapData, SnapMessageEnum, IRecord } from '../../types'

/**
 * 系统快照
 */
class Snapshot {
  public state = reactive<ISnapData>({
    latest: undefined,
    _maxSize: 10,
    _records: [],
    _index: 0
  })
  get latest(): IRecord | undefined {
    return this.state._records[this.length - 1]
  }
  set latest(snapshot: IRecord | undefined) {
    this.state.latest = snapshot
  }
  get index() {
    return this.state._index
  }
  set index(val) {
    this.state._index = val
  }

  get length() {
    return this.state._records.length
  }
  get maxSize() {
    return this.state._maxSize
  }
  get list() {
    return this.state._records
  }
  get couldForward() {
    return this.length > this.index + 1
  }
  get couldBack() {
    return this.length > 0 && this.index > 0
  }
  /**
   * 上一步
   */
  back() {
    if (this.couldBack) {
      const item = this.state._records[this.index - 1]
      this._sync(item.data)
      this.state._index--
    }
  }
  /**
   * 下一步
   */
  forward() {
    if (this.couldForward) {
      const _item = this.state._records[this.index + 1]
      this._sync(_item.data)
      this.state._index++
    }
  }
  _sync(data) {
    if (data) {
      console.log('--data', data)
      Object.keys(data).forEach(filename => {
        // TODO 画布更新数据
      })
    }
  }
  go(index: number) {
    const item = this.list[index]
    if (item) {
      this._sync(item.data)
      this.state._index = index
    }
  }
  push(message: SnapMessageEnum, data: IStoreCanvasData) {
    if (this.index < this.length - 1) {
      this.state._records = this.state._records.slice(0, this.index + 1)
    }
    this.state._index = this.length
    this.state._records.push({
      time: Date.now(),
      message,
      data
    })
    const overCount = this.length - this.maxSize
    if (overCount > 0) {
      this.state._records.slice(0, overCount)
      this.state._index = this.length - 1
    }
  }
  clear() {
    this.state._records = []
    this.state._index = 0
  }
}
export default Snapshot

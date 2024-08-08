import { reactive } from 'vue'
import { cloneDeep } from 'lodash-es'
import { copyInfo } from '@hl/utils'
import Material from './material'
import { IClipBoardState, IPaste } from '../../types'

class ClipBoard {
  public state = reactive<IClipBoardState>({
    copyData: undefined,
    isCut: false
  })
  get copyData() {
    return this.state.copyData
  }
  set copyData(val) {
    this.state.copyData = val
  }
  get isCut() {
    return this.state.isCut
  }
  set isCut(flag: boolean) {
    this.state.isCut = flag
  }
  copy(data: Material) {
    this.copyData = cloneDeep(data)
    copyInfo(JSON.stringify(this.copyData!.toJson()))
  }
  paste(opt: IPaste) {
    if (!this.copyData) {
      return
    }
  }
}
export default ClipBoard

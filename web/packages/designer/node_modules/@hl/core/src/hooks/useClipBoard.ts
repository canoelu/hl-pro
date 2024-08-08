import { singleton } from '@hl/utils'
import ClipBoard from '../base/clipBoard'

const State = singleton(ClipBoard)
export function useClipBoard() {
  return new State() as ClipBoard
}

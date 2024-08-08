import { singleton } from '@hl/utils'

import Canvas from '../base/canvas'
import { ContainerType } from '../enums'

const State = singleton(Canvas)
// TODO 多页面的情况
export function useCanvas() {
  return new State({ mode: ContainerType.CARD }) as CanvasState
}

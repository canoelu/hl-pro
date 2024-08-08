import { singleton } from '@hl/utils'
import Designer from '../base/designer'

const State = singleton(Designer)
export function useDesigner() {
  return new State() as Designer
}
export default useDesigner

import { singleton } from '@hl/utils'
import ScriptState from '../base/script'

const State = singleton(ScriptState)
export function useScriptState() {
  return new State() as ScriptState
}
export default useScriptState

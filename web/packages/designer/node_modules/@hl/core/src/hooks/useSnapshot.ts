import { singleton } from '@hl/utils'
import Snapshot from '../base/snapshot'

const State = singleton(Snapshot)
export function useSnapshotState() {
  return new State() as Snapshot
}
export default useSnapshotState

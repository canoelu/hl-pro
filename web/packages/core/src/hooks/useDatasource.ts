import { singleton } from '@hl/utils'
import DataSource from '../base/dataSource'

const State = singleton(DataSource)
 export function useDataSourceState() {
  return new State() as DataSource
}
export default useDataSourceState
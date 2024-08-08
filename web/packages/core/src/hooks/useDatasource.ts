import { singleton } from '@hl/utils'
import DataSource from '../base/dataSource'

const State = singleton(DataSource)
export default function useDataState() {
  return new State() as DataSource
}

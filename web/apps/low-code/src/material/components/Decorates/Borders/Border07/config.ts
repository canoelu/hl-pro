import { PublicConfigClass } from '@/utils'
import { CreateMaterialType } from '@/typings/design'
import { Border07Config } from './index'
import cloneDeep from 'lodash/cloneDeep'

export const option = {
  colors: ['#11eefd', '#0078d2'],
  backgroundColor: '#00000000'
}

export default class Config extends PublicConfigClass implements CreateMaterialType {
  public key = Border07Config.key
  public chartConfig = cloneDeep(Border07Config)
  public option = cloneDeep(option)
}

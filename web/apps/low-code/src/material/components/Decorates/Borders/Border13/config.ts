import { PublicConfigClass } from '@/utils'
import { CreateMaterialType } from '@/typings/design'
import { Border13Config } from './index'
import cloneDeep from 'lodash/cloneDeep'

export const option = {
  colors: ['#2862b7', '#4b77b7'],
  backgroundColor: '#00000000'
}

export default class Config extends PublicConfigClass implements CreateMaterialType {
  public key = Border13Config.key
  public chartConfig = cloneDeep(Border13Config)
  public option = cloneDeep(option)
}

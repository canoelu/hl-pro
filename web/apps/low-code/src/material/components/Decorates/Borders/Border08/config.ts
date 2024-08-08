import { PublicConfigClass } from '@/utils'
import { CreateMaterialType } from '@/typings/design'
import { Border08Config } from './index'
import cloneDeep from 'lodash/cloneDeep'

export const option = {
  colors: ['#235fa7', '#4fd2dd'],
  dur: 3,
  reverse: false,
  backgroundColor: '#00000000'
}

export default class Config extends PublicConfigClass implements CreateMaterialType {
  public key = Border08Config.key
  public chartConfig = cloneDeep(Border08Config)
  public option = cloneDeep(option)
}

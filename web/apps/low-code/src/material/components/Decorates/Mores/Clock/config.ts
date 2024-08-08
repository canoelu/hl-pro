import { PublicConfigClass } from '@/utils'
import { CreateMaterialType } from '@/typings/design'
import { ClockConfig } from './index'
import cloneDeep from 'lodash/cloneDeep'

export const option = {
  border: 6,
  color: '#ffffff',
  bgColor: '#84a5e9',
  borderColor: '#ffffff'
}

export default class Config extends PublicConfigClass implements CreateMaterialType {
  public key = ClockConfig.key
  public chartConfig = cloneDeep(ClockConfig)
  public option = cloneDeep(option)
}

import { PublicConfigClass } from '@/utils'
import { CreateMaterialType } from '@/typings/design'
import { Border05Config } from './index'
import cloneDeep from 'lodash/cloneDeep'

export const option = {
  colors: ['#1d48c4', '#d3e1f8'],
  backgroundColor: '#00000000'
}

export default class Config extends PublicConfigClass implements CreateMaterialType {
  public key = Border05Config.key
  public chartConfig = cloneDeep(Border05Config)
  public option = cloneDeep(option)
}

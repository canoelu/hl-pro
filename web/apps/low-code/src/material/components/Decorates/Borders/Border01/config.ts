import { PublicConfigClass } from '@/utils'
import { CreateMaterialType } from '@/typings/design'
import { Border01Config } from './index'
import cloneDeep from 'lodash/cloneDeep'

export const option = {
  dur: 0.5,
  colors: ['#4fd2dd', '#235fa7'],
  backgroundColor: '#00000000',
}

export default class Config extends PublicConfigClass implements CreateMaterialType {
  public key = Border01Config.key
  public chartConfig = cloneDeep(Border01Config)
  public option = cloneDeep(option)
}

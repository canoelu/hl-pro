import { PublicConfigClass } from '@/utils'
import { CreateMaterialType } from '@/typings/design'
import { CirclePointConfig } from './index'
import cloneDeep from 'lodash/cloneDeep'
import { chartInitConfig } from '@/constants'

export const option = {
  outCircle: 15,
  inCircle: 5,
  outCircleColor: '#3f5261',
  inCircleColor: '#fff',
  outCircleWidth: 2
}

export default class Config extends PublicConfigClass implements CreateMaterialType {
  public key = CirclePointConfig.key
  public attr = { ...chartInitConfig, w: 97, h: 97, zIndex: 1 }
  public chartConfig = cloneDeep(CirclePointConfig)
  public option = cloneDeep(option)
}

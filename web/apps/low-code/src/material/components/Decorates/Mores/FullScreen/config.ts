import { PublicConfigClass } from '@/utils'
import { CreateComponentType } from '@/typings/design'
import { chartInitConfig } from '@/constants'
import { FullScreenConfig } from './index'
import cloneDeep from 'lodash/cloneDeep'

export const option = {
  border: 6,
  bgColor: '#84a5e9',
  borderColor: '#84a5e9'
}

export default class Config extends PublicConfigClass implements CreateComponentType {
  public key = FullScreenConfig.key
  public attr = { ...chartInitConfig, w: 150, h: 150, zIndex: -1 }
  public chartConfig = cloneDeep(FullScreenConfig)
  public option = cloneDeep(option)
}

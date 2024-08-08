import { MaterialItem } from '@/typings/design.d'
import { MaterialPackageEnum, ComponentFrameEnum } from '@/enums'
import { ChatCategoryEnum, ChatCategoryEnumName } from '../../index.d'

export const MapBaseConfig: MaterialItem = {
  key: 'MapBase',
  chartKey: 'VMapBase',
  conKey: 'VCMapBase',
  title: '地图(可选省份)',
  category: ChatCategoryEnum.MAP,
  categoryName: ChatCategoryEnumName.MAP,
  package: MaterialPackageEnum.CHARTS,
  chartFrame: ComponentFrameEnum.COMMON,
  image: 'map.png',
}

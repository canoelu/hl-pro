import { ConfigType } from '@/typings/design.d'
import { PackagesCategoryEnum, ComponentFrameEnum } from '@/enums'
import { ChatCategoryEnum, ChatCategoryEnumName } from '../../index.d'

export const MapBaseConfig: ConfigType = {
  key: 'MapBase',
  chartKey: 'VMapBase',
  conKey: 'VCMapBase',
  title: '地图(可选省份)',
  category: ChatCategoryEnum.MAP,
  categoryName: ChatCategoryEnumName.MAP,
  package: PackagesCategoryEnum.CHARTS,
  chartFrame: ComponentFrameEnum.COMMON,
  image: 'map.png',
}

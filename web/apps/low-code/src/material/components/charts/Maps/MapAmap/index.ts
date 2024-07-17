import { ConfigType } from '@/typings/design'
import { ChatCategoryEnum, ChatCategoryEnumName } from '../../index.d'
import { PackagesCategoryEnum, ComponentFrameEnum } from '@/enums'
export const MapAmapConfig: ConfigType = {
  key: 'MapAmap',
  chartKey: 'VMapAmap',
  conKey: 'VCMapAmap',
  title: '高德地图',
  category: ChatCategoryEnum.MAP,
  categoryName: ChatCategoryEnumName.MAP,
  package: PackagesCategoryEnum.CHARTS,
  chartFrame: ComponentFrameEnum.COMMON,
  image: 'map_amap.png',
}

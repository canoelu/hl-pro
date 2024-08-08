import { MaterialItem } from '@/typings/design'
import { ChatCategoryEnum, ChatCategoryEnumName } from '../../index.d'
import { MaterialPackageEnum, ComponentFrameEnum } from '@/enums'
export const MapAmapConfig: MaterialItem = {
  key: 'MapAmap',
  chartKey: 'VMapAmap',
  conKey: 'VCMapAmap',
  title: '高德地图',
  category: ChatCategoryEnum.MAP,
  categoryName: ChatCategoryEnumName.MAP,
  package: MaterialPackageEnum.CHARTS,
  chartFrame: ComponentFrameEnum.COMMON,
  image: 'map_amap.png',
}

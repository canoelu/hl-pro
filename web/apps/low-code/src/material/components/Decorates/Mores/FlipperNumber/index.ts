import { ConfigType } from '@/typings/design'
import { ChatCategoryEnum, ChatCategoryEnumName } from '../../index.d'
import { PackagesCategoryEnum, ComponentFrameEnum } from '@/enums'

export const FlipperNumberConfig: ConfigType = {
  key: 'FlipperNumber',
  chartKey: 'VFlipperNumber',
  conKey: 'VCFlipperNumber',
  title: '数字翻牌-需动态触发',
  category: ChatCategoryEnum.MORE,
  categoryName: ChatCategoryEnumName.MORE,
  package: PackagesCategoryEnum.DECORATES,
  chartFrame: ComponentFrameEnum.COMMON,
  image: 'flipper-number.png',
}

import { MaterialItem } from '@/typings/design'
import { ChatCategoryEnum, ChatCategoryEnumName } from '../../index.d'
import { MaterialPackageEnum, ComponentFrameEnum } from '@/enums'

export const FlipperNumberConfig: MaterialItem = {
  key: 'FlipperNumber',
  chartKey: 'VFlipperNumber',
  conKey: 'VCFlipperNumber',
  title: '数字翻牌-需动态触发',
  category: ChatCategoryEnum.MORE,
  categoryName: ChatCategoryEnumName.MORE,
  package: MaterialPackageEnum.DECORATES,
  chartFrame: ComponentFrameEnum.COMMON,
  image: 'flipper-number.png',
}

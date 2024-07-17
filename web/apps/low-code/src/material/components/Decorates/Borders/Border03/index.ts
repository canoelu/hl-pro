import { ConfigType } from '@/typings/design'
import { ChatCategoryEnum, ChatCategoryEnumName } from '../../index.d'
import { PackagesCategoryEnum, ComponentFrameEnum } from '@/enums'

export const Border03Config: ConfigType = {
  key: 'Border03',
  chartKey: 'VBorder03',
  conKey: 'VCBorder03',
  title: '边框-03',
  category: ChatCategoryEnum.BORDER,
  categoryName: ChatCategoryEnumName.BORDER,
  package: PackagesCategoryEnum.DECORATES,
  chartFrame: ComponentFrameEnum.STATIC,
  image: 'border03.png',
}

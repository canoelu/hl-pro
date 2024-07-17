import { ConfigType } from '@/typings/design'
import { ChatCategoryEnum, ChatCategoryEnumName } from '../../index.d'
import { PackagesCategoryEnum, ComponentFrameEnum } from '@/enums'

export const Border08Config: ConfigType = {
  key: 'Border08',
  chartKey: 'VBorder08',
  conKey: 'VCBorder08',
  title: '边框-08',
  category: ChatCategoryEnum.BORDER,
  categoryName: ChatCategoryEnumName.BORDER,
  package: PackagesCategoryEnum.DECORATES,
  chartFrame: ComponentFrameEnum.STATIC,
  image: 'border08.png',
}

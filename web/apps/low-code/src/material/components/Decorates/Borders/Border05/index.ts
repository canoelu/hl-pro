import { ConfigType } from '@/typings/design'
import { ChatCategoryEnum, ChatCategoryEnumName } from '../../index.d'
import { PackagesCategoryEnum, ComponentFrameEnum } from '@/enums'

export const Border05Config: ConfigType = {
  key: 'Border05',
  chartKey: 'VBorder05',
  conKey: 'VCBorder05',
  title: '边框-05',
  category: ChatCategoryEnum.BORDER,
  categoryName: ChatCategoryEnumName.BORDER,
  package: PackagesCategoryEnum.DECORATES,
  chartFrame: ComponentFrameEnum.STATIC,
  image: 'border05.png'
}

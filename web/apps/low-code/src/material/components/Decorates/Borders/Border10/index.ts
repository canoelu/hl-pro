import { MaterialItem } from '@/typings/design'
import { ChatCategoryEnum, ChatCategoryEnumName } from '../../index.d'
import { MaterialPackageEnum, ComponentFrameEnum } from '@/enums'

export const Border10Config: MaterialItem = {
  key: 'Border10',
  chartKey: 'VBorder10',
  conKey: 'VCBorder10',
  title: '边框-10',
  category: ChatCategoryEnum.BORDER,
  categoryName: ChatCategoryEnumName.BORDER,
  package: MaterialPackageEnum.DECORATES,
  chartFrame: ComponentFrameEnum.STATIC,
  image: 'border10.png',
}

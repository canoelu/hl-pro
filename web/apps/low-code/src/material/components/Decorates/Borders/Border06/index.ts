import { MaterialItem } from '@/typings/design'
import { ChatCategoryEnum, ChatCategoryEnumName } from '../../index.d'
import { MaterialPackageEnum, ComponentFrameEnum } from '@/enums'

export const Border06Config: MaterialItem = {
  key: 'Border06',
  chartKey: 'VBorder06',
  conKey: 'VCBorder06',
  title: '边框-06',
  category: ChatCategoryEnum.BORDER,
  categoryName: ChatCategoryEnumName.BORDER,
  package: MaterialPackageEnum.DECORATES,
  chartFrame: ComponentFrameEnum.STATIC,
  image: 'border06.png',
}

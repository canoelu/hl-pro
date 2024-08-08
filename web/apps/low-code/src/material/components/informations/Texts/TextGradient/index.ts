import { MaterialItem } from '@/typings/design'
import { ChatCategoryEnum, ChatCategoryEnumName } from '../../index.d'
import { MaterialPackageEnum, ComponentFrameEnum } from '@/enums'

export const TextGradientConfig: MaterialItem = {
  key: 'TextGradient',
  chartKey: 'VTextGradient',
  conKey: 'VCTextGradient',
  title: '渐变文字',
  category: ChatCategoryEnum.TEXT,
  categoryName: ChatCategoryEnumName.TEXT,
  package: MaterialPackageEnum.INFORMATIONS,
  chartFrame: ComponentFrameEnum.NAIVE_UI,
  image: 'text_gradient.png',
}

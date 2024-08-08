import { MaterialItem } from '@/typings/design'
import { ChatCategoryEnum, ChatCategoryEnumName } from '../../index.d'
import { MaterialPackageEnum, ComponentFrameEnum } from '@/enums'

export const NumberConfig: MaterialItem = {
  key: 'Number',
  chartKey: 'VNumber',
  conKey: 'VCNumber',
  title: '数字计数',
  category: ChatCategoryEnum.MORE,
  categoryName: ChatCategoryEnumName.MORE,
  package: MaterialPackageEnum.DECORATES,
  chartFrame: ComponentFrameEnum.COMMON,
  image: 'number.png',
}

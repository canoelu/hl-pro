import { MaterialItem } from '@/typings/design'
import { ChatCategoryEnum, ChatCategoryEnumName } from '../../index.d'
import { MaterialPackageEnum, ComponentFrameEnum } from '@/enums'

export const ImageConfig: MaterialItem = {
  key: 'Image',
  chartKey: 'VImage',
  conKey: 'VCImage',
  title: '图片',
  category: ChatCategoryEnum.MORE,
  categoryName: ChatCategoryEnumName.MORE,
  package: MaterialPackageEnum.INFORMATIONS,
  chartFrame: ComponentFrameEnum.COMMON,
  image: 'photo.png',
}

import { ConfigType } from '@/typings/design'
import { ChatCategoryEnum, ChatCategoryEnumName } from '../../index.d'
import { PackagesCategoryEnum, ComponentFrameEnum } from '@/enums'

export const ImageConfig: ConfigType = {
  key: 'Image',
  chartKey: 'VImage',
  conKey: 'VCImage',
  title: '图片',
  category: ChatCategoryEnum.MORE,
  categoryName: ChatCategoryEnumName.MORE,
  package: PackagesCategoryEnum.INFORMATIONS,
  chartFrame: ComponentFrameEnum.COMMON,
  image: 'photo.png',
}

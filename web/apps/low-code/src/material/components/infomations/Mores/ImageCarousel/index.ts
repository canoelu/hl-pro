import { ConfigType } from '@/typings/design'
import { ChatCategoryEnum, ChatCategoryEnumName } from '../../index.d'
import { PackagesCategoryEnum, ComponentFrameEnum } from '@/enums'

export const ImageCarouselConfig: ConfigType = {
  key: 'ImageCarousel',
  chartKey: 'VImageCarousel',
  conKey: 'VCImageCarousel',
  title: '轮播图',
  category: ChatCategoryEnum.MORE,
  categoryName: ChatCategoryEnumName.MORE,
  package: PackagesCategoryEnum.INFORMATIONS,
  chartFrame: ComponentFrameEnum.NAIVE_UI,
  image: 'photo_carousel.png',
}

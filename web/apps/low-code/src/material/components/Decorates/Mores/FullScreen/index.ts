import { MaterialItem } from '@/typings/design'
import { ChatCategoryEnum, ChatCategoryEnumName } from '../../index.d'
import { MaterialPackageEnum, ComponentFrameEnum } from '@/enums'

export const FullScreenConfig: MaterialItem = {
  key: 'FullScreen',
  chartKey: 'VFullScreen',
  conKey: 'VCFullScreen',
  title: '全屏按钮',
  category: ChatCategoryEnum.MORE,
  categoryName: ChatCategoryEnumName.MORE,
  package: MaterialPackageEnum.DECORATES,
  chartFrame: ComponentFrameEnum.STATIC,
  image: 'fullScreen.png',
}

import { MaterialItem } from '@/typings/design'
import { MaterialPackageEnum, ComponentFrameEnum } from '@/enums'
import { ChatCategoryEnum, ChatCategoryEnumName } from '../../index.d'

export const IframeConfig: MaterialItem = {
  key: 'Iframe',
  chartKey: 'VIframe',
  conKey: 'VCIframe',
  title: '远程网页',
  category: ChatCategoryEnum.MORE,
  categoryName: ChatCategoryEnumName.MORE,
  package: MaterialPackageEnum.INFORMATIONS,
  chartFrame: ComponentFrameEnum.COMMON,
  image: 'iframe.png',
}

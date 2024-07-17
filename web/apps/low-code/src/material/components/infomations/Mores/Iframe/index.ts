import { ConfigType } from '@/typings/design'
import { PackagesCategoryEnum, ComponentFrameEnum } from '@/enums'
import { ChatCategoryEnum, ChatCategoryEnumName } from '../../index.d'

export const IframeConfig: ConfigType = {
  key: 'Iframe',
  chartKey: 'VIframe',
  conKey: 'VCIframe',
  title: '远程网页',
  category: ChatCategoryEnum.MORE,
  categoryName: ChatCategoryEnumName.MORE,
  package: PackagesCategoryEnum.INFORMATIONS,
  chartFrame: ComponentFrameEnum.COMMON,
  image: 'iframe.png',
}

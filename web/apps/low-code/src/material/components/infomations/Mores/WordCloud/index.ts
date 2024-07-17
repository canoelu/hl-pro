import { ConfigType } from '@/typings/design'
import { ChatCategoryEnum, ChatCategoryEnumName } from '../../index.d'
import { PackagesCategoryEnum, ComponentFrameEnum } from '@/enums'

export const WordCloudConfig: ConfigType = {
  key: 'WordCloud',
  chartKey: 'VWordCloud',
  conKey: 'VCWordCloud',
  title: '词云',
  category: ChatCategoryEnum.MORE,
  categoryName: ChatCategoryEnumName.MORE,
  package: PackagesCategoryEnum.INFORMATIONS,
  chartFrame: ComponentFrameEnum.COMMON,
  image: 'words_cloud.png',
}

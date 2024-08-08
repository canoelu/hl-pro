import { MaterialItem } from '@/typings/design'
import { ChatCategoryEnum, ChatCategoryEnumName } from '../../index.d'
import { MaterialPackageEnum, ComponentFrameEnum } from '@/enums'

export const WordCloudConfig: MaterialItem = {
  key: 'WordCloud',
  chartKey: 'VWordCloud',
  conKey: 'VCWordCloud',
  title: '词云',
  category: ChatCategoryEnum.MORE,
  categoryName: ChatCategoryEnumName.MORE,
  package: MaterialPackageEnum.INFORMATIONS,
  chartFrame: ComponentFrameEnum.COMMON,
  image: 'words_cloud.png',
}

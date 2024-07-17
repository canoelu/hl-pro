import { ConfigType} from '@/typings/design'
import { ChatCategoryEnum,ChatCategoryEnumName } from '../../index.d'
import { PackagesCategoryEnum, ComponentFrameEnum } from '@/enums'

export const TextCommonConfig: ConfigType = {
  key: 'TextCommon',
  chartKey: 'VTextCommon',
  conKey: 'VCTextCommon',
  title: '文字',
  category: ChatCategoryEnum.TEXT,
  categoryName: ChatCategoryEnumName.TEXT,
  package: PackagesCategoryEnum.INFORMATIONS,
  chartFrame: ComponentFrameEnum.COMMON,
  image: 'text_static.png'
}

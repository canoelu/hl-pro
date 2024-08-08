import { MaterialItem} from '@/typings/design'
import { ChatCategoryEnum,ChatCategoryEnumName } from '../../index.d'
import { MaterialPackageEnum, ComponentFrameEnum } from '@/enums'

export const TextCommonConfig: MaterialItem = {
  key: 'TextCommon',
  chartKey: 'VTextCommon',
  conKey: 'VCTextCommon',
  title: '文字',
  category: ChatCategoryEnum.TEXT,
  categoryName: ChatCategoryEnumName.TEXT,
  package: MaterialPackageEnum.INFORMATIONS,
  chartFrame: ComponentFrameEnum.COMMON,
  image: 'text_static.png'
}

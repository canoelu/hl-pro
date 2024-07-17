import { ConfigType} from '@/typings/design'
import { ChatCategoryEnum, ChatCategoryEnumName } from '../../index.d'
import { PackagesCategoryEnum, ComponentFrameEnum } from '@/enums'

export const Border02Config: ConfigType = {
  key: 'Border02',
  chartKey: 'VBorder02',
  conKey: 'VCBorder02',
  title: '边框-02',
  category: ChatCategoryEnum.BORDER,
  categoryName: ChatCategoryEnumName.BORDER,
  package: PackagesCategoryEnum.DECORATES,
  chartFrame: ComponentFrameEnum.STATIC,
  image: 'border02.png'
}

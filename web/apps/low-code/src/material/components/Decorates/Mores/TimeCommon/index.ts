import { MaterialItem} from '@/typings/design'
import { ChatCategoryEnum,ChatCategoryEnumName } from '../../index.d'
import { MaterialPackageEnum, ComponentFrameEnum } from '@/enums'

export const TimeCommonConfig: MaterialItem = {
  key: 'TimeCommon',
  chartKey: 'VTimeCommon',
  conKey: 'VCTimeCommon',
  title: '通用时间',
  category: ChatCategoryEnum.MORE,
  categoryName: ChatCategoryEnumName.MORE,
  package: MaterialPackageEnum.DECORATES,
  chartFrame: ComponentFrameEnum.STATIC,
  image: 'time.png'
}

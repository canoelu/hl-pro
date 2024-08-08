import { MaterialItem } from '@/typings/design'
import { ChatCategoryEnum, ChatCategoryEnumName } from '../../index.d'
import { MaterialPackageEnum, ComponentFrameEnum } from '@/enums'

export const CirclePointConfig: MaterialItem = {
  key: 'CirclePoint',
  chartKey: 'VCirclePoint',
  conKey: 'VCCirclePoint',
  title: '圆点光环',
  category: ChatCategoryEnum.MORE,
  categoryName: ChatCategoryEnumName.MORE,
  package: MaterialPackageEnum.DECORATES,
  chartFrame: ComponentFrameEnum.STATIC,
  image: 'flow-circle.png',
}

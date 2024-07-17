import { ConfigType } from '@/typings/design'
import { ChatCategoryEnum, ChatCategoryEnumName } from '../../index.d'
import { PackagesCategoryEnum, ComponentFrameEnum } from '@/enums'

export const CirclePointConfig: ConfigType = {
  key: 'CirclePoint',
  chartKey: 'VCirclePoint',
  conKey: 'VCCirclePoint',
  title: '圆点光环',
  category: ChatCategoryEnum.MORE,
  categoryName: ChatCategoryEnumName.MORE,
  package: PackagesCategoryEnum.DECORATES,
  chartFrame: ComponentFrameEnum.STATIC,
  image: 'flow-circle.png',
}

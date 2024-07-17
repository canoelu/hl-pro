import { ConfigType } from '@/typings/design'
import { ChatCategoryEnum, ChatCategoryEnumName } from '../../index.d'
import { PackagesCategoryEnum, ComponentFrameEnum } from '@/enums'

export const CountDownConfig: ConfigType = {
  key: 'CountDown',
  chartKey: 'VCountDown',
  conKey: 'VCCountDown',
  title: '倒计时',
  category: ChatCategoryEnum.MORE,
  categoryName: ChatCategoryEnumName.MORE,
  package: PackagesCategoryEnum.DECORATES,
  chartFrame: ComponentFrameEnum.COMMON,
  image: 'countdown.png',
}

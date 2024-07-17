import { ConfigType } from '@/typings/design'
import { ChatCategoryEnum, ChatCategoryEnumName } from '../../index.d'
import { PackagesCategoryEnum, ComponentFrameEnum } from '@/enums'

export const Decorates02Config: ConfigType = {
  key: 'Decorates02',
  chartKey: 'VDecorates02',
  conKey: 'VCDecorates02',
  title: '装饰-02',
  category: ChatCategoryEnum.DECORATE,
  categoryName: ChatCategoryEnumName.DECORATE,
  package: PackagesCategoryEnum.DECORATES,
  chartFrame: ComponentFrameEnum.STATIC,
  image: 'decorates02.png',
}

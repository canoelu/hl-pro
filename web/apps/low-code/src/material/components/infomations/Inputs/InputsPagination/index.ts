import { ConfigType } from '@/typings/design'
import { ChatCategoryEnum, ChatCategoryEnumName } from '../../index.d'
import { PackagesCategoryEnum, ComponentFrameEnum } from '@/enums'

export const InputsPaginationConfig: ConfigType = {
  key: 'InputsPagination',
  chartKey: 'VInputsPagination',
  conKey: 'VCInputsPagination',
  title: '分页',
  category: ChatCategoryEnum.INPUTS,
  categoryName: ChatCategoryEnumName.INPUTS,
  package: PackagesCategoryEnum.INFORMATIONS,
  chartFrame: ComponentFrameEnum.STATIC,
  image: 'inputs_pagination.png',
}

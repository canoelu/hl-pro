import { MaterialItem } from '@/typings/design'
import { ChatCategoryEnum, ChatCategoryEnumName } from '../../index.d'
import { MaterialPackageEnum, ComponentFrameEnum } from '@/enums'

export const InputsPaginationConfig: MaterialItem = {
  key: 'InputsPagination',
  chartKey: 'VInputsPagination',
  conKey: 'VCInputsPagination',
  title: '分页',
  category: ChatCategoryEnum.INPUTS,
  categoryName: ChatCategoryEnumName.INPUTS,
  package: MaterialPackageEnum.INFORMATIONS,
  chartFrame: ComponentFrameEnum.STATIC,
  image: 'inputs_pagination.png',
}

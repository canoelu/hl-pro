import { MaterialItem } from '@/typings/design'
import { ChatCategoryEnum, ChatCategoryEnumName } from '../../index.d'
import { MaterialPackageEnum, ComponentFrameEnum } from '@/enums'
export const TableScrollBoardConfig: MaterialItem = {
  key: 'TableScrollBoard',
  chartKey: 'VTableScrollBoard',
  conKey: 'VCTableScrollBoard',
  title: '轮播列表',
  category: ChatCategoryEnum.TABLE,
  categoryName: ChatCategoryEnumName.TABLE,
  package: MaterialPackageEnum.TABLES,
  chartFrame: ComponentFrameEnum.COMMON,
  image: 'table_scrollboard.png',
}

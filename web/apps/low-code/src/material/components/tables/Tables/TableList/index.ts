import { MaterialItem } from '@/typings/design'
import { MaterialPackageEnum, ComponentFrameEnum } from '@/enums'
import { ChatCategoryEnum, ChatCategoryEnumName } from '../../index.d'

export const TableListConfig: MaterialItem = {
  key: 'TableList',
  chartKey: 'VTableList',
  conKey: 'VCTableList',
  title: '滚动排名列表',
  category: ChatCategoryEnum.TABLE,
  categoryName: ChatCategoryEnumName.TABLE,
  package: MaterialPackageEnum.TABLES,
  chartFrame: ComponentFrameEnum.COMMON,
  image: 'tables_list.png',
}

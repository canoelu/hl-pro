import { MaterialItem } from '@/typings/design'
import { ChatCategoryEnum, ChatCategoryEnumName } from '../../index.d'
import { MaterialPackageEnum, ComponentFrameEnum } from '@/enums'

export const TablesBasicConfig: MaterialItem = {
  key: 'TablesBasic',
  chartKey: 'VTablesBasic',
  conKey: 'VCTablesBasic',
  title: '基础分页表格',
  category: ChatCategoryEnum.TABLE,
  categoryName: ChatCategoryEnumName.TABLE,
  package: MaterialPackageEnum.TABLES,
  chartFrame: ComponentFrameEnum.COMMON,
  image: 'tables_basic.png'
}

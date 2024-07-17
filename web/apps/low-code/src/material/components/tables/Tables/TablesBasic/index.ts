import { ConfigType } from '@/typings/design'
import { ChatCategoryEnum, ChatCategoryEnumName } from '../../index.d'
import { PackagesCategoryEnum, ComponentFrameEnum } from '@/enums'

export const TablesBasicConfig: ConfigType = {
  key: 'TablesBasic',
  chartKey: 'VTablesBasic',
  conKey: 'VCTablesBasic',
  title: '基础分页表格',
  category: ChatCategoryEnum.TABLE,
  categoryName: ChatCategoryEnumName.TABLE,
  package: PackagesCategoryEnum.TABLES,
  chartFrame: ComponentFrameEnum.COMMON,
  image: 'tables_basic.png'
}

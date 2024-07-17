import { ConfigType } from '@/typings/design'
import { ChatCategoryEnum, ChatCategoryEnumName } from '../../index.d'
import { PackagesCategoryEnum } from '@/enums'
export const PipelineHConfig: ConfigType = {
  key: 'PipelineH',
  chartKey: 'VPipelineH',
  conKey: 'VCPipelineH',
  title: '管道-横向',
  category: ChatCategoryEnum.MORE,
  categoryName: ChatCategoryEnumName.MORE,
  package: PackagesCategoryEnum.DECORATES,
  image: 'Pipeline_H.png',
}

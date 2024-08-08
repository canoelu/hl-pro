import { MaterialItem } from '@/typings/design'
import { ChatCategoryEnum, ChatCategoryEnumName } from '../../index.d'
import { MaterialPackageEnum } from '@/enums'
export const PipelineHConfig: MaterialItem = {
  key: 'PipelineH',
  chartKey: 'VPipelineH',
  conKey: 'VCPipelineH',
  title: '管道-横向',
  category: ChatCategoryEnum.MORE,
  categoryName: ChatCategoryEnumName.MORE,
  package: MaterialPackageEnum.DECORATES,
  image: 'Pipeline_H.png',
}

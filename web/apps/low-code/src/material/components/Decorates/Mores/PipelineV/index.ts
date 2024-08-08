import { MaterialItem } from '@/typings/design'
import { ChatCategoryEnum, ChatCategoryEnumName } from '../../index.d'
import { MaterialPackageEnum } from '@/enums'
export const PipelineVConfig: MaterialItem = {
  key: 'PipelineV',
  chartKey: 'VPipelineV',
  conKey: 'VCPipelineV',
  title: '管道-纵向',
  category: ChatCategoryEnum.MORE,
  categoryName: ChatCategoryEnumName.MORE,
  package: MaterialPackageEnum.DECORATES,
  image: 'Pipeline_V.png',
}

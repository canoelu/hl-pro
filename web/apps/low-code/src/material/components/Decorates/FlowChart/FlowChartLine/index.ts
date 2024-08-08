import { MaterialItem } from '@/typings/design'
import { ChatCategoryEnum, ChatCategoryEnumName } from '../../index.d'
import { MaterialPackageEnum, ComponentFrameEnum } from '@/enums'

export const FlowChartLineConfig: MaterialItem = {
  key: 'FlowChartLine',
  chartKey: 'VFlowChartLine',
  conKey: 'VCFlowChartLine',
  title: '流程线',
  category: ChatCategoryEnum.FlowChart,
  categoryName: ChatCategoryEnumName.FlowChart,
  package: MaterialPackageEnum.DECORATES,
  chartFrame: ComponentFrameEnum.STATIC,
  image: 'flow-zhexian.png',
}

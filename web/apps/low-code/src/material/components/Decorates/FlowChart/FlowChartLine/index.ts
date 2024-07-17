import { ConfigType } from '@/typings/design'
import { ChatCategoryEnum, ChatCategoryEnumName } from '../../index.d'
import { PackagesCategoryEnum, ComponentFrameEnum } from '@/enums'

export const FlowChartLineConfig: ConfigType = {
  key: 'FlowChartLine',
  chartKey: 'VFlowChartLine',
  conKey: 'VCFlowChartLine',
  title: '流程线',
  category: ChatCategoryEnum.FlowChart,
  categoryName: ChatCategoryEnumName.FlowChart,
  package: PackagesCategoryEnum.DECORATES,
  chartFrame: ComponentFrameEnum.STATIC,
  image: 'flow-zhexian.png',
}

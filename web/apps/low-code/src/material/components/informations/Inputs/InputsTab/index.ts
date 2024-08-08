import { MaterialItem } from '@/typings/design'
import { ChatCategoryEnum, ChatCategoryEnumName } from '../../index.d'
import { MaterialPackageEnum, ComponentFrameEnum } from '@/enums'

export const InputsTabConfig: MaterialItem = {
  key: 'InputsTab',
  chartKey: 'VInputsTab',
  conKey: 'VCInputsTab',
  title: '标签选择器',
  category: ChatCategoryEnum.INPUTS,
  categoryName: ChatCategoryEnumName.INPUTS,
  package: MaterialPackageEnum.INFORMATIONS,
  chartFrame: ComponentFrameEnum.STATIC,
  image: 'inputs_tab.png',
}

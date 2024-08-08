import { MaterialItem } from '@/typings/design'
import { ChatCategoryEnum, ChatCategoryEnumName } from '../../index.d'
import { MaterialPackageEnum, ComponentFrameEnum } from '@/enums'

export const InputsSelectConfig: MaterialItem = {
  key: 'InputsSelect',
  chartKey: 'VInputsSelect',
  conKey: 'VCInputsSelect',
  title: '下拉选择器',
  category: ChatCategoryEnum.INPUTS,
  categoryName: ChatCategoryEnumName.INPUTS,
  package: MaterialPackageEnum.INFORMATIONS,
  chartFrame: ComponentFrameEnum.STATIC,
  image: 'inputs_select.png',
}

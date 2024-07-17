import { ConfigType } from '@/typings/design'
import { ChatCategoryEnum, ChatCategoryEnumName } from '../../index.d'
import { PackagesCategoryEnum, ComponentFrameEnum } from '@/enums'

export const InputsSelectConfig: ConfigType = {
  key: 'InputsSelect',
  chartKey: 'VInputsSelect',
  conKey: 'VCInputsSelect',
  title: '下拉选择器',
  category: ChatCategoryEnum.INPUTS,
  categoryName: ChatCategoryEnumName.INPUTS,
  package: PackagesCategoryEnum.INFORMATIONS,
  chartFrame: ComponentFrameEnum.STATIC,
  image: 'inputs_select.png',
}

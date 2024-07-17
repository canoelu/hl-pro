import { ConfigType } from '@/typings/design'
import { ChatCategoryEnum, ChatCategoryEnumName } from '../../index.d'
import { PackagesCategoryEnum, ComponentFrameEnum } from '@/enums'

export const InputsInputConfig: ConfigType = {
  key: 'InputsInput',
  chartKey: 'VInputsInput',
  conKey: 'VCInputsInput',
  title: '输入框',
  category: ChatCategoryEnum.INPUTS,
  categoryName: ChatCategoryEnumName.INPUTS,
  package: PackagesCategoryEnum.INFORMATIONS,
  chartFrame: ComponentFrameEnum.STATIC,
  image: 'inputs_input.png',
}

import { MaterialItem } from '@/typings/design'
import { ChatCategoryEnum, ChatCategoryEnumName } from '../../index.d'
import { MaterialPackageEnum, ComponentFrameEnum } from '@/enums'

export const InputsInputConfig: MaterialItem = {
  key: 'InputsInput',
  chartKey: 'VInputsInput',
  conKey: 'VCInputsInput',
  title: '输入框',
  category: ChatCategoryEnum.INPUTS,
  categoryName: ChatCategoryEnumName.INPUTS,
  package: MaterialPackageEnum.INFORMATIONS,
  chartFrame: ComponentFrameEnum.STATIC,
  image: 'inputs_input.png',
}

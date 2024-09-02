import type { IMetaContainerItem } from '@hl/core'
import { ComponentGroup, Material, FormTypeEnum } from '@hl/core'

export const componentName = 'Image'
class ImageComponent extends Material {
  constructor(id?: string, name?: string) {
    super({
      component: componentName,
      group: ComponentGroup.BASIC,
      name: name ? name : '图片',
      id,
      width: 200,
      height: 200
    })
  }

  _formProp: IMetaContainerItem[] = []
  _style: IMetaContainerItem[] = [
    {
      label: '背景设置',
      prop: 'back',
      children: [
        {
          prop: 'background',
          label: '背景',
          type: FormTypeEnum.BACKGROUND,
          props: {
            defaultValue: { backgroundColor: '#14c9c9' }
          }
        }
      ]
    }
  ]
}

export default ImageComponent

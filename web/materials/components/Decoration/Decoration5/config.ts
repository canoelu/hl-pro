import type { IMetaContainerItem } from '@hl/core'
import { ComponentGroup, Material, FormTypeEnum } from '@hl/core'

export const componentName = 'Decoration5'
class DecorationComponent extends Material {
  constructor(id?: string, name?: string) {
    super({
      component: componentName,
      group: ComponentGroup.DECORATION,
      name: name ? name : '5#装饰',
      id,
      width: 260,
      height: 50
    })
  }

  _formProp: IMetaContainerItem[] = [
    {
      label: '基础配置',
      prop: 'base',
      children: [
        {
          prop: 'color1',
          label: '颜色1',
          type: FormTypeEnum.COLOR,
          props: {
            defaultValue: '#00c2ff'
          }
        },
        {
          prop: 'color2',
          label: '颜色2',
          type: FormTypeEnum.COLOR,
          props: {
            defaultValue: '#00c2ff4d'
          }
        },
        {
          prop: 'dur',
          label: '速度',
          type: FormTypeEnum.NUMBER,
          props: {
            defaultValue: 3
          }
        }
      ]
    }
  ]
  _style: IMetaContainerItem[] = []
}

export default DecorationComponent

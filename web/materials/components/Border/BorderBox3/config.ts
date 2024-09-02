import type { IMetaContainerItem } from '@hl/core'
import { ComponentGroup, Material, FormTypeEnum } from '@hl/core'

export const componentName = 'BorderBox3'
class BorderBoxComponent extends Material {
  constructor(id?: string, name?: string) {
    super({
      component: componentName,
      group: ComponentGroup.BORDER,
      name: name ? name : '3#边框',
      id,
      width: 260,
      height: 260
    })
  }

  _formProp: IMetaContainerItem[] = [
    {
      label: '基础配置',
      prop: 'base',
      children: [
        {
          prop: 'color1',
          label: '边框颜色1',
          type: FormTypeEnum.COLOR,
          props: {
            defaultValue: '#1d48c4'
          }
        },
        {
          prop: 'color2',
          label: '边框颜色2',
          type: FormTypeEnum.COLOR,
          props: {
            defaultValue: '#d3e1f8'
          }
        },
        {
          prop: 'backgroundColor',
          label: '底色',
          type: FormTypeEnum.COLOR,
          props: {
            defaultValue: '#00000000'
          }
        }
      ]
    }
  ]
  _style: IMetaContainerItem[] = []
}

export default BorderBoxComponent

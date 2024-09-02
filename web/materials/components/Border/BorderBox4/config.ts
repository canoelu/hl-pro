import type { IMetaContainerItem } from '@hl/core'
import { ComponentGroup, Material, FormTypeEnum } from '@hl/core'

export const componentName = 'BorderBox4'
class BorderBoxComponent extends Material {
  constructor(id?: string, name?: string) {
    super({
      component: componentName,
      group: ComponentGroup.BORDER,
      name: name ? name : '4#边框',
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
            defaultValue: '#11eefd'
          }
        },
        {
          prop: 'color2',
          label: '边框颜色2',
          type: FormTypeEnum.COLOR,
          props: {
            defaultValue: '#0078d2'
          }
        },
        {
          prop: 'backgroundColor',
          label: '底色',
          type: FormTypeEnum.COLOR,
          props: {
            defaultValue: '#00000000'
          }
        },
        {
          prop: 'reverse',
          label: '反转',
          type: FormTypeEnum.SWITCH,
          props: {
            defaultValue: false
          }
        },
        {
          prop: 'dur',
          label: '时间',
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

export default BorderBoxComponent

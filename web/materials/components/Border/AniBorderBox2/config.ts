import type { IMetaContainerItem } from '@hl/core'
import { ComponentGroup, Material, FormTypeEnum } from '@hl/core'

export const componentName = 'AnimateBorderBox2'
class BorderBoxComponent extends Material {
  constructor(id?: string, name?: string) {
    super({
      component: componentName,
      group: ComponentGroup.BORDER,
      name: name ? name : '1#边框',
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
            defaultValue: '#8aaafb'
          }
        },
        {
          prop: 'color2',
          label: '边框颜色2',
          type: FormTypeEnum.COLOR,
          props: {
            defaultValue: '#1f33a2'
          }
        },
        {
          prop: 'dur',
          label: '动画',
          type: FormTypeEnum.NUMBER,
          props: {
            defaultValue: 2
          }
        },
        {
          prop: 'reverse',
          label: '反向',
          type: FormTypeEnum.SWITCH,
          props: {
            defaultValue: false
          }
        },
        {
          prop: 'backgroundColor',
          label: '底色',
          type: FormTypeEnum.COLOR,
          props: {
            defaultValue: 'transparent'
          }
        }
      ]
    }
  ]
  _style: IMetaContainerItem[] = []
}

export default BorderBoxComponent

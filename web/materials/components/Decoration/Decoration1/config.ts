import type { IMetaContainerItem } from '@hl/core'
import { ComponentGroup, Material, FormTypeEnum } from '@hl/core'

export const componentName = 'Decoration1'
class DecorationComponent extends Material {
  constructor(id?: string, name?: string) {
    super({
      component: componentName,
      group: ComponentGroup.DECORATION,
      name: name ? name : '1#装饰',
      id,
      width: 200,
      height: 30
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
            defaultValue: '#3faacb'
          }
        },
        {
          prop: 'color2',
          label: '颜色2',
          type: FormTypeEnum.COLOR,
          props: {
            defaultValue: '#fff'
          }
        },
        {
          prop: 'endWidth',
          label: '末端长度',
          type: FormTypeEnum.NUMBER,
          props: {
            defaultValue: 5
          }
        },
        {
          prop: 'lineHeight',
          label: '线条高度',
          type: FormTypeEnum.NUMBER,
          props: {
            defaultValue: 2
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

import type { IMetaContainerItem } from '@hl/core'
import { ComponentGroup, Material, FormTypeEnum } from '@hl/core'

export const componentName = 'Decoration3'
class DecorationComponent extends Material {
  constructor(id?: string, name?: string) {
    super({
      component: componentName,
      group: ComponentGroup.DECORATION,
      name: name ? name : '3#装饰',
      id,
      width: 260,
      height: 30
    })
  }

  _formProp: IMetaContainerItem[] = [
    {
      label: '基础配置',
      prop: 'base',
      children: [
        {
          label: '内容',
          prop: 'dataset',
          type: FormTypeEnum.TEXT,
          props: {
            defaultValue: '标题'
          }
        },
        {
          label: '文字大小',
          prop: 'textSize',
          type: FormTypeEnum.NUMBER,
          props: {
            defaultValue: 24
          }
        }, {
          label: '文字颜色',
          prop: 'textColor',
          type: FormTypeEnum.COLOR,
          props: {
            defaultValue: '#fff'
          }
        },
        {
          prop: 'color1',
          label: '颜色1',
          type: FormTypeEnum.COLOR,
          props: {
            defaultValue: '#7acaec'
          }
        },
        {
          prop: 'color2',
          label: '颜色2',
          type: FormTypeEnum.COLOR,
          props: {
            defaultValue: '#7acaec'
          }
        },
        {
          prop: 'rectWidth',
          label: '单个矩形宽度',
          type: FormTypeEnum.NUMBER,
          props: {
            defaultValue: 7
          }
        },
        {
          prop: 'space',
          label: '矩形间距',
          type: FormTypeEnum.NUMBER,
          props: {
            defaultValue: 1
          }
        }
      ]
    }
  ]
  _style: IMetaContainerItem[] = []
}

export default DecorationComponent

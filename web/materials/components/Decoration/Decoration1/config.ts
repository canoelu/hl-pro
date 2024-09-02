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
      height: 60
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
            defaultValue: '#fff'
          }
        },
        {
          prop: 'color2',
          label: '颜色2',
          type: FormTypeEnum.COLOR,
          props: {
            defaultValue: '#0de7c2'
          }
        },
        {
          prop: 'pointSideLength',
          label: '点大小',
          type: FormTypeEnum.NUMBER,
          props: {
            defaultValue: 5
          }
        }
      ]
    }
  ]
  _style: IMetaContainerItem[] = []
}

export default DecorationComponent

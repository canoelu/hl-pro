import type { IMetaContainerItem } from '@hl/core'
import { ComponentGroup, Material, FormTypeEnum } from '@hl/core'

export const componentName = 'BorderBox1'
class BorderBoxComponent extends Material {
  constructor(id?: string, name?: string) {
    super({
      component: componentName,
      group: ComponentGroup.BORDER,
      name: name ? name : '2#边框',
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
            defaultValue: '#6586ec'
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
          prop: 'backgroundColor',
          label: '底色',
          type: FormTypeEnum.COLOR,
          props: {
            defaultValue: 'transparent'
          }
        }
      ]
    },
    {
      label: '标题',
      prop: 'text',
      children: [
        {
          prop: 'borderTitle',
          label: '文字',
          type: FormTypeEnum.TEXT,
          props: {
            defaultValue: '文字'
          }
        },
        {
          prop: 'borderTitleColor',
          label: '颜色',
          type: FormTypeEnum.COLOR,
          props: {
            defaultValue: '#fff'
          }
        },
        {
          prop: 'borderTitleSize',
          label: '大小',
          type: FormTypeEnum.NUMBER,
          props: {
            defaultValue: 16
          }
        },
        {
          prop: 'borderTitleHeight',
          label: '标题高度',
          type: FormTypeEnum.NUMBER,
          props: {
            defaultValue: 32
          }
        },
        {
          prop: 'borderTitleWidth',
          label: '标题宽度',
          type: FormTypeEnum.NUMBER,
          props: {
            defaultValue: 120
          }
        }
      ]
    }
  ]
  _style: IMetaContainerItem[] = []
}

export default BorderBoxComponent

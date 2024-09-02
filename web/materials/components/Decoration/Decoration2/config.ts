import type { IMetaContainerItem } from '@hl/core'
import { ComponentGroup, Material, FormTypeEnum } from '@hl/core'
import { h } from 'vue'

export const componentName = 'Decoration2'
class DecorationComponent extends Material {
  constructor(id?: string, name?: string) {
    super({
      component: componentName,
      group: ComponentGroup.DECORATION,
      name: name ? name : '2#装饰',
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
            defaultValue: '#6586ec80'
          }
        },
        {
          prop: 'color2',
          label: '颜色2',
          type: FormTypeEnum.COLOR,
          props: {
            defaultValue: '#2cf7fe80'
          }
        },
        {
          prop: 'text',
          label: '文本',
          type: FormTypeEnum.TEXT,
          props: {
            defaultValue: 'hl-pro'
          }
        }
      ]
    }
  ]
  _style: IMetaContainerItem[] = [
    {
      label: '字体设置',
      prop: 'font',
      children: [
        {
          prop: 'color',
          label: '颜色',
          type: FormTypeEnum.COLOR,
          props: {
            defaultValue: '#1E90FF'
          }
        },
        {
          prop: 'fontSize',
          label: '字体大小',
          type: FormTypeEnum.NUMBER,
          props: {
            defaultValue: 20,
            suffix: () => h('span', {}, 'px')
          }
        },
        {
          prop: 'fontWeight',
          label: '字体宽度',
          type: FormTypeEnum.NUMBER,
          props: {
            defaultValue: 200
          }
        },
        {
          prop: 'fontFamily',
          label: '字体',
          type: FormTypeEnum.FONT_STYLE,
          props: {
            defaultValue: 'Arial'
          }
        }
      ]
    }
  ]
}

export default DecorationComponent

import type { IMetaContainerItem } from '@hl/core'
import { ComponentGroup, Material, FormTypeEnum } from '@hl/core'
import { h } from 'vue'

export const componentName = 'Tabs'
class TabsComponent extends Material {
  constructor(id?: string, name?: string) {
    super({
      component: componentName,
      group: ComponentGroup.CONTAINER,
      name: name ? name : '标签页',
      id,
      width: 400,
      height: 200
    })
  }

  _formProp: IMetaContainerItem[] = [
    {
      label: '标签配置',
      prop: 'label',
      children: [
        {
          prop: 'mode',
          label: '模式',
          type: FormTypeEnum.SELECT,
          props: {
            defaultValue: 'horizontal',
            options: [
              {
                label: '垂直',
                value: 'vertical'
              },
              {
                label: '水平',
                value: 'horizontal'
              }
            ]
          }
        },
        {
          prop: 'items',
          label: '标签',
          type: FormTypeEnum.ARRAY,
          props: {
            type: 'dynamic',
            defaultValue: ['标签1', '标签2'],
            minItem: 1
          }
        }
      ]
    },
    {
      label: '样式配置',
      prop: 'style',
      children: [
        {
          prop: 'height',
          label: '高度',
          type: FormTypeEnum.NUMBER,
          props: {
            defaultValue: 45,
            suffix: () => h('span', {}, 'px')
          }
        },
        {
          prop: 'color',
          label: '颜色',
          type: FormTypeEnum.COLOR,
          props: {
            defaultValue: '#03A6E0CC'
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
            defaultValue: 800
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
  _style: IMetaContainerItem[] = []
}

export default TabsComponent

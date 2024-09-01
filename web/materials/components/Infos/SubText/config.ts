import type { IMetaContainerItem } from '@hl/core'
import { ComponentGroup, Material, FormTypeEnum } from '@hl/core'
import { h } from 'vue'

export const componentName = 'SubText'
class SubTextComponent extends Material {
  constructor(id?: string, name?: string, icon?: string) {
    super({
      component: componentName,
      group: ComponentGroup.TEXT,
      name: name ? name : '数据订阅文本',
      id,
      width: 100,
      height: 30,
      icon
    })
  }

  _formProp: IMetaContainerItem[] = [
    {
      label: '基础配置',
      prop: 'base',
      children: [
        {
          prop: 'tag',
          label: '数据标签',
          type: FormTypeEnum.TEXT,
          props: {
            defaultValue: ''
          }
        },
        {
          prop: 'url',
          label: '获取数据API',
          type: FormTypeEnum.TEXT,
          props: {
            defaultValue: ''
          }
        },
        {
          prop: 'label',
          label: 'Label',
          type: FormTypeEnum.TEXT,
          props: {
            defaultValue: ''
          }
        },
        {
          prop: 'unit',
          label: '单位',
          type: FormTypeEnum.TEXT,
          props: {
            defaultValue: ''
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
          type: FormTypeEnum.FONT_WEIGHT,
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

export default SubTextComponent

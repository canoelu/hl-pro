import type { IMetaContainerItem } from '@hl/core'
import { ComponentGroup, Material, DataMode, FormTypeEnum } from '@hl/core'
import { h } from 'vue'

export const componentName = 'BasicPieChart'
class BasicPieChartComponent extends Material {
  constructor(id?: string, name?: string, icon?: string) {
    super({
      component: componentName,
      group: ComponentGroup.PIE,
      name: name ? name : '基础饼状图',
      id,
      width: 520,
      height: 260,
      icon,
      dataMode: DataMode.UNIVERSAL
    })
  }

  _formProp: IMetaContainerItem[] = [
    {
      label: '数据配置',
      prop: 'data',
      children: [
        {
          prop: 'upperLimit',
          label: '上限',
          type: FormTypeEnum.NUMBER,
          props: {
            defaultValue: 150
          }
        },
        {
          prop: 'lowerLimit',
          label: '下限',
          type: FormTypeEnum.NUMBER,
          props: {
            defaultValue: 0
          }
        }
      ]
    },
    {
      label: '图例',
      prop: 'legend',
      children: [
        {
          prop: 'isShow',
          label: '是否显示',
          type: FormTypeEnum.SWITCH,
          props: {
            defaultValue: true
          }
        }
      ]
    },
    {
      label: '标签',
      prop: 'label',
      children: [
        {
          prop: 'isShow',
          label: '是否显示',
          type: FormTypeEnum.SWITCH,
          props: {
            defaultValue: true
          }
        },
        {
          prop: 'labelColor',
          label: '文字颜色',
          type: FormTypeEnum.COLOR,
          props: {
            defaultValue: '#00BAFF'
          }
        },

        {
          prop: 'labelSize',
          label: '文字大小',
          type: FormTypeEnum.NUMBER,
          props: {
            defaultValue: 40
          }
        },
        {
          prop: 'labelWeight',
          label: '文字宽度',
          type: FormTypeEnum.FONT_WEIGHT,
          props: {
            defaultValue: 400
          }
        }
      ]
    },
    {
      label: '系列样式',
      prop: 'series',
      children: [
        {
          prop: 'radiusMin',
          label: '半径下限',
          type: FormTypeEnum.NUMBER,
          props: {
            defaultValue: 40,
            suffix: () => h('span', {}, '%')
          }
        },
        {
          prop: 'radiusMax',
          label: '半径上限',
          type: FormTypeEnum.NUMBER,
          props: {
            defaultValue: 70,
            suffix: () => h('span', {}, '%')
          }
        },

        {
          prop: 'borderRadius',
          label: '边框半径',
          type: FormTypeEnum.NUMBER,
          props: {
            defaultValue: 10
          }
        }
      ]
    }
  ]
  _style: IMetaContainerItem[] = []
  get exampleData() {
    return [
      { label: '秦', value: Math.round(Math.random() * 100) },
      { label: '齐', value: Math.round(Math.random() * 100) },
      { label: '楚', value: Math.round(Math.random() * 100) },
      { label: '赵', value: Math.round(Math.random() * 100) },
      { label: '燕', value: Math.round(Math.random() * 100) },
      { label: '韩', value: Math.round(Math.random() * 100) },
      { label: '魏', value: Math.round(Math.random() * 100) }
    ]
  }
}

export default BasicPieChartComponent

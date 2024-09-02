import type { IMetaContainerItem } from '@hl/core'
import { ComponentGroup, Material, DataMode, FormTypeEnum } from '@hl/core'

export const componentName = 'StereoscopicBarChart'
class StereoscopicBarChartComponent extends Material {
  constructor(id?: string, name?: string, icon?: string) {
    super({
      component: componentName,
      group: ComponentGroup.BAR,
      name: name ? name : '立体柱状图',
      id,
      width: 500,
      height: 170,
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
        },
        {
          prop: 'max',
          label: '最大值',
          type: FormTypeEnum.TEXT,
          props: {
            defaultValue: 'dataMax'
          }
        },
        {
          prop: 'min',
          label: '最小值',
          type: FormTypeEnum.TEXT,
          props: {
            defaultValue: '0'
          }
        },
        {
          prop: 'maxOffset',
          label: '最大偏移值',
          type: FormTypeEnum.NUMBER,
          props: {
            defaultValue: 0
          }
        },
        {
          prop: 'minOffset',
          label: '最小偏移值',
          type: FormTypeEnum.NUMBER,
          props: {
            defaultValue: 0
          }
        }
      ]
    },
    {
      label: '柱配置',
      prop: 'label',
      children: [
        {
          prop: 'axisLabelColor',
          label: '柱体颜色',
          type: FormTypeEnum.COLOR,
          props: {
            defaultValue: '#3DE7C9'
          }
        }
      ]
    },
    {
      label: '坐标轴配置',
      prop: 'axis',
      children: [
        {
          prop: 'axisColor',
          label: '轴线颜色',
          type: FormTypeEnum.COLOR,
          props: {
            defaultValue: '#00BAFF'
          }
        },
        {
          prop: 'axisLabelColor',
          label: '轴线文字颜色',
          type: FormTypeEnum.COLOR,
          props: {
            defaultValue: '#00BAFF'
          }
        },

        {
          prop: 'xshow',
          label: 'X网格线是否显示',
          type: FormTypeEnum.SWITCH,
          props: {
            defaultValue: true
          }
        },
        {
          prop: 'yshow',
          label: 'Y网格线是否显示',
          type: FormTypeEnum.SWITCH,
          props: {
            defaultValue: true
          }
        },
        {
          prop: 'xLineType',
          label: 'X轴网格线样式',
          type: FormTypeEnum.SELECT,
          props: {
            defaultValue: 'dotted',
            options: [
              { value: 'solid', label: 'solid' },
              { value: 'dotted', label: 'dotted' },
              { value: 'dashed', label: 'dashed' }
            ]
          }
        },
        {
          prop: 'yLineType',
          label: 'Y轴网格线样式',
          type: FormTypeEnum.SELECT,
          props: {
            defaultValue: 'dotted',
            options: [
              { value: 'solid', label: 'solid' },
              { value: 'dotted', label: 'dotted' },
              { value: 'dashed', label: 'dashed' }
            ]
          }
        },
        {
          prop: 'xAxisLineColor',
          label: 'x轴网格线颜色',
          type: FormTypeEnum.COLOR,
          props: {
            defaultValue: '#3391E4'
          }
        },
        {
          prop: 'yAxisLineColor',
          label: 'y轴网格线颜色',
          type: FormTypeEnum.COLOR,
          props: {
            defaultValue: '#3391E4'
          }
        }
      ]
    }
  ]
  _style: IMetaContainerItem[] = []
  get exampleData(): any {
    return [
      { label: '北京', value: Math.round(Math.random() * 100) },
      { label: '上海', value: Math.round(Math.random() * 100) },
      { label: '杭州', value: Math.round(Math.random() * 100) },
      { label: '广州', value: Math.round(Math.random() * 100) }
    ]
  }
}

export default StereoscopicBarChartComponent

import type { IMetaContainerItem } from '@hl/core'
import { ComponentGroup, Material, FormTypeEnum } from '@hl/core'
import { h } from 'vue'

export const componentName = 'Progress'
class ProgressComponent extends Material {
  constructor(id?: string, name?: string, icon?: string) {
    super({
      component: componentName,
      group: ComponentGroup.PROGERSS,
      name: name ? name : '进度条',
      id,
      width: 200,
      height: 50,
      icon
    })
  }

  _formProp: IMetaContainerItem[] = [
    {
      label: '数据配置',
      prop: 'data',
      children: [
        {
          prop: 'history',
          label: '历史数据地址',
          type: FormTypeEnum.TEXT,
          props: {
            defaultValue: ''
          }
        },
        {
          prop: 'datatag',
          label: '数据标签',
          type: FormTypeEnum.TEXT,
          props: {
            defaultValue: ''
          }
        },
        {
          prop: 'maxValue',
          label: '最大值',
          type: FormTypeEnum.NUMBER,
          props: {
            defaultValue: 150
          }
        }
      ]
    },
    {
      label: '属性配置',
      prop: 'attr',
      children: [
        {
          prop: 'color1',
          label: '颜色1',
          type: FormTypeEnum.COLOR,
          props: {
            defaultValue: '#3DE7C9'
          }
        },
        {
          prop: 'color2',
          label: '颜色2',
          type: FormTypeEnum.COLOR,
          props: {
            defaultValue: '#00BAFF'
          }
        },
        {
          prop: 'borderWidth',
          label: '边框宽度',
          type: FormTypeEnum.NUMBER,
          props: {
            defaultValue: 3
          }
        },
        {
          prop: 'borderGap',
          label: '边框间隔',
          type: FormTypeEnum.NUMBER,
          props: {
            defaultValue: 3
          }
        },
        {
          prop: 'lineDash',
          label: '线条宽度',
          type: FormTypeEnum.NUMBER,
          props: {
            defaultValue: 5
          }
        },
        {
          prop: 'gapWeight',
          label: '线条间隙',
          type: FormTypeEnum.NUMBER,
          props: {
            defaultValue: 1
          }
        },
        {
          prop: 'fontSize',
          label: '字体大小',
          type: FormTypeEnum.NUMBER,
          props: {
            defaultValue: 15,
            suffix: () => h('span', {}, 'px')
          }
        },
        {
          prop: 'textColor',
          label: '文字颜色',
          type: FormTypeEnum.COLOR,
          props: {
            defaultValue: '#fff'
          }
        },
        {
          prop: 'borderRadius',
          label: '圆角',
          type: FormTypeEnum.NUMBER,
          props: {
            defaultValue: 5
          }
        },
        {
          prop: 'localGradient',
          label: '局部渐变',
          type: FormTypeEnum.SWITCH,
          props: {
            defaultValue: false
          }
        },
        {
          prop: 'formatter',
          label: '文字格式化',
          type: FormTypeEnum.TEXT,
          props: {
            defaultValue: '{value}%'
          }
        }
      ]
    }
  ]
  _style: IMetaContainerItem[] = []
}

export default ProgressComponent

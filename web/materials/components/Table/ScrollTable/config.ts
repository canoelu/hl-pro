import type { IMetaContainerItem } from '@hl/core'
import { ComponentGroup, Material, DataMode, FormTypeEnum } from '@hl/core'
import { h, shallowRef } from 'vue'

import ScrollTableForm from './Form.vue'

export const componentName = 'ScrollTable'
class ScrollTableComponent extends Material {
  constructor(id?: string, name?: string, icon?: string) {
    super({
      component: componentName,
      group: ComponentGroup.TABLE,
      name: name ? name : '滚动表格',
      id,
      width: 400,
      height: 100,
      icon,
      dataMode: DataMode.UNIVERSAL
    })
  }

  _formProp: IMetaContainerItem[] = [
    {
      label: '表头',
      prop: 'header',
      children: [
        {
          prop: 'header',
          label: '表头数据',
          type: FormTypeEnum.ARRAY,
          props: {
            type: 'dynamic',
            defaultValue: ['姓名', '年龄', '性别']
          }
        },
        {
          prop: 'headerBGC',
          label: '背景色',
          type: FormTypeEnum.COLOR,
          props: {
            defaultValue: '#00BAFF'
          }
        },
        {
          prop: 'headerHeight',
          label: '高度',
          type: FormTypeEnum.NUMBER,
          props: {
            defaultValue: 35,
            suffix: () => h('span', {}, 'px')
          }
        },
        {
          prop: 'index',
          label: '是否显示索引',
          type: FormTypeEnum.SWITCH,
          props: {
            defaultValue: false
          }
        },
        {
          prop: 'indexHeader',
          label: '索引显示',
          type: FormTypeEnum.TEXT,
          props: {
            defaultValue: '#'
          }
        }
      ]
    },
    {
      label: '行设置',
      prop: 'rows',
      children: [
        {
          prop: 'data',
          label: '行配置',
          type: FormTypeEnum.CUSTOM,
          showLabel: false,
          props: {
            componentType: shallowRef(ScrollTableForm),
            defaultValue: {
              height: 30,
              oddRowBGC: '#003B51',
              evenRowBGC: '#0A2732'
            }
          }
        }
      ]
    }
  ]

  get exampleData() {
    return [
      {
        name: '张三',
        age: 23,
        sex: '男'
      },
      {
        name: '张三',
        age: 23,
        sex: '男'
      },
      {
        name: '张三',
        age: 23,
        sex: '男'
      },
      {
        name: '张三',
        age: 23,
        sex: '男'
      },
      {
        name: '张三',
        age: 23,
        sex: '男'
      }
    ]
  }
}

export default ScrollTableComponent

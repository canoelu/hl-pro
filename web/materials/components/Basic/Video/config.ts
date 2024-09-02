import type { IMetaContainerItem } from '@hl/core'
import { Material, FormTypeEnum } from '@hl/core'

export const componentName = 'FlvVideo'
export class FlvVideoComponent extends Material {
  constructor(id?: string, name?: string) {
    super({
      component: componentName,
      name: name ? name : '视频',
      id,
      width: 400,
      height: 225
    })
  }

  _formProp: IMetaContainerItem[] = [
    {
      label: '视频配置',
      prop: 'basic',
      children: [
        {
          prop: 'url',
          label: '视频地址',
          type: FormTypeEnum.TEXT,
          props: {
            defaultValue:
              'https://www.zhangxinxu.com/study/media/cat2.mp4'
          }
        },
        {
          prop: 'videoType',
          label: '视频类型',
          type: FormTypeEnum.TEXT,
          props: {
            defaultValue: 'mp4'
          }
        },
        {
          prop: 'controls',
          label: '控制器',
          type: FormTypeEnum.SWITCH,
          props: {
            defaultValue: true
          }
        },
        {
          prop: 'autoplay',
          label: '自动播放',
          type: FormTypeEnum.SWITCH,
          props: {
            defaultValue: true
          }
        },
        {
          prop: 'loop',
          label: '循环播放',
          type: FormTypeEnum.SWITCH,
          props: {
            defaultValue: true
          }
        },
        {
          prop: 'muted',
          label: '静音',
          type: FormTypeEnum.SWITCH,
          props: {
            defaultValue: true
          }
        }
      ]
    }
  ]
  _style: IMetaContainerItem[] = []
}

export default FlvVideoComponent

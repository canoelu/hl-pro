import { ICanvasStyleData, IMetaContainerItem } from '../../types'
import { FormType, PixelEnum } from '../enums'
export const BASE_CANVAS_STYLE_DATA: ICanvasStyleData = {
  width: window.screen.width,
  height: window.screen.height,
  background: { backgroundColor: '#272e3b' },
  extraAttrs: {}
}

export const pixels = [{ label: '本设备', value: `${window.screen.width}X${window.screen.height}` }, ...PixelEnum]
export const BASE_CANVAS_STYLE_CONFIG: Array<IMetaContainerItem> = [
  {
    label: '基本配置',
    prop: 'basic',
    children: [
      {
        prop: 'pixel',
        label: '分辨率',
        type: FormType.SELECT,
        props: {
          options: pixels,
          defaultValue: `${window.screen.width}X${window.screen.height}`
        }
      },
      {
        prop: 'width',
        label: '宽度',
        type: FormType.NUMBER,
        props: {
          defaultValue: window.screen.width
        }
      },
      {
        prop: 'height',
        label: '高度',
        type: FormType.NUMBER,
        props: {
          defaultValue: window.screen.height
        }
      },
      {
        prop: 'background',
        label: '背景',
        type: FormType.BACKGROUND,
        props: {
          defaultValue: { backgroundColor: '#272e3b' }
        }
      }
    ]
  }
]


import html2canvas from 'html2canvas'
import { downloadByA } from './file'

 
  /**
 * * 截取画面为图片并下载
 * @param html 需要截取的 DOM
 */
export const canvasCut = (html: HTMLElement | null, callback?: Function) => {
    if (!html) {
      if (callback) callback()
      return
    }
    html2canvas(html, {
      backgroundColor: null,
      allowTaint: true,
      useCORS: true
    }).then((canvas: HTMLCanvasElement) => {
      downloadByA(canvas.toDataURL(), undefined, 'png')
      if (callback) callback()
    })
  }

  /**
 * * 生成一个不重复的ID
 * @param { Number } randomLength
 */
export const getUUID = (randomLength = 10) => {
    return 'id_' + Number(Math.random().toString().substring(2, randomLength) + Date.now()).toString(36)
  }
  
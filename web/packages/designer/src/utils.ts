import { isNumber } from 'lodash-es'
import { AsyncComponentLoader, defineAsyncComponent } from 'vue'

export function toPercent(val: number) {
  return parseFloat((val * 100).toFixed(4))
}
/**
 * * 异步加载组件
 * @param loader
 * @returns
 */
export const loadAsyncComponent = (loader: AsyncComponentLoader<any>) =>
  defineAsyncComponent({
    loader,
    // loadingComponent: AsyncLoading,
    delay: 10
  })


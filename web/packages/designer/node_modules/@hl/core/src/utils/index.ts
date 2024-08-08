import { isFunction, isUndefined } from 'lodash-es'
export * from './style'
export const isClass = (varValue: any) => {
  return isFunction(varValue) && !isUndefined(varValue.prototype)
}

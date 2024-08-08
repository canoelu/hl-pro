/**
 * 基础扩展类型
 */

export type StringOrNumber = string | number

/**
 * 字典对象类型
 */
export type Dict<T = any> = {
  [key: string]: T
}

export type PartialRecord<K extends keyof any, T> = {
  [P in K]?: T
}

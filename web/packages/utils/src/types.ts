export interface ICallback {
  callback: (p: unknown) => void
  errorCallback: (p: unknown) => void
}
export interface IGroupByConfig<T> {
  key: keyof T
  icon: keyof T
  parent: keyof T
  pTitle: keyof T
  children: keyof T
  cTitle: keyof T
  cIcon: keyof T
}
export type IClass = { new (...args: any[]): any }

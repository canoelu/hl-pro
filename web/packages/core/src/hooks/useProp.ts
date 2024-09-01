import { Material } from '../base'

export const useProp = <T>(
  material: Material,
  callbackProp?: (propKeys: Array<string>, value: any) => any,
  callbackStyle?: (propKeys: Array<string>, value: any) => any
): { material: Material; propValue: T } => {
  if (callbackProp) {
    material.setPropChangeCallback(callbackProp)
  }
  console.log('-callbackStyle', callbackStyle)
  if (callbackStyle) {
    console.log('callbackStyle', callbackStyle)

    material.setStyleChangeCallback(callbackStyle)
  }
  return { material, propValue: material.propValue as unknown as T }
}

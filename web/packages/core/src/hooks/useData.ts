import { onMounted, onUnmounted } from 'vue'
import { Material } from '../base'

export const useData = (material: Material, callbackData?: (data: any, type?: string) => void) => {
  if (callbackData) {
    material.setDataChangeCallback(callbackData)
  }
  // onMounted(() => {
  //   if (callbackData) {
  //     material.setDataChangeCallback(callbackData)
  //   }
  // })
  onUnmounted(() => {
    if (material.dataConfig?.dataInstance.close) {
      material.dataConfig?.dataInstance.close()
    }
  })
}
export default useData

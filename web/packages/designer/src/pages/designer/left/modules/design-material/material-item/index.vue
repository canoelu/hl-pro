<template>
  <div
    class="material-item relative border-radius-6px mb-2 p-2 cursor-pointer bg-#f2f3f5 dark:bg-dark"
    draggable="true"
    :data-component="material"
    @dragstart="e => dragStartHandle(e)"
    @dblclick="e => dblclickHandle(e, material)"
    @click="e => clickHandle(e, material)"
  >
    <div class="material-item-header mb-2 font-size-12px">{{ material.title }}</div>
    <div class="material-item-center">
      <material-img v-if="material.image" class="list-img" :image="material.image" />
      <svg-icon v-else :icon="material.icon" color="#999" width="48" style="height: auto" />
    </div>
    <div class="material-item-bottom"></div>
  </div>
</template>
<script lang="ts" setup>
import { PropType, watch, ref, Ref, computed, nextTick } from 'vue'
import { Material, useCanvas, getMaterialInstance, useDesigner, DataMode, buildDataHandler } from '@hl/core'
// import { JSONStringify } from '@/utils'
import { useDragDrop } from '../../../../hooks/useDragDrop'
import MaterialImg from './materialImg.vue'
const props = defineProps({
  material: {
    type: Object as PropType<Material>,
    default: () => ({})
  }
})

const { appendMaterialToEditor } = useDragDrop()
const dragStartHandle = async (e: DragEvent) => {
  e.stopPropagation()
  if (props.material.disabled) return
  e!.dataTransfer!.effectAllowed = 'copy'
  // 将配置项绑定到拖拽属性上
  e!.dataTransfer!.setData('componentName', props.material?.name)
}
const clickHandle = (e: MouseEvent, material: Material) => {}

const dblclickHandle = async (e: MouseEvent, material) => {
  appendMaterialToEditor(e, material?.name)
}
</script>

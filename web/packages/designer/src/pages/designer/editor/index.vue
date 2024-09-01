<template>
  <div class="designer-editor relative">
    <div
      id="editor"
      ref="editor"
      class="editor relative wh-full"
      :style="editorStyle"
      @drop="handleDrop"
      @dragover="handleDragOver"
      @mousedown.left="handleMouseDown"
      @mouseup="deselectCurComponent"
    >
      <!--页面组件列表展示-->
      <template v-for="(item, index) in cavansMaterials" :key="item.id">
        <Shape
          v-if="item.display"
          :id="'shape' + item.id"
          :defaultStyle="item.style"
          :style="getShapeStyle(item.style)"
          :active="item.id === (curMaterial || {}).id"
          :info="item"
          :class="{ lock: item.locked }"
          :index="index"
        >
          <component
            :is="item.component"
            :id="'component' + item.id"
            class="component relative wh-full"
            :style="getMaterialShapeStyle(item)"
            :component="item"
          />
        </Shape>
      </template>
      <!-- 选中区域 -->
      <Area />
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, computed, reactive, provide, readonly } from 'vue'

import { useCanvas, useDesigner, backgroundToCss, filterStyle, useAction, useData, ILocation } from '@hl/core'
import { getMaterialShapeStyle } from '@hl/designer'
import { useDragDrop } from '../hooks/useDragDrop'
import Shape from './shape'
import Area from './Area.vue'

const canvasState = useCanvas()
const designer = useDesigner()
const actionState = useAction()

const canvasStyleData = computed(() => canvasState.canvasStyleData)
const curMaterial = computed(() => canvasState.activeMaterial)
const cavansMaterials = computed(() => canvasState.cavansMaterials)
const editor = ref<HTMLDivElement | null>(null)

const { appendMaterialToEditor } = useDragDrop()

const editorX = ref<number>(0)
const editorY = ref<number>(0)
const start = reactive<Vector>({
  x: 0,
  y: 0
})
// TODO 数据问题
// provide('HOOKS', readonly({ useProp, useData }))

const editorStyle = computed<Record<string, string>>(() => {
  const backgroundStyle = backgroundToCss(canvasStyleData.value.background)
  const style = {
    ...canvasStyleData.value,
    ...backgroundStyle
  }
  return filterStyle(style, ['width', 'height', 'backgroundImage', 'backgroundSize', 'backgroundColor'])
})

const getShapeStyle = style => {
  return filterStyle(style, ['top', 'left', 'width', 'height', 'rotate'])
}
async function handleDrop(e) {
  const componentName = e.dataTransfer.getData('componentName')
  appendMaterialToEditor(e, componentName)
}

const handleMouseDown = e => {
  console.log(e)
  // 阻止默认事件，防止拖拽时出现拖拽图标
  canvasState.deactivateMaterial()
  e.preventDefault()
  e.stopPropagation()
  actionState.setHidden()
  // 获取编辑器的位移信息，每次点击时都需要获取一次。主要是为了方便开发时调试用。
  const rectInfo = editor.value?.getBoundingClientRect()
  editorX.value = rectInfo!.x
  editorY.value = rectInfo!.y
  const startX = e.clientX
  const startY = e.clientY
  start.x = (startX - editorX.value) / canvasState.scale
  start.y = (startY - editorY.value) / canvasState.scale

  const move = (moveEvent: MouseEvent) => {
    moveEvent.preventDefault()
    moveEvent.stopPropagation()

    if (moveEvent.clientX < startX) {
      start.x = (moveEvent.clientX - editorX.value) / canvasState.scale
    }
    if (moveEvent.clientY < startY) {
      start.y = (moveEvent.clientY - editorY.value) / canvasState.scale
    }
    const width = Math.abs(moveEvent.clientX - startX) / canvasState.scale
    const height = Math.abs(moveEvent.clientY - startY) / canvasState.scale

    actionState.setPostion({ left: start.x, top: start.y, width, height })
  }
  const up = (UpMoveEvent: MouseEvent) => {
    document.removeEventListener('mousemove', move)
    document.removeEventListener('mouseup', up)
    if (UpMoveEvent.clientX == startX && UpMoveEvent.clientY == startY) {
      actionState.setHidden()
      return
    }

    const selectedRect: ILocation = {
      left: Math.round(actionState.style.left),
      top: Math.round(actionState.style.top),
      right: actionState.style.left + actionState.style.width,
      bottom: actionState.style.top + actionState.style.height
    }

    actionState.setSelectComponents(selectedRect)
  }
  document.addEventListener('mousemove', move)
  document.addEventListener('mouseup', up)
}
const handleDragOver = e => {
  e.preventDefault()
  e.dataTransfer.dropEffect = 'copy'
}
const deselectCurComponent = () => {
  if (!canvasState.activeMaterial) {
    canvasState.activateMaterial(undefined)
  }
}
</script>

<template>
  <div
    ref="shape"
    class="absolute"
    draggable="true"
    @click="handleClick"
    @mousedown="handleDragendShape"
    @dblclick="handleDbClick"
  >
    <slot></slot>
  </div>
</template>
<script setup lang="ts">
import { PropType, ref } from 'vue'
import type { Material, IMaterialStyle } from '@hl/core'

const shape = ref()
const props = defineProps({
  active: {
    type: Boolean,
    default: false
  },
  isInner: {
    type: Boolean,
    default: false
  },
  info: Object as PropType<Material>,
  hiddenPoint: {
    type: Boolean,
    required: false
  },
  defaultStyle: Object as PropType<IMaterialStyle>,
  index: Number
})
// 锚点
const pointList = ['t', 'r', 'b', 'l', 'lt', 'rt', 'lb', 'rb']

// 光标朝向
const cursorResize = ['n', 'e', 's', 'w', 'nw', 'ne', 'sw', 'se']

const handleClick = e => {}
const handleDbClick = e => {}
const handleDragendShape = e => {}
</script>

<template>
  <div v-resize="resizeHandler" class="border-box-5">
    <svg :width="w" :height="h">
      <path
        :fill="propValue.base.backgroundColor"
        :stroke="propValue.base.color1"
        :d="`
          M 5 20 L 5 10 L 12 3  L 60 3 L 68 10
          L ${w - 20} 10 L ${w - 5} 25
          L ${w - 5} ${h - 5} L 20 ${h - 5}
          L 5 ${h - 20} L 5 20
        `"
      />

      <path
        fill="transparent"
        stroke-w="3"
        stroke-linecap="round"
        stroke-dasharray="10, 5"
        :stroke="propValue.base.color1"
        :d="`M 16 9 L 61 9`"
      />

      <path fill="transparent" :stroke="propValue.base.color2" :d="`M 5 20 L 5 10 L 12 3  L 60 3 L 68 10`" />

      <path
        fill="transparent"
        :stroke="propValue.base.color2"
        :d="`M ${w - 5} ${h - 30} L ${w - 5} ${h - 5} L ${w - 30} ${h - 5}`"
      />
    </svg>
  </div>
</template>

<script setup lang="ts">
import { useProp } from '@hl/core'
import { ref } from 'vue'

import { makeUuid } from '@hl/utils'

import type BorderBoxComponent from './config'
import type { BorderBox } from './type'

const props = defineProps<{
  component: BorderBoxComponent
}>()

const { propValue } = useProp<BorderBox>(props.component)
const w = ref<number>(150)
const h = ref<number>(150)

// 监听窗口大小变化
const resizeHandler = (entry: ResizeObserverEntry) => {
  const rect: DOMRectReadOnly = entry.contentRect
  w.value = rect.width
  h.value = rect.height
}
</script>

<style lang="scss" scoped>
.border-box-5 {
  
}
</style>

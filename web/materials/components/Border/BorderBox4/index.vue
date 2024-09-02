<template>
  <div
    v-resize="resizeHandler"
    class="border-box-4"
    :style="`
      box-shadow: inset 0 0 20px ${propValue.base.color1}; 
      border: 1px solid ${propValue.base.color2};
      background-color: ${propValue.base.backgroundColor};
    `"
  >
    <svg :width="w" :height="h">
      <polyline class="border-line-w-2" :stroke="propValue.base.color1" :points="`0, 25 0, 0 25, 0`" />
      <polyline class="border-line-w-2" :stroke="propValue.base.color1" :points="`${w - 25}, 0 ${w}, 0 ${w}, 25`" />
      <polyline
        class="border-line-w-2"
        :stroke="propValue.base.color1"
        :points="`${w - 25}, ${h} ${w}, ${h} ${w}, ${h - 25}`"
      />
      <polyline class="border-line-w-2" :stroke="propValue.base.color1" :points="`0, ${h - 25} 0, ${h} 25, ${h}`" />

      <polyline class="border-line-w-5" :stroke="propValue.base.color2" :points="`0, 10 0, 0 10, 0`" />
      <polyline class="border-line-w-5" :stroke="propValue.base.color2" :points="`${w - 10}, 0 ${w}, 0 ${w}, 10`" />
      <polyline
        class="border-line-w-5"
        :stroke="propValue.base.color2"
        :points="`${w - 10}, ${h} ${w}, ${h} ${w}, ${h - 10}`"
      />
      <polyline class="border-line-w-5" :stroke="propValue.base.color2" :points="`0, ${h - 10} 0, ${h} 10, ${h}`" />
    </svg>
  </div>
</template>

<script setup lang="ts">
import { useProp } from '@hl/core'

import { makeUuid } from '@hl/utils'

import type BorderBoxComponent from './config'
import type { BorderBox } from './type'

const props = defineProps<{
  component: BorderBoxComponent
}>()

const { propValue } = useProp<BorderBox>(props.component)

const w = ref<number>(260)
const h = ref<number>(260)

// 监听窗口大小变化
const resizeHandler = (entry: ResizeObserverEntry) => {
  const rect: DOMRectReadOnly = entry.contentRect
  w.value = rect.width
  h.value = rect.height
}
</script>

<style lang="scss" scoped>
.border-box-4 {
  polyline {
    fill: none;
    stroke-linecap: round;
  }
  .border-line-w-2 {
    stroke-width: 2;
  }
  .border-line-w-5 {
    stroke-width: 5;
  }
}
</style>

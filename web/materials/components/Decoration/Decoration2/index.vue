<template>
  <div
    v-resize="resizeHandler"
    class="decoration-2"
    :style="`width:${w}px; height: ${propValue.base.lineHeight}px animation-duration:${propValue.base.dur}s`"
  >
    <svg :width="w" :height="3">
      <polyline :stroke="propValue.base.color1" :points="`0, 2.5 ${w}, 2.5`" />
      <polyline
        :stroke="propValue.base.color2"
        stroke-width="3"
        stroke-dasharray="20, 80"
        stroke-dashoffset="-30"
        :points="`0, 2.5 ${w}, 2.5`"
      />
    </svg>
  </div>
</template>

<script setup lang="ts">
import { useProp } from '@hl/core'
import { ref } from 'vue'

import type DecorationComponent from './config'
import type { Decoration } from './type'

const props = defineProps<{
  component: DecorationComponent
}>()

const { propValue } = useProp<Decoration>(props.component)
const w = ref<number>(260)
const h = ref<number>(60)

const resizeHandler = (entry: ResizeObserverEntry) => {
  const rect: DOMRectReadOnly = entry.contentRect
  w.value = rect.width
  h.value = rect.height
}
</script>

<style lang="scss" scoped>
.decoration-2 {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
</style>

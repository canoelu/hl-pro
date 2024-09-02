<template>
  <div v-resize="resizeHandler" class="decoration-3" :style="`width: ${w}px; height: ${h}px`">
    <svg :width="20" :height="20">
      <polyline stroke-width="4" fill="transparent" :stroke="propValue.base.color1" points="10, 0 19, 10 10, 20" />
      <polyline stroke-width="2" fill="transparent" :stroke="propValue.base.color2" points="2, 0 11, 10 2, 20" />
    </svg>
    <span :style="`color: ${propValue.base.textColor};font-size: ${propValue.base.textSize}px`">
      {{ propValue.base.dataset }}</span
    >
    <svg :width="20" :height="20">
      <polyline stroke-width="4" fill="transparent" :stroke="propValue.base.color1" points="11, 0 2, 10 11, 20" />
      <polyline stroke-width="2" fill="transparent" :stroke="propValue.base.color2" points="19, 0 10, 10 19, 20" />
    </svg>
  </div>
</template>

<script setup lang="ts">
import { useProp } from '@hl/core'
import { onMounted, ref } from 'vue'

import type DecorationComponent from './config'
import type { Decoration } from './type'

const props = defineProps<{
  component: DecorationComponent
}>()

const { propValue } = useProp<Decoration>(props.component)

const w = ref<number>(260)
const h = ref<number>(30)

const resizeHandler = (entry: ResizeObserverEntry) => {
  const rect: DOMRectReadOnly = entry.contentRect
  w.value = rect.width
  h.value = rect.height
}
</script>

<style lang="scss" scoped>
.decoration-3 {
  display: flex;
  justify-content: space-between;
  align-items: center;
  span {
    text-align: center;
    flex: 1;
  }
}
</style>

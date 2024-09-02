<template>
  <div v-resize="resizeHandler" class="decoration-4">
    <svg :width="w" :height="h">
      <polyline
        :stroke="propValue.base.color1"
        stroke-width="2"
        fill="transparent"
        :points="`${xPos(0)}, 0 ${xPos(30)}, ${h / 2}`"
      />

      <polyline
        :stroke="propValue.base.color1"
        stroke-width="2"
        fill="transparent"
        :points="`${xPos(20)}, 0 ${xPos(50)}, ${h / 2} ${xPos(w)}, ${h / 2}`"
      />

      <polyline
        :stroke="propValue.base.color2"
        fill="transparent"
        stroke-width="3"
        :points="`${xPos(0)}, ${h - 3}, ${xPos(200)}, ${h - 3}`"
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
const h = ref<number>(50)

const resizeHandler = (entry: ResizeObserverEntry) => {
  const rect: DOMRectReadOnly = entry.contentRect
  w.value = rect.width
  h.value = rect.height
}

const xPos = (pos: number) => {
  if (!propValue.base.reverse) return pos
  return w.value - pos
}
</script>

<style lang="scss" scoped></style>

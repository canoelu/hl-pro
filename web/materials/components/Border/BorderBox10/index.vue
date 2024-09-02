<template>
  <div v-resize="resizeHandler" class="border-box-10">
    <svg :width="w" :height="h">
      <polygon :fill="propValue.base.backgroundColor" :points="` 9, 7 ${w - 9}, 7 ${w - 9}, ${h - 7} 9, ${h - 7}`" />
      <circle :fill="propValue.base.color2" cx="5" cy="5" r="2" />
      <circle :fill="propValue.base.color2" :cx="w - 5" cy="5" r="2" />
      <circle :fill="propValue.base.color2" :cx="w - 5" :cy="h - 5" r="2" />
      <circle :fill="propValue.base.color2" cx="5" :cy="h - 5" r="2" />
      <polyline :stroke="propValue.base.color1" :points="`10, 4 ${w - 10}, 4`" />
      <polyline :stroke="propValue.base.color1" :points="`10, ${h - 4} ${w - 10}, ${h - 4}`" />
      <polyline :stroke="propValue.base.color1" :points="`5, 70 5, ${h - 70}`" />
      <polyline :stroke="propValue.base.color1" :points="`${w - 5}, 70 ${w - 5}, ${h - 70}`" />
      <polyline :stroke="propValue.base.color1" :points="`3, 10, 3, 50`" />
      <polyline :stroke="propValue.base.color1" :points="`7, 30 7, 80`" />
      <polyline :stroke="propValue.base.color1" :points="`${w - 3}, 10 ${w - 3}, 50`" />
      <polyline :stroke="propValue.base.color1" :points="`${w - 7}, 30 ${w - 7}, 80`" />
      <polyline :stroke="propValue.base.color1" :points="`3, ${h - 10} 3, ${h - 50}`" />
      <polyline :stroke="propValue.base.color1" :points="`7, ${h - 30} 7, ${h - 80}`" />
      <polyline :stroke="propValue.base.color1" :points="`${w - 3}, ${h - 10} ${w - 3}, ${h - 50}`" />
      <polyline :stroke="propValue.base.color1" :points="`${w - 7}, ${h - 30} ${w - 7}, ${h - 80}`" />
    </svg>
  </div>
</template>

<script lang="ts" setup>
import { useProp } from '@hl/core'
import { ref } from 'vue'

import type BorderBoxComponent from './config'
import type { BorderBox } from './type'

const props = defineProps<{
  component: BorderBoxComponent
}>()

const { propValue } = useProp<BorderBox>(props.component)

const w = ref<number>(360)
const h = ref<number>(260)

const resizeHandler = (entry: ResizeObserverEntry) => {
  const rect: DOMRectReadOnly = entry.contentRect
  w.value = rect.width
  h.value = rect.height
}
</script>

<style lang="scss" scoped></style>

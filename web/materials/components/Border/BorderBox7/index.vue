<template>
  <div v-resize="resizeHandler" class="border-box-7">
    <svg :width="w" :height="h">
      <polygon
        :fill="propValue.base.backgroundColor"
        :points="`
        10, 22 ${w - 22}, 22 ${w - 22}, ${h - 86} ${w - 84}, ${h - 24} 10, ${h - 24}
      `"
      />

      <polyline
        class="bv-bb5-line-1"
        :stroke="propValue.base.color1"
        :points="`8, 5 ${w - 5}, 5 ${w - 5}, ${h - 100}
          ${w - 100}, ${h - 5} 8, ${h - 5} 8, 5`"
      />
      <polyline
        class="bv-bb5-line-2"
        :stroke="propValue.base.color2"
        :points="`3, 5 ${w - 20}, 5 ${w - 20}, ${h - 60}
          ${w - 74}, ${h - 5} 3, ${h - 5} 3, 5`"
      />
      <polyline class="bv-bb5-line-3" :stroke="propValue.base.color2" :points="`50, 13 ${w - 35}, 13`" />
      <polyline class="bv-bb5-line-4" :stroke="propValue.base.color2" :points="`15, 20 ${w - 35}, 20`" />
      <polyline class="bv-bb5-line-5" :stroke="propValue.base.color2" :points="`15, ${h - 20} ${w - 110}, ${h - 20}`" />
      <polyline class="bv-bb5-line-6" :stroke="propValue.base.color2" :points="`15, ${h - 13} ${w - 110}, ${h - 13}`" />
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

const w = ref<number>(260)
const h = ref<number>(260)

const resizeHandler = (entry: ResizeObserverEntry) => {
  const rect: DOMRectReadOnly = entry.contentRect
  w.value = rect.width
  h.value = rect.height
}
</script>

<style lang="scss" scoped>
.border-box-7 {
  polyline {
    fill: none;
  }
}
</style>

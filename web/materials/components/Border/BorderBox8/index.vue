<template>
  <div v-resize="resizeHandler" class="border-box-8">
    <svg :width="w" :height="h">
      <polygon
        :fill="propValue.base.backgroundColor"
        :points="`
        ${w - 15}, 22 170, 22 150, 7 40, 7 28, 21 32, 24
        16, 42 16, ${h - 32} 41, ${h - 7} ${w - 15}, ${h - 7}
      `"
      />

      <polyline
        class="border-line-1"
        :stroke="propValue.base.color1"
        :points="`145, ${h - 5} 40, ${h - 5} 10, ${h - 35}
          10, 40 40, 5 150, 5 170, 20 ${w - 15}, 20`"
      />
      <polyline
        :stroke="propValue.base.color2"
        class="border-line-2"
        :points="`245, ${h - 1} 36, ${h - 1} 14, ${h - 23}
          14, ${h - 100}`"
      />

      <polyline class="border-line-3" :stroke="propValue.base.color1" :points="`7, ${h - 40} 7, ${h - 75}`" />
      <polyline class="border-line-4" :stroke="propValue.base.color1" :points="`28, 24 13, 41 13, 64`" />
      <polyline class="border-line-5" :stroke="propValue.base.color1" :points="`5, 45 5, 140`" />
      <polyline class="border-line-6" :stroke="propValue.base.color2" :points="`14, 75 14, 180`" />
      <polyline class="border-line-7" :stroke="propValue.base.color2" :points="`55, 11 147, 11 167, 26 250, 26`" />
      <polyline class="border-line-8" :stroke="propValue.base.color2" :points="`158, 5 173, 16`" />
      <polyline class="border-line-9" :stroke="propValue.base.color1" :points="`200, 17 ${w - 10}, 17`" />
      <polyline class="border-line-10" :stroke="propValue.base.color2" :points="`385, 17 ${w - 10}, 17`" />
    </svg>
  </div>
</template>

<script lang="ts" setup>
import { useProp } from '@hl/core'
import { ref } from 'vue'
import { makeUuid } from '@hl/utils'

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

<style lang="scss" scoped>
.border-box-8 {
  polyline {
    fill: none;
  }
  .border-line-1,
  .border-line-2,
  .border-line-3,
  .border-line-6,
  .border-line-7,
  .border-line-10 {
    stroke-width: 1;
  }
  .border-line-3,
  .border-line-4,
  .border-line-8,
  .border-line-9 {
    stroke-width: 3px;
    stroke-linecap: round;
  }
  .border-line-9 {
    stroke-dasharray: 100 250;
  }
  .border-line-10 {
    stroke-dasharray: 80 270;
  }
}
</style>

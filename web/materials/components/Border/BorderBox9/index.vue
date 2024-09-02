<template>
  <div v-resize="resizeHandler" class="border-box-9">
    <svg :width="w" :height="h">
      <polygon
        :fill="propValue.base.backgroundColor"
        :points="`
        7, 7 ${w - 7}, 7 ${w - 7}, ${h - 7} 7, ${h - 7}
      `"
      />

      <polyline :stroke="propValue.base.color1" :points="`2, 2 ${w - 2} ,2 ${w - 2}, ${h - 2} 2, ${h - 2} 2, 2`" />
      <polyline :stroke="propValue.base.color2" :points="`6, 6 ${w - 6}, 6 ${w - 6}, ${h - 6} 6, ${h - 6} 6, 6`" />
      <circle :fill="propValue.base.color1" cx="11" cy="11" r="1" />
      <circle :fill="propValue.base.color1" :cx="w - 11" cy="11" r="1" />
      <circle :fill="propValue.base.color1" :cx="w - 11" :cy="h - 11" r="1" />
      <circle :fill="propValue.base.color1" cx="11" :cy="h - 11" r="1" />
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
.border-box-9 {
  polyline {
    fill: none;
  }
}
</style>

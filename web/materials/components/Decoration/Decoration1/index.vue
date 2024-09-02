<template>
  <div v-resize="resizeHandler" class="dv-decoration-1">
    <svg :width="w" :height="h">
      <rect :x="rectX" :y="rectY" :width="w" :height="propValue.base.lineHeight" :fill="propValue.base.color1">
        <animate
          attributeName="width"
          from="0"
          :to="w"
          :dur="`${propValue.base.dur}s`"
          calcMode="spline"
          keyTimes="0;1"
          keySplines=".42,0,.58,1"
          repeatCount="indefinite"
        />
      </rect>

      <rect
        :x="rectX"
        :y="rectY"
        :width="propValue.base.endWidth"
        :height="propValue.base.lineHeight"
        :fill="propValue.base.color2"
      >
        <animate
          attributeName="x"
          from="0"
          :to="w"
          :dur="`${propValue.base.dur}s`"
          calcMode="spline"
          keyTimes="0;1"
          keySplines="0.42,0,0.58,1"
          repeatCount="indefinite"
        />
      </rect>
    </svg>
  </div>
</template>

<script setup lang="ts">
import { useProp } from '@hl/core'
import { ref, computed } from 'vue'

import type DecorationComponent from './config'
import type { Decoration } from './type'

const props = defineProps<{
  component: DecorationComponent
}>()

const { propValue } = useProp<Decoration>(props.component)

const w = ref<number>(260)
const h = ref<number>(30)
const rectX = computed(() => 0)
const rectY = computed(() => h.value / 2)
const resizeHandler = (entry: ResizeObserverEntry) => {
  const rect: DOMRectReadOnly = entry.contentRect
  w.value = rect.width
  h.value = rect.height
}
</script>

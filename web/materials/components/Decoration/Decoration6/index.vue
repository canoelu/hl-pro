<template>
  <div v-resize="resizeHandler" class="decoration-6">
    <svg :width="w" :height="h">
      <polygon
        class="stroke fill"
        :fill="propValue.base.color1"
        :stroke="propValue.base.color2"
        :points="`15.5 6.5 20.5 0.5 50.5 0.5 55.5 6.5 15.5 6.5`"
      />
      <polygon
        class="stroke fill"
        :fill="propValue.base.color1"
        :stroke="propValue.base.color2"
        :points="`15.5 ${h - 6.5} 20.5 ${h - 0.5} 50.5 ${h - 0.5} 55.5 ${h - 6.5} 15.5 ${h - 6.5}`"
      />
      <polygon
        class="stroke fill"
        :fill="propValue.base.color1"
        :stroke="propValue.base.color2"
        :points="`${w - 15.5} 6.5 ${w - 20.5} 0.5 ${w - 50.5} 0.5 ${w - 55.5} 6.5 ${w - 15.5} 6.5`"
      />
      <polygon
        class="stroke fill"
        :fill="propValue.base.color1"
        :stroke="propValue.base.color2"
        :points="`${w - 15.5} ${h - 6.5} ${w - 20.5} ${h - 0.5} ${w - 50.5} ${h - 0.5} ${w - 55.5} ${h - 6.5} ${
          w - 15.5
        } ${h - 6.5}`"
      />
      <polygon
        class="stroke fill"
        :fill="propValue.base.color1"
        :stroke="propValue.base.color2"
        :points="`15.5 6.5 0.5 ${h / 2} 15.5 ${h - 6.5} ${w - 15.5} ${h - 6.5} ${w - 0.5} ${h / 2} ${
          w - 15.5
        } 6.5 15.5 6.5`"
      />
      <polyline
        class="stroke fill-none"
        :stroke="propValue.base.color2"
        :points="`20.5 14.5 8.5 ${h / 2} 20.5 ${h - 14.5}`"
      />
      <polyline
        class="stroke fill-none"
        :stroke="propValue.base.color2"
        :points="`${w - 20.5} 14.5 ${w - 8.5} ${h / 2} ${w - 20.5} ${h - 14.5}`"
      />
    </svg>
    <span :style="`color: ${propValue.base.textColor};font-size: ${propValue.base.textSize}px`">{{
      propValue.base.dataset
    }}</span>
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
</script>

<style lang="scss" scoped>
.decoration-6 {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    position: absolute;
    z-index: -1;
  }

  .fill-none {
    fill: none;
  }
}
</style>

<template>
  <div v-resize="resizeHandler" class="animate-border-box-2">
    <svg :width="w" :height="h">
      <defs>
        <path :id="path" :d="pathD" fill="transparent" />
        <radialGradient :id="gradient" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#fff" stop-opacity="1" />
          <stop offset="100%" stop-color="#fff" stop-opacity="0" />
        </radialGradient>

        <mask :id="mask">
          <circle cx="0" cy="0" r="150" :fill="`url(#${gradient})`">
            <animateMotion :dur="`${propValue.base.dur}s`" :path="pathD" rotate="auto" repeatCount="indefinite" />
          </circle>
        </mask>
      </defs>

      <polygon :fill="propValue.base.backgroundColor" :points="`5, 5 ${w - 5}, 5 ${w - 5} ${h - 5} 5, ${h - 5}`" />

      <use :stroke="propValue.base.color1" stroke-width="1" :xlink:href="`#${path}`" />

      <use :stroke="propValue.base.color2" stroke-width="3" :xlink:href="`#${path}`" :mask="`url(#${mask})`">
        <animate
          attributeName="stroke-dasharray"
          :from="`0, ${length}`"
          :to="`${length}, 0`"
          :dur="`${propValue.base.dur}s`"
          repeatCount="indefinite"
        />
      </use>
    </svg>
  </div>
</template>

<script setup lang="ts">
import { useProp } from '@hl/core'
import { ref, computed } from 'vue'
import { makeUuid } from '@hl/utils'

import type BorderBoxComponent from './config'
import type { BorderBox } from './type'

const props = defineProps<{
  component: BorderBoxComponent
}>()

const { propValue } = useProp<BorderBox>(props.component)
const path = `animate-border-box-2-${makeUuid()}`
const gradient = `animate-border-box-2-gradient-${makeUuid()}`
const mask = `animate-border-box-2-mask-${makeUuid()}`

const w = ref<number>(260)
const h = ref<number>(260)
const pathD = computed(() => {
  if (propValue.base?.reverse)
    return `M 2.5, 2.5 L 2.5, ${h.value - 2.5} L ${w.value - 2.5}, ${h.value - 2.5} L ${w.value - 2.5}, 2.5 L 2.5, 2.5`
  return `M2.5, 2.5 L${w.value - 2.5}, 2.5 L${w.value - 2.5}, ${h.value - 2.5} L2.5, ${h.value - 2.5} L2.5, 2.5`
})
const length = computed(() => {
  return (w.value + h.value - 5) * 2
})

// 监听窗口大小变化

const resizeHandler = (entry: ResizeObserverEntry) => {
  const rect: DOMRectReadOnly = entry.contentRect
  w.value = rect.width
  h.value = rect.height
}
</script>

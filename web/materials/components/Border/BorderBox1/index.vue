<template>
  <div v-resize="resizeHandler" class="dv-border-box-2">
    <svg :width="w" :height="h">
      <defs>
        <filter :id="filterId" height="150%" width="150%" x="-25%" y="-25%">
          <feMorphology operator="dilate" radius="1" in="SourceAlpha" result="thicken" />
          <feGaussianBlur in="thicken" stdDeviation="2" result="blurred" />
          
          <feComposite in="glowColor" in2="blurred" operator="in" result="softGlowColored" />
          <feMerge>
            <feMergeNode in="softGlowColored" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <path
        v-if="w && h"
        :fill="propValue.base.backgroundColor"
        stroke-width="2"
        :stroke="propValue.base.color1"
        :d="`
          M15 5 L ${w - 15} 5 Q ${w - 5} 5, ${w - 5} 15
          L ${w - 5} ${h - 15} Q ${w - 5} ${h - 5}, ${w - 15} ${h - 5}
          L 15, ${h - 5} Q 5 ${h - 5} 5 ${h - 15} L 5 15
          Q 5 5 15 5
        `"
      />

      <path
        stroke-width="2"
        fill="transparent"
        stroke-linecap="round"
        :filter="`url(#${filterId})`"
        :stroke="propValue.base.color2"
        :d="`M 20 5 L 15 5 Q 5 5 5 15 L 5 20`"
      />

      <path
        stroke-width="2"
        fill="transparent"
        stroke-linecap="round"
        :filter="`url(#${filterId})`"
        :stroke="propValue.base.color2"
        :d="`M ${w - 20} 5 L ${w - 15} 5 Q ${w - 5} 5 ${w - 5} 15 L ${w - 5} 20`"
      />

      <path
        stroke-width="2"
        fill="transparent"
        stroke-linecap="round"
        :filter="`url(#${filterId})`"
        :stroke="propValue.base.color2"
        :d="`
          M ${w - 20} ${h - 5} L ${w - 15} ${h - 5}
          Q ${w - 5} ${h - 5} ${w - 5} ${h - 15}
          L ${w - 5} ${h - 20}
        `"
      />

      <path
        stroke-width="2"
        fill="transparent"
        stroke-linecap="round"
        :filter="`url(#${filterId})`"
        :stroke="propValue.base.color2"
        :d="`
          M 20 ${h - 5} L 15 ${h - 5}
          Q 5 ${h - 5} 5 ${h - 15}
          L 5 ${h - 20}
        `"
      />
    </svg>
  </div>
</template>

<script setup lang="ts">
import { useProp } from '@hl/core'
import { ref } from 'vue'
import { makeUuid } from '@hl/utils'

import type BorderBoxComponent from './config'
import type { BorderBox } from './type'

const props = defineProps<{
  component: BorderBoxComponent
}>()
const filterId = `border-box-01-filterId-${makeUuid()}`
const { propValue } = useProp<BorderBox>(props.component)
const w = ref<number>(260)
const h = ref<number>(260)

// 监听窗口大小变化

const resizeHandler = (entry: ResizeObserverEntry) => {
  const rect: DOMRectReadOnly = entry.contentRect
  w.value = rect.width
  h.value = rect.height
}
</script>

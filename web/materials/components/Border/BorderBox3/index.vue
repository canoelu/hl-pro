<template>
  <div v-resize="resizeHandler" class="border-box-3"   :style="`box-shadow: inset 0 0 25px 3px ${propValue.base.color1}`">
    <svg :width="w" :height="h">
      <polygon
        :fill="propValue.base.backgroundColor"
        :points="`
        4, 0 ${w - 4}, 0 ${w}, 4 ${w}, ${h - 4} ${w - 4}, ${h}
        4, ${h} 0, ${h - 4} 0, 4
      `"
      />
    </svg>

    <svg :width="w" :height="h" :key="item" v-for="item in border" :class="`border-item ${item}`">
      <polygon :fill="propValue.base.color2" points="40, 0 5, 0 0, 5 0, 16 3, 19 3, 7 7, 3 35, 3" />
    </svg>
  </div>
</template>

<script setup lang="ts">
import { useProp } from '@hl/core'
import { ref } from 'vue'

import type BorderBoxComponent from './config'
import type { BorderBox } from './type'

const props = defineProps<{
  component: BorderBoxComponent
}>()

const { propValue } = useProp<BorderBox>(props.component)

const w = ref<number>(150)
const h = ref<number>(150)

// 监听窗口大小变化
const resizeHandler = (entry: ResizeObserverEntry) => {
  const rect: DOMRectReadOnly = entry.contentRect
  w.value = rect.width
  h.value = rect.height
}
const border = ['left-top', 'right-top', 'left-bottom', 'right-bottom']
</script>

<style lang="scss" scoped>
.border-box-3 {
  .border-item {
    position: absolute;
    top: 0;
    left: 0;
  }
  .right-top {
    right: 0;
    transform: rotateY(180deg);
  }
  .left-bottom {
    bottom: 0;
    transform: rotateX(180deg);
  }
  .right-bottom {
    right: 0;
    bottom: 0;
    transform: rotateX(180deg) rotateY(180deg);
  }
}
</style>

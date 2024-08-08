<template>
    <span v-resize="resizeHandler">{{ customeText }}</span>
</template>
<script setup lang="ts">
import { useProp } from '@hl/core'
import { computed, ref } from 'vue'

import type StaticTextComponent from './config'
import type { StaticTextType } from './type'

const props = defineProps<{
  component: StaticTextComponent
}>()

const { propValue } = useProp<StaticTextType>(props.component)

const customeText = computed<string>(() => {
  return propValue.base.text
})

const lineHeight = ref<string>('20px')
const resizeHandler = (entry: ResizeObserverEntry) => {
  const { height } = entry.contentRect
  lineHeight.value = `${height}px`
}
</script>
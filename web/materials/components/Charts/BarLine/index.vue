<template>
    <div ref="chartEl" v-resize="resizeHandler"></div>
</template>
<script setup lang="ts">
import { useProp } from '@hl/core'
import { computed, ref } from 'vue'

import type StaticTextComponent from './config'
import type { BasicLineChart } from './type'
const chartEl = ref(null)

const props = defineProps<{
    component: StaticTextComponent
}>()

const { propValue } = useProp<BasicLineChart>(props.component)

const customeText = computed<string>(() => {
    return propValue.base.text
})

const lineHeight = ref<string>('20px')
const resizeHandler = (entry: ResizeObserverEntry) => {
    const { height } = entry.contentRect
    lineHeight.value = `${height}px`
}
</script>
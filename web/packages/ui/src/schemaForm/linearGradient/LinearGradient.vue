<template>
  <div class="w-full">
    <n-slider v-model:value="linearGradient.angle" :step="5" size="small" :max="360" @update:value="changed" />
    <n-color-picker v-model:value="linearGradient.color1" :swatches="GlobalColorSwatches" clearable
      @update:value="changed" />
    <n-color-picker v-model:value="linearGradient.color2" :swatches="GlobalColorSwatches" clearable
      @update:value="changed" />
  </div>
</template>

<script setup lang="ts">
import { NColorPicker, NSlider } from "naive-ui"
import { ref } from 'vue'

import type { Gradient } from './type'

const GlobalColorSwatches = ['#FFFFFF', '#18A058', '#2080F0', '#F0A020', '#D03050FF']

const props = withDefaults(
  defineProps<{
    value: Gradient
  }>(),
  {
    value: () => ({
      angle: 0,
      color1: '',
      color2: ''
    })
  }
)

const linearGradient = ref<Gradient>({
  angle: props.value.angle || 0,
  color1: props.value.color1 || '',
  color2: props.value.color2 || ''
})

const emits = defineEmits<{
  (e: 'updateValue', value: Gradient): void
  (e: 'update:value', value: Gradient): void
}>()

const changed = () => {
  emits('updateValue', linearGradient.value)
  emits('update:value', linearGradient.value)
}
</script>

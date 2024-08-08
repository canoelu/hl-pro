<template>
  <div :style="getStyle(borderRadius)">
    <n-image
      :object-fit="fit"
      preview-disabled
      :src="option.dataset"
      :fallback-src="requireErrorImg()"
      :width="w"
      :height="h"
      lazy
    />
  </div>
</template>

<script setup lang="ts">
import { PropType, shallowReactive, watch, toRefs } from 'vue'
import { requireErrorImg } from '@/utils'
// import { useChartDataFetch } from '@/hooks'
import { CreateMaterialType } from '@/typings/design'
import { useDesignEditStore } from '@/store/modules/design/editStore'

const props = defineProps({
  chartConfig: {
    type: Object as PropType<CreateMaterialType>,
    required: true
  }
})

const { w, h } = toRefs(props.chartConfig.attr)
const { dataset, fit, borderRadius } = toRefs(props.chartConfig.option)

const option = shallowReactive({
  dataset: ''
})

const getStyle = (radius: number) => {
  return {
    borderRadius: `${radius}px`,
    overflow: 'hidden'
  }
}

// 编辑更新
watch(
  () => props.chartConfig.option.dataset,
  (newData: any) => {
    option.dataset = newData
  },
  {
    immediate: true
  }
)

// 预览更新
// useChartDataFetch(props.chartConfig, useDesignEditStore, (newData: any) => {
//   option.dataset = newData
// })
</script>

<template>
  <div ref="chartEl" v-resize="resizeHandler"></div>
</template>

<script lang="ts" setup>
import 'echarts-liquidfill'

import { useData, useProp } from '@hl/core'
import { onMounted, ref } from 'vue'

import { useEchart } from '../../hooks'
import type WaveChartComponent from './config'
import type { WaveChartType } from './type'

const props = defineProps<{
  component: WaveChartComponent
}>()

const chartEl = ref(null)
const { updateEchart, resizeHandler } = useEchart(chartEl)
const chartData = ref<number>(0)
const dataChange = (resp: Response, _?: string) => {
  if (resp.status === 'SUCCESS') {
    chartData.value = resp.afterData
    updateEchart(getOption())

  }

}
useData(props.component, dataChange)

const { propValue } = useProp<WaveChartType>(props.component, async () => {
  updateEchart(getOption())
})

const getOption = () => {
  const option = {
    series: [
      {
        type: 'liquidFill',
        amplitude: propValue.options.amplitude,
        data: [chartData.value],
        outline: {
          show: propValue.options.outlineShow,
          itemStyle: {
            borderColor: propValue.options.outlineColor
          }
        },
        shape: propValue.options.shape,
        radius: propValue.options.radius,
        direction: propValue.options.direction,
        waveAnimation: propValue.options.waveAnimation,
        label: {
          show: propValue.options.labelShow
        },
        backgroundStyle: {
          color: propValue.options.backgroundColor
        },
        color: [propValue.options.color]
      }
    ]
  }
  return option
}

onMounted(async () => {
  updateEchart(getOption())
})
</script>

<style lang="scss" scoped></style>

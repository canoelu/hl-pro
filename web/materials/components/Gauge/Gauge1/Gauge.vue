<template>
  <div v-resize="resizeHandler" class="dv-decoration-9">
    <svg width="100" height="100" :style="`transform: scale(${scaleRota[0]}, ${scaleRota[1]})`">
      <defs>
        <polygon :id="polygonId" points="15, 46.5, 21, 47.5, 21, 52.5, 15, 53.5" />
      </defs>

      <circle
        cx="50"
        cy="50"
        r="45"
        fill="transparent"
        :stroke="mergedColor[1]"
        stroke-width="10"
        stroke-dasharray="80, 100, 30, 100"
      >
        <animateTransform
          attributeName="transform"
          type="rotate"
          values="0 50 50;360 50 50"
          :dur="`${dur}s`"
          repeatCount="indefinite"
        />
      </circle>

      <circle
        cx="50"
        cy="50"
        r="45"
        fill="transparent"
        :stroke="mergedColor[0]"
        stroke-width="6"
        stroke-dasharray="50, 66, 100, 66"
      >
        <animateTransform
          attributeName="transform"
          type="rotate"
          values="0 50 50;-360 50 50"
          :dur="`${dur}s`"
          repeatCount="indefinite"
        />
      </circle>

      <circle
        cx="50"
        cy="50"
        r="38"
        fill="transparent"
        :stroke="mergedColor[1]"
        stroke-width="1"
        stroke-dasharray="5, 1"
      />

      <use
        v-for="(foo, i) in new Array(20).fill(0)"
        :key="i"
        :xlink:href="`#${polygonId}`"
        :stroke="mergedColor[1]"
        :fill="Math.random() > 0.4 ? 'transparent' : mergedColor[0]"
      >
        <animateTransform
          attributeName="transform"
          type="rotate"
          values="0 50 50;360 50 50"
          :dur="`${dur}s`"
          :begin="`${(i * dur) / 20}s`"
          repeatCount="indefinite"
        />
      </use>

      <circle
        cx="50"
        cy="50"
        r="26"
        fill="transparent"
        :stroke="mergedColor[1]"
        stroke-width="1"
        stroke-dasharray="5, 1"
      />
    </svg>
    <div>{{ dataValue }}{{ unit }}</div>
  </div>
</template>

<script setup lang="ts">
import type { Material } from '@hl/core'
import { useEventBus, useProp } from '@hl/core'
import { onMounted, ref } from 'vue'

import type { Gauge } from './type'

const props = defineProps<{
  component: Material
}>()

const propChange = (propKeys: Array<string>, value: any) => {
  if (propKeys.length !== 2) return
  if (propKeys[0] === 'attr' && propKeys[1] === 'color1') mergedColor.value[0] = value
  if (propKeys[0] === 'attr' && propKeys[1] === 'color2') mergedColor.value[1] = value
  if (propKeys[0] === 'attr' && propKeys[1] === 'unit') unit.value = value
}
const { propValue } = useProp<Gauge>(props.component, propChange)
const mergedColor = ref<string[]>([propValue.attr.color1, propValue.attr.color2])

const polygonId = `decoration-9-polygon`
const dur = ref<number>(3)
const dataValue = ref<number>(0)
const scaleRota = ref<number[]>([1, 1])

const unit = ref<string>(propValue.attr.unit || '')

const resizeHandler = (entry: ResizeObserverEntry) => {
  const rect: DOMRectReadOnly = entry.contentRect
  const rate = Math.min(rect.width / 100, rect.height / 100)
  scaleRota.value = [rate, rate]
}

const handler = event => {
  const item: Record<string, any> = event as Record<string, any>

  if (propValue.data.datatag && item.TagName === propValue.data.datatag) {
    dataValue.value = Number(item.TagValue)
  }
}

onMounted(async () => {
  await initData()
})

const initData = async () => {
  if (propValue.data.history) {
    try {
      dataValue.value = 10
      // const resp = await http.post({
      //   url: propValue.data.history,
      //   data: [propValue.data.datatag]
      // })
      // if (resp.status === 200) {
      //   dataValue.value = Number(resp.data.TagValue)
      // }
    } catch (err: any) {
      console.log(err.message || err)
    }
  }
}

useEventBus('actual', handler)
</script>

<style lang="scss" scoped>
.dv-decoration-9 {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  svg {
    position: absolute;
    left: 0;
    top: 0;
    transform-origin: left top;
  }
}
</style>

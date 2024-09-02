<template>
  <div>
    <video
      ref="videoRef"
      class="video"
      preload="auto"
      crossOrigin="anonymous"
      playsinline
      :autoplay="propValue.basic.autoplay"
      :muted="propValue.basic.muted"
      :controls="propValue.basic.controls"
      :src="propValue.basic.url"
    ></video>
  </div>
</template>

<script lang="ts" setup>
import { useProp } from '@hl/core'
import { onMounted, ref, PropType, unref } from 'vue'
import mpegts from 'mpegts.js'

import type FlvVideoComponent from './config'
import type { FlvVideo } from './type'
const videoRef = ref(null)

const props = defineProps({
  component: {
    type: Object as PropType<FlvVideoComponent>,
    required: true
  }
})
function playVideo() {
  if (!videoRef.value) return
 
  // if (mpegts.isSupported()) {
  //   const flvPlayer = mpegts.createPlayer({
  //     type: propValue.basic.videoType,
  //     url: propValue.basic.url
  //   })
  //   flvPlayer.attachMediaElement(videoRef.value!)
  //   flvPlayer.load()
  //   flvPlayer.play()
  // }
  unref(videoRef).play()
}
const propChange = () => {
  playVideo()
}
const { propValue } = useProp<FlvVideo>(props.component, () => propChange())

// const { w, h } = toRefs(props.chartConfig.attr)
onMounted(() => {
  playVideo()
})
</script>

<style lang="scss" scoped>
video {
  width: 100%;
  height: 100%;
}
</style>

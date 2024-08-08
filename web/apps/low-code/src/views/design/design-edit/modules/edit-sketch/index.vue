<template>
    <div class='hl-sketch-rule wh-full'>
        <sketch-rule v-if="sketchRuleReDraw" :thick="thick" :scale="scale" :width="canvasBox().width"
            :height="canvasBox().height" :startX="startX" :startY="startY" :lines="lines" />
        <div ref="sketch" class='hl-edit-stage' @scroll='handleScroll'>
            <div ref="container" class='absolute top-0 left-0 height-2160px'
                :style="{ width: width * 2 + 'px', height: height * 2 + 'px' }">
                <div ref='canvas' class='canvas absolute top-50% left-50%' @mousedown='dragCanvas'>
                    <slot></slot>
                </div>

            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { useDesignEditStore } from '@/store/modules/design/editStore'
import { usePointStyle, useSizeStyle, useComponentStyle } from '../../hooks/useStyle'
const thick = 20
const sketchRuleReDraw = ref(false)
const startX = ref(0)
const startY = ref(0)
const lines = reactive({ h: [], v: [] })
let prevMoveXValue = [0, 0]
let prevMoveYValue = [0, 0]
const sketchWidth = ref(1920)
const sketchHeight = ref(1080)
const $sketch = ref(null)
const $container = ref(null)
const $canvas = ref(null)
const designStore = useDesignEditStore()
const { width, height } = toRefs(designStore.getEditCanvasConfig)

const scale = computed(() => {
    return designStore.getEditCanvas.scale
})
// 计算画布大小
const canvasBox = () => {
    const layoutDom = document.getElementById('__hl-design-edit-layout')
    if (layoutDom) {
        // 此处减去滚动条的宽度和高度 
        const scrollW = 20
        console.log(layoutDom.clientHeight - scrollW)
        return {
            height: layoutDom.clientHeight - scrollW,
            width: layoutDom.clientWidth - scrollW
        }
    }
    return {
        width: width.value,
        height: height.value
    }
}
const handleScroll = (e) => {
    console.log(e)
}
const handleWheel = (e) => {
    console.log(e)
}
const dragCanvas = () => { }


onMounted(() => {
    if ($sketch.value) {
        $sketch.value.addEventListener('wheel', handleWheel, { passive: false })
    }
})



</script>
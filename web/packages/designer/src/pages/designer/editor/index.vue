<template>
    <div class='designer-editor'>
        <div id="editor" ref="editor" class='editor' :style="editorStyle" @drop='handleDrop'>drop</div>
    </div>

</template>
<script setup lang="ts">
import { ref, computed, reactive } from 'vue'

import { useCanvas, backgroundToCss, filterStyle } from '@hl/core'

const canvasState = useCanvas()
const canvasStyleData = computed(() => canvasState.canvasStyleData)
const curComponent = computed(() => canvasState.activeMaterial)

const editorStyle =
    computed<Record<string, string>>(() => {
        const backgroundStyle = backgroundToCss(canvasStyleData.value.background)
        const style = {
            ...canvasStyleData.value,
            ...backgroundStyle
        }
        return filterStyle(style, [
            'width',
            'height',
            'backgroundImage',
            'backgroundSize',
            'backgroundColor'
        ])
    })
function handleDrop(e) { }
</script>
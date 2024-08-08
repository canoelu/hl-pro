<template>
    <SchemaForm :config="config" :data="formData" :mode="mode" @change="changed" />
</template>
<script setup lang="ts">
import { computed } from 'vue'
import { useCanvas } from '@hl/core'
import { SchemaForm } from '@hl/ui'
import type { ContainerType, MetaContainerItem, } from '@hl/core'

const canvasState = useCanvas()
const config = computed<Array<MetaContainerItem>>(() => canvasState.canvasStyleConfig.formItems!)
const mode = computed<ContainerType>(() => canvasState.canvasStyleConfig.mode!)
const formData = computed<Record<string, any>>(() => canvasState.globalOption)
const changed = (keys: Array<string>, val: any) => {
    console.log(keys, val)
    canvasState.setCanvasStyle(keys, val)
}
</script>
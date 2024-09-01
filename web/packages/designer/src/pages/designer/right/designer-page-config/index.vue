<template>
    <SchemaForm :config="config" :data="formData" :mode="mode" @change="changed" />
</template>
<script setup lang="ts">
import { computed } from 'vue'
import { useCanvas } from '@hl/core'
import { SchemaForm } from '@hl/ui'
import type { ContainerType, IMetaContainerItem, } from '@hl/core'

const canvasState = useCanvas()
const config = computed<Array<IMetaContainerItem>>(() => canvasState.canvasStyleConfig.formItems!)
const mode = computed<ContainerType>(() => canvasState.canvasStyleConfig.mode!)
const formData = computed<Record<string, any>>(() => canvasState.globalOption)
const changed = (keys: Array<string>, val: any) => {
    canvasState.setCanvasStyle(keys, val)
}
</script>
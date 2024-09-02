<template>
  <SchemaForm :config="attrKeys" :data="formData" :mode="mode" @change="changed" />
</template>
<script setup lang="ts">
import { computed } from 'vue'
import { useCanvas } from '@hl/core'
import { SchemaForm } from '@hl/ui'
import type { ContainerType, IMetaContainerItem, Material } from '@hl/core'

const props = defineProps<{
  curComponent: Material
}>()
const canvasState = useCanvas()
const attrKeys = computed<Array<IMetaContainerItem>>(() => {
  if (props.curComponent) {
    return props.curComponent?.propFormValue
  }
  return []
})
const mode = computed<ContainerType>(() => props.curComponent?.defaultViewType)
const formData = computed(() => resetFormData())

// 样式页面改变，修改当前组件的样式：curComponent?.propValue
const changed = (keys: Array<string>, val: any) => {
  if (!props.curComponent) {
    return
  }
  canvasState.setComponentPropValue(props.curComponent, keys, val)
}
const resetFormData = () => {
  const data = {
    common: {
      name: props.curComponent?.name,
      component: props.curComponent?.component,
      id: props.curComponent?.id
    }
  }

  if (props.curComponent && props.curComponent?.propValue) {
    Object.assign(data, props.curComponent?.propValue)
  }
  console.log('data', data)
  return data
}
</script>

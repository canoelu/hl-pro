<template>
  <setting-item-box name="尺寸">
    <n-input-number
      v-model:value="chartAttr.w"
      :min="50"
      :disabled="isGroup"
      size="small"
      placeholder="px"
    >
      <template #prefix>
        <n-text depth="3">宽度</n-text>
      </template>
    </n-input-number>
    <n-input-number
      v-model:value="chartAttr.h"
      :min="50"
      :disabled="isGroup"
      size="small"
      placeholder="px"
    >
      <template #prefix>
        <n-text depth="3">高度</n-text>
      </template>
    </n-input-number>
  </setting-item-box>
</template>

<script setup lang="ts">
import { PropType } from 'vue'
import { PickCreateComponentType } from '@/typings/design'
import { SettingItemBox } from '@/components/setting/ChartItemSetting'

const props = defineProps({
  chartAttr: {
    type: Object as PropType<Omit<PickCreateComponentType<'attr'>, 'node' | 'conNode'>>,
    required: true
  },
  isGroup: {
    type: Boolean,
    required: false
  }
})
</script>

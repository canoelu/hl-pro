<template>
  <n-form-item key="data" label="示例数据">
    <div class="justify-center flex-row flex-nowrap flex items-center">
      <n-input
        placeholder="点击预览"
        :readonly="true"
        :value="previewData"
        @click="isShow = true"
      />
      <n-button type="primary" @click="isShow = true"> 预览 </n-button>
    </div>
  </n-form-item>
  <n-modal v-model:show="isShow">
    <n-card
      title="示例数据"
      :bordered="false"
      size="small"
      role="dialog"
      closable
      aria-modal="true"
      @close="isShow = false"
    >
      <!-- <OCodeEditor v-model:value="formData.data" /> -->
    </n-card>
  </n-modal>
</template>

<script lang="ts" setup>
import type { IDataHandler, ISlotter } from '@hl/core'
import { NButton, NCard, NFormItem, NInput, NModal } from 'naive-ui'
import { cloneDeep } from 'lodash-es'
import { computed, onMounted, reactive, ref, watch } from 'vue'

const props = defineProps<{
  slotter: ISlotter
  handler: IDataHandler
}>()
const isShow = ref<boolean>(false)

const formData = reactive<{
  data: string
}>({
  data: '[]'
})
const previewData = computed<string>(() => JSON.stringify(JSON.parse(formData.data || '[]')))
onMounted(async () => {
  await initData()
})

const initData = async () => {
  const dataConfig = props.slotter.dataConfig
  const exampleData = (await props.slotter.getExampleData()) || {}
  if (dataConfig && dataConfig.type === 'DEMO') {
    const acceptor = (resp) => {
      formData.data = JSON.stringify(resp.data, null, '\t')
    }
    const instance = dataConfig.dataInstance
    instance.debug(acceptor)
  } else {
    formData.data = JSON.stringify(exampleData, null, '\t')
    const dataConfig = {
      type: 'DEMO',
      dataInstance: new props.handler({
        data: cloneDeep(exampleData)
      })
    }
    await props.slotter.changeDataConfig(dataConfig)
  }
}

watch(
  () => props.slotter,
  (value) => {
    if (value) {
      initData()
    }
  },
  { immediate: true }
)
</script>

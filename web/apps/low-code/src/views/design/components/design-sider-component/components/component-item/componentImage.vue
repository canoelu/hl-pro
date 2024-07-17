<template>
    <img class="list-img" v-lazy="imageInfo" alt="图表图片" />
</template>

<script setup lang="ts">
import { ref, PropType, watch } from 'vue'
import { fetchImages } from '@/material'
import { ComponentItem } from '@/typings/design.d'

const props = defineProps({
    chartConfig: {
        type: Object as PropType<ComponentItem>,
        required: true
    }
})

const imageInfo = ref('')

// 获取图片
const fetchImageUrl = async () => {
    imageInfo.value = await fetchImages(props.chartConfig)
}

watch(
    () => props.chartConfig.key,
    () => fetchImageUrl(),
    {
        immediate: true
    }
)
</script>
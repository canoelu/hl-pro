<template>
    <div class="hl-animation-config">
        <n-tabs class="tabs-box" size="small">
            <n-tab-pane v-for="ani in animations" :key='ani.label' :name="ani.label" size="small">
                <template #tab>
                    <div>{{ ani.label }}</div>
                </template>
                <n-grid :x-gap="6" :y-gap="10" :cols="3">
                    <n-grid-item v-for="(childrenItem, index) in ani.children" :key="index"
                        class="hl-animation-item cursor-pointer h-40px flex-center border-radius-5px border-1 hover:border-primary hover:text-primary">
                        <div class=" hl-transition-quick" :class="[
                activeIndex(childrenItem.value) && 'active',
                hoverPreviewAnimate === childrenItem.value &&
                `animate__animated  animate__${childrenItem.value}`
            ]" @mouseover="hoverPreviewAnimate = childrenItem.value" @click="addAnimation(childrenItem)">
                            {{ childrenItem.label }}

                        </div>
                    </n-grid-item>
                </n-grid>
            </n-tab-pane>
        </n-tabs>
    </div>
</template>
<script lang="ts" setup>
import { animations } from '@/constants/animations'
const hoverPreviewAnimate = ref('')
// TODO
const targetData = ref({ styles: { animations: [] } })
const addAnimation = (item: { label: string; value: string }) => {
    unref(targetData).styles.animations = [item.value]
}
// * 选中的动画样式
const activeIndex = (value: string) => {
    const selectValue = unref(targetData).styles.animations
    if (!selectValue.length) return false
    return selectValue[0] === value
}
</script>
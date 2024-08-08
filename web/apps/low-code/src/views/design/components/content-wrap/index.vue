<template>
    <div class="content-wrap  h-full  min-w-180px  relative flex-col  border-r-1 border-color  overflow-hidden ">
        <div class='content-wrap-header flex items-center justify-between p-2' v-if="showTop">
            <n-space class="flex-no-wrap" :size="5">
                <n-ellipsis>
                    <n-text>{{ title }}</n-text>
                </n-ellipsis>
                <div class="mt-1">
                    <slot name="icon"></slot>
                </div>
            </n-space>
            <n-space class="go-flex-no-wrap" align="center" style="gap: 4px">
                <slot name="top-right"></slot>
            </n-space>

            <slot name="header-left"></slot>
            <slot name="header-right"></slot>
        </div>
        <slot></slot>
    </div>
</template>
<script setup lang="ts">
const emit = defineEmits(['back'])

defineProps({
    title: String,
    showTop: {
        type: Boolean,
        default: true
    },
    showBottom: {
        type: Boolean,
        default: false
    },
    flex: {
        type: Boolean,
        default: false
    },
    // back
    backIcon: {
        type: Boolean,
        default: true
    },
    // 背景深度
    depth: {
        type: Number,
        default: 1
    },
    // x 轴滚动
    xScroll: {
        type: Boolean,
        default: false
    },
    disabledScroll: {
        type: Boolean,
        default: false
    },
})

const backHandle = () => {
    emit('back')
}
</script>
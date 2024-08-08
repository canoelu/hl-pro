<template>
    <div class="hl-edit-shape-box absolute cursor-move" :class="{ 'cursor-default': lock, 'display-none': hide }"
        :style="{
            ...useComponentStyle(materialItem.attr, index),
        }">
        <slot></slot>
        <!-- 锚点 -->
        <template v-if="!hiddenPoint">
            <div :class="`shape-point ${point}`" v-for="(point, index) in select ? pointList : []" :key="index"
                :style="usePointStyle(point, index, materialItem.attr, cursorResize)"
                @mousedown="useMousePointHandle($event, point, materialItem?.attr)"></div>
        </template>
        <!-- 选中 -->
        <div class="shape-modal" :style="useSizeStyle(materialItem.attr)">
            <div class="shape-modal-select" :class="{ active: select }"></div>
            <div class="shape-modal-change" :class="{ selectActive: select, hoverActive: hover }"></div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { CreateComponentType, CreateComponentGroupType } from '@/typings/design';
import { useDesignEditStore } from '@/store/modules/design/editStore'
import { EditCanvasTypeEnum } from '@/store/modules/design/type'
import { useMousePointHandle } from '../../hooks/useDrag'
import { usePointStyle, useSizeStyle, useComponentStyle } from '../../hooks/useStyle'
const designStore = useDesignEditStore()
const props = defineProps({
    materialItem: {
        type: Object as PropType<CreateComponentType | CreateComponentGroupType>,
        required: true
    },
    hiddenPoint: {
        type: Boolean,
        required: false
    },
    index: {
        type: Number,
        default: 1,
        required: true
    }
})
const pointList = ['t', 'r', 'b', 'l', 'lt', 'rt', 'lb', 'rb']
const cursorResize = ['n', 'e', 's', 'w', 'nw', 'ne', 'sw', 'se']
// 兼容多值场景
const select = computed(() => {
    const id = props.materialItem.id
    if (props.materialItem.status.lock) return false
    return designStore.getTargetChart.selectId.find((e: string) => e === id)
})
// 锁定
const lock = computed(() => {
    return props.materialItem.status.lock
})

// 隐藏
const hide = computed(() => {
    return props.materialItem.status.hide
})

// 计算当前选中目标
const hover = computed(() => {
    const isDrag = designStore.getEditCanvas[EditCanvasTypeEnum.IS_DRAG]
    if (isDrag) return false

    if (props.materialItem.status.lock) return false
    return props.materialItem.id === designStore.getTargetChart.hoverId
})
</script>
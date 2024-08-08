<template>
    <div class="hl-design-edit flex flex-1 wh-full border-1 relative" id='__hl-design-edit-layout'
        @mousedown="mousedownHandleUnStop" @drop="dropHandle" @dragover="dragoverHandle" @dragenter="dragoverHandle">
        <edit-sketch>
            <div v-for="(item, index) in designEditStore.getMaterialList" :key="item.id">
                <edit-shape-box :data-id="item.id" :materialItem="item" :index="index">
                    <component :is="item.chartConfig.chartKey" :chartConfig="item" :style="{
            ...useSizeStyle(item.attr),
        }"></component>
                </edit-shape-box>

            </div>
        </edit-sketch>
    </div>
</template>
<script lang="ts" setup>
import { useDesignEditStore } from '@/store/modules/design/editStore'
import EditShapeBox from '@/views/design/design-edit/modules/edit-shape-box/index.vue'
import EditSketch from '@/views/design/design-edit/modules/edit-sketch/index.vue'
import { dropHandle, dragoverHandle, mousedownHandleUnStop, useMouseHandle } from './hooks/useDrag'
import { usePointStyle, useSizeStyle, useComponentStyle } from './hooks/useStyle'

const designEditStore = useDesignEditStore()
</script>
<style lang="scss" scoped></style>
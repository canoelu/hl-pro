<template>
    <div class="material-item relative border-radius-6px mb-2 p-2 cursor-pointer " draggable
        @dragstart="e => dragStartHandle(e, material)" @dragend="e => dragendHandle(e, material)"
        @dblclick="(e) => dblclickHandle(e, material)" @click="(e) => clickHandle(e, material)">
        <div class="material-item-header mb-2 font-size-12px">{{ material.title }}</div>
        <div class="material-item-center">
            <material-img v-if="material.image" class="list-img" :image="material.image" />
            <svg-icon v-else :icon="material.icon" color="#999" width="48" style="height: auto" />

        </div>
        <div class="material-item-bottom"></div>
    </div>
</template>
<script lang="ts" setup>
import { PropType, watch, ref, Ref, computed, nextTick } from 'vue'
import { MaterialItem } from '@/typings/design'
import { JSONStringify } from '@/utils'
import { DragKeyEnum } from '../../../../../../enums'
import MaterialImg from './materialImg.vue'
import omit from 'lodash/omit'
const props = defineProps({
    material: {
        type: Object as PropType<MaterialItem>,
        default: () => ({})
    }
})
const dragStartHandle = (e: DragEvent, material: MaterialItem) => {
    if (material.disabled) return
    // e!.dataTransfer!.effectAllowed = "move";
    // 将配置项绑定到拖拽属性上
    e!.dataTransfer!.setData(DragKeyEnum.DRAG_KEY, JSONStringify(omit(material, ['image'])))
}
const clickHandle = (e: MouseEvent, material: MaterialItem) => {
}
const dragendHandle = (e: MouseEvent, material: MaterialItem) => {

}
const dblclickHandle = async (e: MouseEvent, material: MaterialItem) => {
    if (material.disabled) return
    try {

    } catch (error) {
        console.log(error)
        // window['$message'].warning(`图表正在研发中, 敬请期待...`)
    }
}
</script>
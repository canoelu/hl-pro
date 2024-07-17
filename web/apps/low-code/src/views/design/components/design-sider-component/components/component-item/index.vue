<template>
    <div class="hl-comp-item cursor-move">
        <div ref="compItemRef" class="">
            <div class="hl-comp-item-box" v-for="item in list" :key="item.key" draggable
                @dragstart="!item.disabled && dragStartHandle($event, item)"
                @dragend="!item.disabled && dragendHandle()" @dblclick="dblclickHandle(item)"
                @click="clickHandle(item)">
                <div class="hl-comp-item-box-header">{{ item.title }}</div>
                <div class="hl-comp-item-box-center">
                    <SvgIcon v-if="item.icon" class="list-img" :icon="item.icon" color="#999" width="48"
                        style="height: auto" />
                    <component-image v-else class="list-img" :chartConfig="item" />
                </div>
                <div class="hl-comp-item-box-bottom"></div>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { PropType, watch, ref, Ref, computed, nextTick } from 'vue'
import { ComponentItem } from '@/typings/design.d'
import ComponentImage from './componentImage.vue'
const props = defineProps({
    list: {
        type: Array as PropType<ComponentItem[]>,
        default: []
    }
})
console.log(props.list)
const compItemRef = ref(null)
const dragStartHandle = (e, item) => {
    console.log(e)
}
const clickHandle = () => { }
const dragendHandle = () => { }
const dblclickHandle = () => { }
</script>
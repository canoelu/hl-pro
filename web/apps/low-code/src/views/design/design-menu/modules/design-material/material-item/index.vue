<template>
    <div class="material-item relative border-radius-6px mb-2 p-2 cursor-pointer " draggable
        @dragstart="e => dragStartHandle(e, material)" @dragend="e => dragendHandle(e, material)"
        @dblclick="(e) => dblclickHandle(e, material)" @click="(e) => clickHandle(e, material)">
        <div class="material-item-header mb-2 font-size-12px">{{ material.title }}</div>
        <div class="material-item-center">
            <svg-icon v-if="material.icon" :icon="material.icon" color="#999" width="48" style="height: auto" />
            <component-image v-else class="list-img" :chartConfig="material" />
        </div>
        <div class="material-item-bottom"></div>
    </div>
</template>
<script lang="ts" setup>
import { PropType, watch, ref, Ref, computed, nextTick } from 'vue'
import { MaterialItem } from '@/typings/design'
import { fetchMaterial, fetchConfigComponent, createComponent } from '@/material'
import { componentInstall, JSONStringify } from '@/utils'
import { DragKeyEnum } from '@/enums'
import ComponentImage from './materialImg.vue'
import omit from 'lodash/omit'
import { useDesignEditStore } from '@/store/modules/design/editStore'
import { EditCanvasTypeEnum } from '@/store/modules/design/type'
const designStore = useDesignEditStore()

const props = defineProps({
    material: {
        type: Object as PropType<MaterialItem>,
        default: () => ({})
    }
})
const dragStartHandle = (e: DragEvent, material: MaterialItem) => {
    if (material.disabled) return
    e!.dataTransfer!.effectAllowed = "move";
    componentInstall(material.chartKey, fetchMaterial(material))
    componentInstall(material.conKey, fetchConfigComponent(material))
    // 将配置项绑定到拖拽属性上
    e!.dataTransfer!.setData(DragKeyEnum.DRAG_KEY, JSONStringify(omit(material, ['image'])))
    designStore.setEditCanvas(EditCanvasTypeEnum.IS_CREATE, true)
}
const clickHandle = (e:MouseEvent, material: MaterialItem) => {
    material?.configEvents?.addHandle(material)
}
const dragendHandle = (e:MouseEvent,material: MaterialItem) => {
    designStore.setEditCanvas(EditCanvasTypeEnum.IS_CREATE, false)

}
const dblclickHandle = async (e: MouseEvent, material: MaterialItem) => {
    if (material.disabled) return
    try {
        // 动态注册图表组件
        componentInstall(material.chartKey, fetchMaterial(material))
        componentInstall(material.conKey, fetchConfigComponent(material))
        // 创建新图表组件
        let newComponent = await createComponent(material)
        if (material.redirectComponent) {
            material.dataset && (newComponent.option.dataset = material.dataset)
            newComponent.chartConfig.title = material.title
            newComponent.chartConfig.chartFrame = material.chartFrame
        }
        console.log(newComponent)
        // 添加
        designStore.addMaterialList(newComponent, false, true)
        // 选中
        // designStore.setTargetSelectMaterial(newComponent.id)
    } catch (error) {
        console.log(error)
        // window['$message'].warning(`图表正在研发中, 敬请期待...`)
    }
}
</script>
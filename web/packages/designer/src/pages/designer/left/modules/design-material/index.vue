<template>
    <content-wrap title='组件' class="hl-design-material  ">
        <div class='hl-design-material-content h-full flex overflow-hidden'>
            <div class="material-menu h-full border-r-1 border-color">
                <div class="material-menu-item flex-col items-center cursor-pointer hover:text-primary py-2 "
                    :class="[{ 'text-primary': selectMaterialPackageKey === pk.key }]" v-for='pk in materialPackage'
                    :key="pk.key" @click="() => materialPackageItemHandle(pk)">
                    <svg-icon :icon='pk.icon' class='size-6'></svg-icon>
                    <span class='inline-block mt-2 font-size-12px '>{{ pk.label }}</span>
                </div>
            </div>
            <n-scrollbar trigger="none" class="material-box w-180px p-2">
                <n-collapse :expanded-names="expandNames" @item-header-click='headerClickHandle'>
                    <template #arrow>
                        <svg-icon icon="mdi:play-arrow">
                        </svg-icon>
                    </template>
                    <n-collapse-item v-for="category in selectMaterialPackage?.children" :key='category.key'
                        :title="category.label" :name="category.key">
                        <material-item v-for='material in category.children' :key='material.key'
                            :material="material"></material-item>
                    </n-collapse-item>
                </n-collapse>
            </n-scrollbar>
        </div>
    </content-wrap>
</template>
<script lang="ts" setup>
import { ref, unref, watchEffect } from 'vue'
import { useMaterial } from './hooks/useMaterial'
import MaterialItem from './material-item/index.vue'
import type { CollapseProps } from 'naive-ui'

import ContentWrap from '../../../components/content-wrap/index.vue'

const { materialPackage, selectMaterialPackage, selectMaterialPackageKey, materialPackageItemHandle } = useMaterial()

const expandNames = ref([unref(selectMaterialPackage)?.children?.[0]?.key])
watchEffect(() => {
    expandNames.value = unref(selectMaterialPackage)?.children?.map(item => item.key)
})
const headerClickHandle: CollapseProps['onItemHeaderClick'] = ({ name, expanded }) => {
    if (expanded) {
        expandNames.value = [...unref(expandNames), name]
    } else {
        expandNames.value = unref(expandNames).filter(k => k !== name)
    }
}


</script>
<style lang="scss" scoped>
.material-menu-item {
    width: var(--hl-design-material-pk-width)
}
</style>
<template>
    <n-tabs class="tabs-box" size="small" type="segment">
        <n-tab-pane v-for="item in globalTabList" :key="item.key" :name="item.key" size="small"
            display-directive="show:lazy">
            <template #tab>
                <n-space>
                    <span>{{ item.title }}</span>
                    <!-- <n-icon size="16" class="icon-position">
                                <component :is="item.icon"></component>
                            </n-icon> -->
                </n-space>
            </template>
            <component :is="item.render"></component>
        </n-tab-pane>
    </n-tabs>

</template>
<script setup lang="ts">
import { useDesignEditStore } from '@/store/modules/design/editStore'
import { loadAsyncComponent } from '@/utils/utils'
import { TabsEnum } from './type'
const DesignPageConfig = loadAsyncComponent(() => import('./design-page-config/index.vue'))
const AnimationConfig = loadAsyncComponent(() => import('./animation-config/index.vue'))
const ComponentConfig = loadAsyncComponent(() => import('./component-config/index.vue'))
const EventConfig = loadAsyncComponent(() => import('./event-config/index.vue'))
const DataSource = loadAsyncComponent(() => import('./data-source-config/index.vue'))


const designStore = useDesignEditStore()


const selectTarget = computed(() => {
    const selectId = designStore.getTargetComponent.selectId
    if (selectId.length !== 1) return undefined

    const target = designStore.materialList[designStore.fetchTargetIndex()]
    if (target?.isGroup) {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        tabsSelect.value = TabsEnum.COMPONENT_CONFIG
    }
    return { id: 1, isGroup: false }
})
const componentDefaultTabList = [
    {
        key: TabsEnum.COMPONENT_CONFIG,
        title: '基础配置',
        // icon: ConstructIcon,
        render: ComponentConfig
    },
    {
        key: TabsEnum.ANIMATION_CONFIG,
        title: '动画',
        // icon: LeafIcon,
        render: AnimationConfig
    }
]
const pageTabList = [
    {
        key: TabsEnum.PAGE_SETTING,
        title: '页面配置',
        // icon: DesktopOutlineIcon,
        render: DesignPageConfig
    }
]
const componentTabList = [
    ...componentDefaultTabList,
    {
        key: TabsEnum.DATASOURCE_CONFIG,
        title: '数据',
        // icon: FlashIcon,
        render: DataSource
    },
    {
        key: TabsEnum.EVENT_CONFIG,
        title: '事件',
        // icon: RocketIcon,
        render: EventConfig
    }
]
// 页面设置
const globalTabList = computed(() => {
    if (!unref(selectTarget)) {
        return pageTabList
    } else if (unref(selectTarget)?.isGroup) {
        return componentDefaultTabList
    } else {
        return componentTabList
    }
})
</script>
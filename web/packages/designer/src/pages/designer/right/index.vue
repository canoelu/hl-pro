<template>
    <div class='designer-right'>
        <n-tabs class="tabs-box" size="small" type="segment">
            <n-tab-pane v-for="item in configTab" :key="item.key" :name="item.key" size="small"
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
    </div>


</template>
<script setup lang="ts">
import { computed, unref } from 'vue'
import { loadAsyncComponent } from '@hl/utils'
import { TabsEnum } from './type'
const DesignerPageConfig = loadAsyncComponent(() => import('./designer-page-config/index.vue'))
const AnimationConfig = loadAsyncComponent(() => import('./animation-config/index.vue'))
const ComponentConfig = loadAsyncComponent(() => import('./component-config/index.vue'))
const EventConfig = loadAsyncComponent(() => import('./event-config/index.vue'))
const DataSource = loadAsyncComponent(() => import('./data-source-config/index.vue'))
const showPageTab = ref(true)

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
        render: DesignerPageConfig
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

const configTab = computed(() => unref(showPageTab) ? pageTabList : componentTabList)
</script>
<style lang="scss" scoped>
.designer-right {
    width: var(--designer-config-width)
}
</style>
<template>
    <div class="hl-design wh-full overflow-hidden" :id='__DESIGN_ID__' :style='designStyle'>
        <div class="wh-full">
            <n-layout class="wh-full" content-class="flex-1">
                <!--设计器头部-->
                <design-header>
                    <template #left>
                        <n-button>保存</n-button>
                    </template>
                    <template #center>
                        搜索组件
                    </template>
                    <template #right>
                        <n-button>预览</n-button>
                        <n-button>发布</n-button>
                    </template>
                </design-header>
                <!--设计器内容-->
                <n-layout class="hl-design-container" has-sider>
                    <design-menu></design-menu>
                    <design-sider-component></design-sider-component>

                    <n-layout-content>
                        <design-edit></design-edit>
                    </n-layout-content>
                    <n-layout-sider collapse-mode="width" :collapsed-width="0" :width="350" show-trigger="arrow-circle">
                        <!--设计器配置-->
                        <design-configs />
                    </n-layout-sider>

                </n-layout>

            </n-layout>
            <!-- 右键 -->
            <n-dropdown placement="bottom-start" trigger="manual" size="small" :x="mousePosition.x" :y="mousePosition.y"
                :options="menuOptions" :show="designStore.getRightMenuShow" :on-clickoutside="onClickOutSide"
                @select="handleMenuSelect"></n-dropdown>
        </div>
    </div>
</template>
<script setup lang="ts">
import DesignHeader from '@/views/design/components/design-header/index.vue'
import DesignMenu from '@/views/design/components/design-menu/index.vue'
import DesignEdit from '@/views/design/components/design-edit/index.vue'
import DesignConfigs from '@/views/design/components/design-configs/index.vue'
import { useDesignEditStore } from '@/store/modules/design/editStore'
import { useContextMenu } from './hooks/use-context-menu'
import DesignSiderComponent from './components/design-sider-component/index.vue'
import {useDesginStyle} from './hooks/use-design-style'
const {designStyle}=useDesginStyle()
const designStore = useDesignEditStore()
// 右键
const {
    handleContextMenu,
    menuOptions,
    onClickOutSide,
    mousePosition,
    handleMenuSelect
} = useContextMenu()

const collapsed = ref<boolean>(false)
const collapsedHandle = () => {
    collapsed.value = true
}
const expandHandle = () => {
    collapsed.value = false
}

</script>
<style lang="scss" scoped>
.hl-design-container {
    height: calc(100vh - 60px);
}
</style>
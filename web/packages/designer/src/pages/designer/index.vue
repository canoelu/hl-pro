<template>
    <div class="wh-full flex-col flex flex-nowrap overflow-hidden " :id='__DESIGN_ID__' :style="designStyle">
        <slot name="head">
            <designer-header></designer-header>
        </slot>
        <div class='content flex flex-1 flex-nowrap flex-row'>
            <slot name="left">
                <designer-sidebar />
            </slot>
            <div class="designer-container flex flex-1 flex-col flex-nowrap  overflow-auto  h-full">
                <slot>
                    <div class="flex-1 designer-scroll-wrap overflow-auto">
                        <div class="designer-content  w-1200">
                            <designer-editor />
                        </div>
                    </div>
                </slot>
                <slot name="bottom">
                    <div class="designer-bottom">bototm</div>
                </slot>
            </div>
            <slot name="right">
                <designer-config>right</designer-config>
            </slot>
        </div>
    </div>
</template>
<script setup lang="ts">
import { onUnmounted, provide, readonly, useSlots } from 'vue'
import { useDesginStyle } from './hooks/useDesginStyle'
import DesignerHeader from './head'
import DesignerSidebar from './left'
import DesignerConfig from './right'
import DesignerEditor from './editor/index'
const { designStyle } = useDesginStyle()
const __DESIGN_ID__ = '__DESIGN_ID__'
const slots = useSlots()

</script>
<style lang='scss' scoped>
@import '../../style/index.scss';
</style>
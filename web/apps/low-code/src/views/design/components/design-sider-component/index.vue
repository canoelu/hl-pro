<template>
    <content-box class='hl-design-sider-component' title="组件">
        <aside>
            <div class="menu flex">
                <n-menu class="menu-width" v-model:value="selectValue" :options="menuOptions" :icon-size="16"
                    :indent="18" @update:value="clickItemHandle"></n-menu>
                <div v-if="selectOptions">
                    <charts-option-content v-if="selectOptions" :selectOptions="selectOptions"
                        :key="selectValue"></charts-option-content>
                </div>
            </div>
        </aside>
    </content-box>
</template>
<script lang="ts" setup>

import ContentBox from '../content-box/index.vue'
import { useComponents } from './hooks/useComponents'
import ChartsOptionContent from './components/list/index.vue'
const { menuOptions, selectValue, clickItemHandle, selectOptions } = useComponents()
</script>
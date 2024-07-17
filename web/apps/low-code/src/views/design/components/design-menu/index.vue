<!--模块列表-->
<template>
    <div class="hl-design-menu flex flex-col  justify-between  border-r-1  p-4">
        <div class='hl-design-menu-top'>top</div>
        <div class='hl-design-menu-bottom'>bottom</div>
    </div>
</template>
<script lang="ts" setup>
const moduleList = [{
    label: "图层",
    key: "layout",
    icon: '',

}, {
    label: "物料",
    icon: '',

    key: "material"
}, {
    label: "数据源",
    icon: '',

    key: "datasource"
}, {
    key: 'filter',
    icon: '',

    label: "过滤器"
}, {
    key:"history",
    label: "历史记录"
    icon: '',

}]
</script>
<style lang="scss" scoped>
.hl-design-menu {
    width: var(--hl-design-menu-width)
}
</style>
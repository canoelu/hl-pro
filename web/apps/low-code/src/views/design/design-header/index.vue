<template>
    <n-layout-header bordered class='hl-design-header  flex-y-center   justify-between px-16px'>
        <div class='flex-y-center'>
            <div @click='backHandle'>
                <svg-icon icon="mdi:arrow-back" class='size-24px mr-12px cursor-pointer hover:text-primary'></svg-icon>

            </div>

            <slot name="left"></slot>
        </div>
        <div>
            <slot name="center"></slot>
        </div>
        <div>
            <slot name="right"></slot>
        </div>
    </n-layout-header>
</template>
<script lang='ts' setup>
import { useRouterPush } from '@/hooks/common/router';
const { routerBack } = useRouterPush()
const backHandle = () => {
    routerBack()
}
</script>
<style lang='scss' scoped>
.hl-design-header {
    height: var(--hl-design-header-height)
}
</style>
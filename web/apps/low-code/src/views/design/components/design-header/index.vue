<template>
    <n-layout-header bordered class='hl-design-header  flex-y-center   justify-between px-16px'>
        <div class='flex-y-center'>
            <svg-icon icon="mdi:arrow-back" class='size-24px mr-12px'></svg-icon>
            <iconify-icon icon="mdi:arrow-back"></iconify-icon>
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
<style lang='scss' scoped>
.hl-design-header {
    height: var(--hl-design-header-height)
}
</style>
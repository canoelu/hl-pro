<template>
    <div
        class="designer-header w-full flex flex-row items-center justify-between px-4 border-b-1 border-solid box-shadow">
        <n-space>
            <n-button>保存</n-button>
        </n-space>
        <n-space>
            <n-button>预览</n-button>
            <n-button>发布</n-button>
        </n-space>

    </div>
</template>
<script setup lang="ts"></script>
<style lang='scss' scoped>
.designer-header {
    height: var(--designer-header-height)
}
</style>
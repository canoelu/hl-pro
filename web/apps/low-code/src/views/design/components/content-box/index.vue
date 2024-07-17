<template>
    <div class="hl-content-box" :class="['flex']">
        <div class="hl-content-box-header" v-if="showHead">
            <n-ellipsis>
                <n-text>{{ title }}</n-text>
            </n-ellipsis>
            <slot name="header"></slot>
        </div>
        <div class="hl-content-box-content">
            <slot></slot>
        </div>
        <div class="hl-content-box-footer">
            <slot name="footer"></slot>
        </div>
    </div>
</template>
<script lang="ts" setup>

const props = defineProps({
    title: String,
    showHead: {
        type: Boolean,
        default: false
    }
})
</script>
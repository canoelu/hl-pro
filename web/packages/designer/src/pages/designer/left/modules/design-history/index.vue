<template>
    <menu-content title='历史记录' class="hl-design-history">
        <div v-for='(item, index) in snapShotState.list' :key='item.time'>
            <div @click='() => handleClick(item, index)'>
                {{ item.time }}
                {{ item.message }}

            </div>
        </div>
    </menu-content>
</template>
<script lang="ts" setup>
import MenuContent from '@/views/design/components/content-wrap/index.vue'
import { useSnapshotState } from '@hl/core'
const snapShotState = useSnapshotState()
function handleClick(_item, index) {
    snapShotState.go(index)
}
</script>
<style lang="scss" scoped></style>
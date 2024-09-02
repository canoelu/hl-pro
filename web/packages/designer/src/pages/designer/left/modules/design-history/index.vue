<template>
    <content-box title='历史记录' class="hl-design-history">
        <div v-for='(item, index) in snapShotState.list' :key='item.time'>
            <div @click='() => handleClick(item, index)'>
                {{ item.time }}
                {{ item.message }}

            </div>
        </div>
    </content-box>
</template>
<script lang="ts" setup>
import ContentBox from '../../../../../components/content-box'
import { useSnapshotState } from '@hl/core'
const snapShotState = useSnapshotState()
function handleClick(_item, index) {
    snapShotState.go(index)
}
</script>
<style lang="scss" scoped></style>
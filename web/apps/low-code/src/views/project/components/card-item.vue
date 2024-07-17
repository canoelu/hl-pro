<template>
    <div class='hl-card-item '>
        <n-card hoverable size="small">
            <div class="hl-card-item-content relative">
                <n-image object-fit="cover" preview-disabled :img-props="{ style: { height: '180px' } }"
                    :src="`${itemData?.indexImage}?time=${new Date().getTime()}`" :alt="itemData?.projectName"
                    :fallback-src="requireErrorImg()">
                </n-image>
                <div class="hl-card-item-opt opacity-0 absolute top-0 left-0 bottom-0 right-0 flex-center">
                    <n-space>
                        <n-button size="small" color="#ffffff70" class='hover:color-white'>{{ $t('common.view')
                            }}</n-button>
                        <n-button size="small" type="primary" class='hover:color-white' @click="editHandle">{{
                    $t("common.edit") }}</n-button>
                    </n-space>
                </div>
            </div>
            <template #action>
                <div class="flex justify-between ">
                    <span>{{ itemData?.projectName || '暂无名称' }}</span>
                    <div class="flex-center">
                        <n-dropdown trigger="hover" placement="bottom" :options="selectOptions" :show-arrow="true"
                            @select="handleSelect">
                            <div class="cursor-pointer">
                                <SvgIcon icon='ant-design:more-outlined'></SvgIcon>
                            </div>
                        </n-dropdown>
                    </div>

                </div>
            </template>
        </n-card>


    </div>
</template>
<script setup lang="ts">
import { requireErrorImg } from '@/utils/utils'
import { ProjectItem } from '../type'
const emit = defineEmits(['preview', 'delete', 'resize', 'edit', 'release'])
import { $t } from '@/locales';
const props = defineProps({
    itemData: Object as PropType<ProjectItem>
})
const edit = () => {
    emit('edit', props.itemData)
}

const selectOptions = ref([
    {
        label: $t('common.preview'),
        key: 'preview',
    },
    {
        label: props.itemData?.state
            ? $t('common.unpublish')
            : $t('common.publish'),
        key: 'release',
    },
    {
        label: $t('common.delete'),
        key: 'delete',
    }
])
const handleSelect = (key: string) => {
    switch (key) {
        case 'preview':
            previewHandle()
            break
        case 'delete':
            deleteHandle()
            break
        case 'release':
            releaseHandle()
            break
        case 'edit':
            editHandle()
            break
    }
}

// 预览处理
const previewHandle = () => {
    emit('preview', props.itemData)
}

// 删除处理
const deleteHandle = () => {
    emit('delete', props.itemData)
}

// 编辑处理
const editHandle = () => {
    emit('edit', props.itemData)
}

// 编辑处理
const releaseHandle = () => {
    emit('release', props.itemData)
}

// 放大处理
const resizeHandle = () => {
    emit('resize', props.itemData)
}
</script>
<style lang="scss" scoped>
.hl-card-item-content {
    .hl-card-item-opt {
        background-color: #000;
        transition: all 0.3s
    }

    &:hover {
        .hl-card-item-opt {
            opacity: 0.8
        }
    }
}
</style>
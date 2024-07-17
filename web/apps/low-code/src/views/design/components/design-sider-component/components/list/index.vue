<template>
    <div class="flex">
        <n-menu class="chart-menu-width" v-model:value="selectValue" :options="packages.menuOptions" :icon-size="16"
            :indent="18" @update:value="clickItemHandle"></n-menu>
        <div class="content-list">
            <n-scrollbar trigger="none">
                <charts-item-box :list="packages.selectOptions" @deletePhoto="deleteHandle"></charts-item-box>
            </n-scrollbar>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { loadAsyncComponent } from '@/utils'
import { PackagesType, ConfigType } from '@/typings/design.d'

const ChartsItemBox = loadAsyncComponent(() => import('../component-item/index.vue'))
const hidePackageOneCategory = computed(() => {
    if (packages.categorysNum > 2) return true
    // return !settingStore.getHidePackageOneCategory
})
const props = defineProps({
    selectOptions: {
        type: Object,
        default: () => { }
    }
})

let packages = reactive<{
    [T: string]: any
}>({
    // 侧边栏
    menuOptions: [],
    // 当前选择
    selectOptions: {},
    // 分类归档
    categorys: {
        all: []
    },
    categoryNames: {
        all: '所有'
    },
    // 分类归档数量
    categorysNum: 0,
    // 存储不同类别组件进来的选中值
    saveSelectOptions: {}
})
const selectValue = ref<string>('all')
// 设置初始列表
const setSelectOptions = (categorys: any) => {
    for (const val in categorys) {
        packages.selectOptions = categorys[val]
        break
    }
}
const deleteHandle = () => { }
// 处理点击事件
const clickItemHandle = (key: string) => {
    packages.selectOptions = packages.categorys[key]
}
watch(
    // @ts-ignore
    () => props.selectOptions,
    (newData: { list: ConfigType[] }) => {
        packages.categorysNum = 0
        if (!newData) return
        newData.list.forEach((e: ConfigType) => {
            const value: ConfigType[] = (packages.categorys as any)[e.category]
            packages.categorys[e.category] = value && value.length ? [...value, e] : [e]
            packages.categoryNames[e.category] = e.categoryName
            packages.categorys['all'].push(e)
        })
        for (const val in packages.categorys) {
            packages.categorysNum += 1
            packages.menuOptions.push({
                key: val,
                label: packages.categoryNames[val]
            })
        }
        setSelectOptions(packages.categorys)
        // 默认选中处理
        selectValue.value = packages.menuOptions[0]['key']
    },
    {
        immediate: true
    }
)

</script>
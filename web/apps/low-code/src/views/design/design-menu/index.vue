<!--模块menu列表-->
<template>
    <div class="flex h-full bg-container text-base_text  overflow-hidden">
        <div class="hl-design-menu flex flex-col  justify-between  border-r-1 border-color ">
            <n-scrollbar class='hl-design-menu-top'>
                <div class='hl-design-menu-item  relative cursor-pointer text-base_text hover:text-primary py-8px mb-1 ml-1px'
                    :class="[{ 'text-primary active': menuStore.selectedMenus.find(menu => menu.key === item.key) }]"
                    v-for='item in menuList' :key='item.key' @click='() => handleSelect(item)'>
                    <div class="flex-y-center flex-col ">
                        <svg-icon :icon="item.icon" class="size-24px"></svg-icon>
                        <span class='font-size-12px m-t-2 '>{{ item.label }}</span>
                    </div>
                </div>
            </n-scrollbar>
            <div class='hl-design-menu-bottom'>bottom</div>
        </div>
        <div class='hl-desin-box flex'>
            <component v-for='item in menuStore.selectedMenus' :key='item.key' :is='item.component'></component>
        </div>

    </div>

</template>
<script lang="ts" setup>
import { IMenuItem } from '@/store/modules/design/type';
import { useDesignMenuStore } from '@/store/modules/design/menuStore'
import { menuList } from '@/constants'
const menuStore = useDesignMenuStore()

function handleSelect(menu: IMenuItem) {
    if (menuStore.selectedMenus.find(item => item.key === menu.key)) {
        const _menus = menuStore.selectedMenus.filter(item => item.key !== menu.key)
        menuStore.setSelectedMenus(_menus)
    } else {
        menuStore.setSelectedMenus(menu.multiple && menuStore.selectedMenus.length > 1 ? [menu, ...menuStore.selectedMenus.filter(item => !item.multiple)] : [...menuStore.selectedMenus.filter(item => item.multiple), menu])
    }
}
</script>
<style lang="scss" scoped>
.hl-design-menu {
    width: var(--hl-design-menu-width);

    .hl-design-menu-item {
        &:before {
            content: "";
            position: absolute;
            top: 100%;
            left: 0;
            width: 2px;
            height: 0;
            transition: 0.2s all linear;
            border-left: 2px solid rgb(var(--primary-color));
            background: rgb(var(--primary-color))
        }

        &:hover::before {
            top: 0;
            left: 0;
            height: 100%;
            border-left-color: rgb(var(--primary-color));
            transition-delay: 0.1s;

        }



        &.active {

            // color: rgb(var(--primary-color));
            background:rgb(var(--primary-100-color));
            &:before {
                top: 0;
                left: 0;
                border-color: none;
                height: 100%
            }
        }

    }

    .hl-design-menu-item:hover~.hl-design-menu-item::before {
        top: 0;
        left: 0;

    }

}
</style>
<!--模块menu列表-->
<template>
  <div class="flex h-full bg-container text-base_text overflow-hidden">
    <div class="designer-sidebar flex flex-col justify-between bg-#f2f3f5 dark:bg-dark">
      <n-scrollbar class="hl-designer-menu-top">
        <div
          class="hl-designer-menu-item relative cursor-pointer text-base_text py-8px mb-1 ml-1px"
          :class="[{ 'text-primary active': item.key === selectedMenu.key }]"
          v-for="item in menuList"
          :key="item.key"
          @click="() => handleSelect(item)"
        >
          <div class="flex-y-center flex-col">
            <svg-icon :icon="item.icon" class="size-24px"></svg-icon>
            <span class="font-size-12px m-t-2">{{ item.label }}</span>
          </div>
        </div>
      </n-scrollbar>
    </div>
    <div class="hl-desin-box flex">
      <component :key="selectedMenu.key" :is="selectedMenu.component"></component>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref, unref } from 'vue'
import { menuList } from '../../../constants'

const selectedMenu = ref(menuList?.[0])
function handleSelect(menu) {
  if (unref(selectedMenu).key === menu.key) {
    selectedMenu.value = {}
  } else {
    selectedMenu.value = menu
  }
}
</script>
<style lang="scss" scoped>
.designer-sidebar {
  width: var(--designer-menu-width);
  .hl-designer-menu-item {
    &:before {
      content: '';
      position: absolute;
      top: 100%;
      left: 0;
      width: 2px;
      height: 0;
      transition: 0.2s all linear;
      border-left: 2px solid rgb(var(--primary-color));
      background: rgb(var(--primary-color));
    }
 

    &:hover::before {
      top: 0;
      left: 0;
      height: 100%;
      border-left-color: rgb(var(--primary-color));
      transition-delay: 0.1s;
    }

    &.active {
      color: rgb(var(--primary-color));

      &:before {
        top: 0;
        left: 0;
        border-color: none;
        height: 100%;
      }
    }
  }

  .hl-designer-menu-item:hover ~ .hl-designer-menu-item::before {
    top: 0;
    left: 0;
  }
}
</style>

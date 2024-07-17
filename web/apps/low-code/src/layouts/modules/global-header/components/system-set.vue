<template>
    <ButtonIcon icon="hugeicons:list-setting" :tooltip-content="$t('icon.themeConfig')"
        @click="appStore.openThemeDrawer" />
</template>
<script setup lang="ts">
import { useAppStore } from '@/store/modules/app';
import { $t } from '@/locales';

defineOptions({
    name: 'SystemSet'
});

const appStore = useAppStore();
</script>
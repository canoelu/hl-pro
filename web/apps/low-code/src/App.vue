<template>
  <n-config-provider :theme="naiveDarkTheme" :theme-overrides="themeStore.naiveTheme" :locale="naiveLocale"
    :date-locale="naiveDateLocale" class="h-full">
    <app-provider>
      <RouterView class="bg-layout" />
    </app-provider>
  </n-config-provider>
</template>
<script setup lang="ts">
import { computed } from 'vue';
import { NConfigProvider, darkTheme } from 'naive-ui';
import { useAppStore } from './store/modules/app';
import { useThemeStore } from './store/modules/theme';
import { naiveDateLocales, naiveLocales } from './locales/naive';
defineOptions({
  name: 'App'
});

const appStore = useAppStore();
const themeStore = useThemeStore();

const naiveDarkTheme = computed(() => (themeStore.darkMode ? darkTheme : undefined));

const naiveLocale = computed(() => {
  return naiveLocales[appStore.locale];
});

const naiveDateLocale = computed(() => {
  return naiveDateLocales[appStore.locale];
});
</script>

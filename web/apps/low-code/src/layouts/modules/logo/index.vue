<template>
  <RouterLink to="/" class="w-full flex-center nowrap-hidden">
    <SystemLogo class="text-28px text-primary" />
  </RouterLink>
</template>
<script setup lang="ts">
defineOptions({
  name: 'Logo'
});
interface Props {
  /** Whether to show the title */
  showTitle?: boolean;
}

withDefaults(defineProps<Props>(), {
  showTitle: false
});
</script>

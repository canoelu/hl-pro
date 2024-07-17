<template>
  <div class="hl-setting-item" :style="{ width: width + 'px' }">
    <slot ></slot>
    <n-text class="name" depth="3">{{ name }}</n-text>
  </div>
</template>

<script setup lang="ts">
defineProps({
  name: {
    type: String,
    required: false
  },
  width: {
    type: Number,
    required: false
  }
})
</script>

<style lang="scss" scoped>
 
</style>

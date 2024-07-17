<template>
  <div class="go-config-item-box flex">
    <n-text class="item-left" depth="2">
      {{ name }}
      <n-space :size="5">
        <slot name="name"></slot>
      </n-space>
    </n-text>
    <div
      class="item-right"
      :style="{
        gridTemplateColumns: alone ? '1fr' : '1fr 1fr',
        ...itemRightStyle
      }"
    >
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  name: {
    type: String,
    required: false
  },
  alone: {
    type: Boolean,
    default: false,
    required: false
  },
  itemRightStyle: {
    type: Object,
    default: () => {},
    required: false
  }
})
</script>

 
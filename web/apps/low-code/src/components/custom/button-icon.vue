<template>
  <!-- define component start: Button -->
  <DefineButton v-slot="{ $slots, className }">
    <n-button quaternary :class="className">
      <div class="flex-center gap-8px">
        <component :is="$slots.default" />
      </div>
    </n-button>
  </DefineButton>
  <!-- define component end: Button -->

  <n-tooltip v-if="tooltipContent" :placement="tooltipPlacement" :z-index="zIndex">
    <template #trigger>
      <Button :class-name="cls" v-bind="$attrs">
        <slot>
          <SvgIcon :icon="icon" />
        </slot>
      </Button>
    </template>
    {{ tooltipContent }}
  </n-tooltip>
  <Button v-else :class-name="cls" v-bind="$attrs">
    <slot>
      <SvgIcon :icon="icon" />
    </slot>
  </Button>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { createReusableTemplate } from '@vueuse/core';
import type { PopoverPlacement } from 'naive-ui';

defineOptions({
  name: 'ButtonIcon',
  inheritAttrs: false
});

interface Props {
  /** Button class */
  class?: string;
  /** Iconify icon name */
  icon?: string;
  /** Tooltip content */
  tooltipContent?: string;
  /** Tooltip placement */
  tooltipPlacement?: PopoverPlacement;
  zIndex?: number;
}

const props = withDefaults(defineProps<Props>(), {
  class: 'h-36px text-icon',
  icon: '',
  tooltipContent: '',
  tooltipPlacement: 'bottom',
  zIndex: 98
});

interface ButtonProps {
  className: string;
}

const [DefineButton, Button] = createReusableTemplate<ButtonProps>();

const cls = computed(() => {
  let clsStr = props.class;

  if (!clsStr.includes('h-')) {
    clsStr += ' h-36px';
  }

  if (!clsStr.includes('text-')) {
    clsStr += ' text-icon';
  }

  return clsStr;
});
</script>

<template>
  <!-- 每个小模块的公共样式 -->
  <div class="content-box" :class="[`bg-depth${depth}`, flex && 'flex']">
    <div v-if="showTop" class="top go-mt-0 go-flex-no-wrap">
      <n-space class="go-flex-no-wrap" :size="5">
        <n-ellipsis>
          <n-text>{{ title }}</n-text>
        </n-ellipsis>
        <div class="mt-1">
          <slot name="icon"></slot>
        </div>
      </n-space>
      <n-space class="go-flex-no-wrap" align="center" style="gap: 4px">
        <slot name="top-right"></slot>
        <n-icon v-show="backIcon" size="20" class="go-cursor-pointer go-d-block" @click="backHandle">
          <!-- <chevron-back-outline-icon></chevron-back-outline-icon> -->
        </n-icon>
      </n-space>
    </div>

    <div
      class="content"
      :class="{
        'content-height-show-top-bottom': showBottom || showTop,
        'content-height-show-both': showBottom && showTop
      }"
    >
      <template v-if="disabledScroll">
        <slot></slot>
      </template>
      <template v-else-if="xScroll">
        <n-scrollbar x-scrollable>
          <n-scrollbar>
            <slot></slot>
          </n-scrollbar>
        </n-scrollbar>
      </template>

      <template v-else>
        <n-scrollbar>
          <slot></slot>
        </n-scrollbar>
      </template>
    </div>

    <div v-if="showBottom" class="bottom go-mt-0">
      <slot name="bottom"></slot>
    </div>
    <div class="aside">
      <slot name="aside"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
// import { icon } from '@/plugins'
// const { ChevronBackOutlineIcon } = icon.ionicons5

const emit = defineEmits(['back'])

defineProps({
  title: String,
  showTop: {
    type: Boolean,
    default: false
  },
  showBottom: {
    type: Boolean,
    default: false
  },
  flex: {
    type: Boolean,
    default: false
  },
  // back
  backIcon: {
    type: Boolean,
    default: true
  },
  // 背景深度
  depth: {
    type: Number,
    default: 1
  },
  // x 轴滚动
  xScroll: {
    type: Boolean,
    default: false
  },
  disabledScroll: {
    type: Boolean,
    default: false
  }
})

const backHandle = () => {
  emit('back')
}
</script>

<style lang="scss" scoped>
$topOrBottomHeight: 40px;
// 顶部距离
$--header-height: 60px;
.content-box {
  height: calc(100vh - #{$--header-height});
  margin: 1px;
  margin-bottom: 0;

  &.bg-depth0 {
    .bottom,
    .top {
    }
  }

  &.bg-depth1 {
    .bottom,
    .top {
    }
  }

  &.bg-depth2 {
    .bottom,
    .top {
    }
  }

  &.bg-depth3 {
    .bottom,
    .top {
    }
  }

  &.flex {
    flex: 1;
  }

  .top,
  .bottom {
    display: flex;
    justify-content: space-between;
    flex-wrap: nowrap;
    align-items: center;
    height: $topOrBottomHeight;
    padding: 0 10px;
    border-top: 1px solid;

    .mt-1 {
      margin-top: 2px;
    }
  }

  .top {
    border-bottom: 1px solid;
  }

  .content {
    height: calc(100vh - #{$--header-height});
    overflow: hidden;
  }

  .aside {
    position: relative;
  }

  .content-height-show-top-bottom {
    height: calc(100vh - #{$--header-height} - #{$topOrBottomHeight});
  }

  .content-height-show-both {
    height: calc(100vh - #{$--header-height} - #{$topOrBottomHeight} - #{$topOrBottomHeight});
  }
}
</style>

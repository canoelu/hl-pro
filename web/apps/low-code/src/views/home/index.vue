<script setup lang="ts">
import { computed } from 'vue';
import { useAppStore } from '@/store/modules/app';
import HeaderBanner from './modules/header-banner.vue';
import CardData from './modules/card-data.vue';
import LineChart from './modules/line-chart.vue';
import PieChart from './modules/pie-chart.vue';
import ProjectNews from './modules/project-news.vue';
import CreativityBanner from './modules/creativity-banner.vue';

const appStore = useAppStore();

const gap = computed(() => (appStore.isMobile ? 0 : 16));
</script>

<template>
  <n-space vertical :size="16">
    <HeaderBanner />
    <CardData />
    <n-grid :x-gap="gap" :y-gap="16" responsive="screen" item-responsive>
      <NGi span="24 s:24 m:14">
        <n-card :bordered="false" class="card-wrapper">
          <LineChart />
        </n-card>
      </NGi>
      <NGi span="24 s:24 m:10">
        <n-card :bordered="false" class="card-wrapper">
          <PieChart />
        </n-card>
      </NGi>
    </n-grid>
    <n-grid :x-gap="gap" :y-gap="16" responsive="screen" item-responsive>
      <NGi span="24 s:24 m:14">
        <ProjectNews />
      </NGi>
      <NGi span="24 s:24 m:10">
        <CreativityBanner />
      </NGi>
    </n-grid>
  </n-space>
</template>



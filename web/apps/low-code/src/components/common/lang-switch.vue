<template>
  <n-dropdown :value="lang" :options="langOptions" trigger="hover" @select="changeLang">
    <div>
      <ButtonIcon :tooltip-content="tooltipContent" tooltip-placement="left">
        <SvgIcon icon="heroicons:language" />
      </ButtonIcon>
    </div>
  </n-dropdown>
</template>
<script setup lang="ts">
import { computed } from 'vue';
import { $t } from '@/locales';

defineOptions({
  name: 'LangSwitch'
});

interface Props {
  lang: App.I18n.LangType;
  langOptions: App.I18n.LangOption[];
  showTooltip?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  showTooltip: true
});

type Emits = {
  (e: 'changeLang', lang: App.I18n.LangType): void;
};

const emit = defineEmits<Emits>();

const tooltipContent = computed(() => {
  if (!props.showTooltip) return '';

  return $t('icon.lang');
});

function changeLang(lang: App.I18n.LangType) {
  emit('changeLang', lang);
}
</script>

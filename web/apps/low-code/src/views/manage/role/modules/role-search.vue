<template>
  <n-card :title="$t('common.search')" :bordered="false" size="small" class="card-wrapper">
    <n-form :model="model" label-placement="left" :label-width="80">
      <n-grid responsive="screen" item-responsive>
        <NFormItemGi span="24 s:12 m:6" :label="$t('page.manage.role.roleName')" path="roleName" class="pr-24px">
          <n-input v-model:value="model.roleName" :placeholder="$t('page.manage.role.form.roleName')" />
        </NFormItemGi>
        <NFormItemGi span="24 s:12 m:6" :label="$t('page.manage.role.roleCode')" path="roleCode" class="pr-24px">
          <n-input v-model:value="model.roleCode" :placeholder="$t('page.manage.role.form.roleCode')" />
        </NFormItemGi>
        <NFormItemGi span="24 s:12 m:6" :label="$t('page.manage.role.roleStatus')" path="status" class="pr-24px">
          <n-select v-model:value="model.status" :placeholder="$t('page.manage.role.form.roleStatus')"
            :options="translateOptions(enableStatusOptions)" clearable />
        </NFormItemGi>
        <NFormItemGi span="24 s:12 m:6">
          <n-space class="w-full" justify="end">
            <n-button @click="reset">
              <template #icon>
                <icon-ic-round-refresh class="text-icon" />
              </template>
              {{ $t('common.reset') }}
            </n-button>
            <n-button type="primary" ghost @click="search">
              <template #icon>
                <icon-ic-round-search class="text-icon" />
              </template>
              {{ $t('common.search') }}
            </n-button>
          </n-space>
        </NFormItemGi>
      </n-grid>
    </n-form>
  </n-card>
</template>



<script setup lang="ts">
import { $t } from '@/locales';
import { enableStatusOptions } from '@/constants/business';
import { translateOptions } from '@/utils/common';

defineOptions({
  name: 'RoleSearch'
});

interface Emits {
  (e: 'reset'): void;
  (e: 'search'): void;
}

const emit = defineEmits<Emits>();

const model = defineModel<Api.SystemManage.RoleSearchParams>('model', { required: true });

function reset() {
  emit('reset');
}

function search() {
  emit('search');
}
</script>

<template>
  <n-card :title="$t('common.search')" :bordered="false" size="small" class="card-wrapper">
    <n-form ref="formRef" :model="model" :rules="rules" label-placement="left" :label-width="80">
      <n-grid responsive="screen" item-responsive>
        <NFormItemGi span="24 s:12 m:6" :label="$t('page.manage.user.userName')" path="userName" class="pr-24px">
          <n-input v-model:value="model.userName" :placeholder="$t('page.manage.user.form.userName')" />
        </NFormItemGi>
        <NFormItemGi span="24 s:12 m:6" :label="$t('page.manage.user.userGender')" path="userGender" class="pr-24px">
          <n-select v-model:value="model.userGender" :placeholder="$t('page.manage.user.form.userGender')"
            :options="translateOptions(userGenderOptions)" clearable />
        </NFormItemGi>
        <NFormItemGi span="24 s:12 m:6" :label="$t('page.manage.user.nickName')" path="nickName" class="pr-24px">
          <n-input v-model:value="model.nickName" :placeholder="$t('page.manage.user.form.nickName')" />
        </NFormItemGi>
        <NFormItemGi span="24 s:12 m:6" :label="$t('page.manage.user.userPhone')" path="userPhone" class="pr-24px">
          <n-input v-model:value="model.userPhone" :placeholder="$t('page.manage.user.form.userPhone')" />
        </NFormItemGi>
        <NFormItemGi span="24 s:12 m:6" :label="$t('page.manage.user.userEmail')" path="userEmail" class="pr-24px">
          <n-input v-model:value="model.userEmail" :placeholder="$t('page.manage.user.form.userEmail')" />
        </NFormItemGi>
        <NFormItemGi span="24 s:12 m:6" :label="$t('page.manage.user.userStatus')" path="userStatus" class="pr-24px">
          <n-select v-model:value="model.status" :placeholder="$t('page.manage.user.form.userStatus')"
            :options="translateOptions(enableStatusOptions)" clearable />
        </NFormItemGi>
        <NFormItemGi span="24 m:12" class="pr-24px">
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
import { computed } from 'vue';
import { $t } from '@/locales';
import { useFormRules, useNaiveForm } from '@/hooks/common/form';
import { enableStatusOptions, userGenderOptions } from '@/constants/business';
import { translateOptions } from '@/utils/common';

defineOptions({
  name: 'UserSearch'
});

interface Emits {
  (e: 'reset'): void;
  (e: 'search'): void;
}

const emit = defineEmits<Emits>();

const { formRef, validate, restoreValidation } = useNaiveForm();

const model = defineModel<Api.SystemManage.UserSearchParams>('model', { required: true });

type RuleKey = Extract<keyof Api.SystemManage.UserSearchParams, 'userEmail' | 'userPhone'>;

const rules = computed<Record<RuleKey, App.Global.FormRule>>(() => {
  const { patternRules } = useFormRules(); // inside computed to make locale reactive

  return {
    userEmail: patternRules.email,
    userPhone: patternRules.phone
  };
});

async function reset() {
  await restoreValidation();
  emit('reset');
}

async function search() {
  await validate();
  emit('search');
}
</script>

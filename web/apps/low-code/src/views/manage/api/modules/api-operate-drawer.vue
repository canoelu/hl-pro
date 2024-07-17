<script setup lang="ts">
import { computed, reactive, ref, watch } from 'vue';
import { useFormRules, useNaiveForm } from '@/hooks/common/form';
import { fetchAddApi, fetchUpdateApi } from '@/service/api';
import { $t } from '@/locales';
import { apiMethodOptions, enableStatusOptions } from '@/constants/business';

defineOptions({
  name: 'ApiOperateDrawer'
});

interface Props {
  /** the type of operation */
  operateType: NaiveUI.TableOperateType;
  /** the edit row data */
  rowData?: Api.SystemManage.Api | null;
}

const props = defineProps<Props>();

interface Emits {
  (e: 'submitted'): void;
}

const emit = defineEmits<Emits>();

const visible = defineModel<boolean>('visible', {
  default: false
});

const { formRef, validate, restoreValidation } = useNaiveForm();
const { defaultRequiredRule } = useFormRules();

const title = computed(() => {
  const titles: Record<NaiveUI.TableOperateType, string> = {
    add: $t('page.manage.api.addApi'),
    edit: $t('page.manage.api.editApi')
  };
  return titles[props.operateType];
});

const model: Api.SystemManage.ApiUpdateParams = reactive(createDefaultModel());

function createDefaultModel(): Api.SystemManage.ApiUpdateParams {
  return {
    path: '',
    method: 'get',
    summary: '',
    tags: '',
    status: null
  };
}

type RuleKey = Extract<keyof Api.SystemManage.ApiUpdateParams, 'path' | 'method' | 'summary' | 'tags' | 'status'>;

const rules = ref<Record<RuleKey, App.Global.FormRule>>({
  path: defaultRequiredRule,
  method: defaultRequiredRule,
  summary: defaultRequiredRule,
  tags: defaultRequiredRule,
  status: defaultRequiredRule
});

function handleInitModel() {
  Object.assign(model, createDefaultModel());

  if (props.operateType === 'edit' && props.rowData) {
    Object.assign(model, props.rowData);
  }
}

function closeDrawer() {
  visible.value = false;
}

async function handleSubmit() {
  await validate();
  // request

  if (props.operateType === 'add') {
    const { error } = await fetchAddApi(model);
    if (!error) {
      window.$message?.success($t('common.addSuccess'));
    }
  } else if (props.operateType === 'edit') {
    const { error } = await fetchUpdateApi(model);
    if (!error) {
      window.$message?.success($t('common.updateSuccess'));
    }
  }

  closeDrawer();
  emit('submitted');
}

watch(visible, () => {
  if (visible.value) {
    handleInitModel();
    restoreValidation();
  }
});
</script>

<template>
  <n-drawer v-model:show="visible" display-directive="show" :width="360">
    <n-drawerContent :title="title" :native-scrollbar="false" closable>
      <n-form ref="formRef" :model="model" :rules="rules">
        <n-form-item :label="$t('page.manage.api.path')" path="path">
          <n-input v-model:value="model.path" :placeholder="$t('page.manage.api.form.path')" />
        </n-form-item>
        <n-form-item :label="$t('page.manage.api.method')" path="method">
          <NRadioGroup v-model:value="model.method">
            <NRadio v-for="item in apiMethodOptions" :key="item.value" :value="item.value" :label="$t(item.label)" />
          </NRadioGroup>
        </n-form-item>
        <n-form-item :label="$t('page.manage.api.summary')" path="summary">
          <n-input v-model:value="model.summary" :placeholder="$t('page.manage.api.form.summary')" />
        </n-form-item>
        <n-form-item :label="$t('page.manage.api.tags')" path="tags">
          <n-input v-model:value="model.tags" :placeholder="$t('page.manage.api.form.tags')" />
        </n-form-item>
        <n-form-item :label="$t('page.manage.api.status')" path="status">
          <NRadioGroup v-model:value="model.status">
            <NRadio v-for="item in enableStatusOptions" :key="item.value" :value="item.value" :label="$t(item.label)" />
          </NRadioGroup>
        </n-form-item>
      </n-form>
      <template #footer>
        <n-space :size="16">
          <n-button @click="closeDrawer">{{ $t('common.cancel') }}</n-button>
          <n-button type="primary" @click="handleSubmit">{{ $t('common.confirm') }}</n-button>
        </n-space>
      </template>
    </n-drawerContent>
  </n-drawer>
</template>



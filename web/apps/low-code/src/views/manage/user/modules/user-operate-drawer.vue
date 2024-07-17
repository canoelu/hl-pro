<script setup lang="ts">
import { computed, reactive, ref, watch } from 'vue';
import { useFormRules, useNaiveForm } from '@/hooks/common/form';
import { fetchAddUser, fetchGetRoleList, fetchUpdateUser } from '@/service/api';
import { $t } from '@/locales';
import { enableStatusOptions, userGenderOptions } from '@/constants/business';

defineOptions({
  name: 'UserOperateDrawer'
});

interface Props {
  /** the type of operation */
  operateType: NaiveUI.TableOperateType;
  /** the edit row data */
  rowData?: Api.SystemManage.User | null;
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
    add: $t('page.manage.user.addUser'),
    edit: $t('page.manage.user.editUser')
  };
  return titles[props.operateType];
});

const model: Api.SystemManage.UserUpdateParams = reactive(createDefaultModel());

function createDefaultModel(): Api.SystemManage.UserUpdateParams {
  return {
    userName: '',
    password: '',
    userGender: null,
    nickName: '',
    userPhone: '',
    userEmail: '',
    userRoles: [],
    status: null
  };
}

type RuleKey = Extract<keyof Api.SystemManage.UserUpdateParams, 'userName' | 'password' | 'status'>;

const rules = ref<Record<RuleKey, App.Global.FormRule>>({
  userName: defaultRequiredRule,
  password: defaultRequiredRule,
  status: defaultRequiredRule
});

/** the enabled role options */
const roleOptions = ref<CommonType.Option<string>[]>([]);

async function getRoleOptions() {
  const { error, data } = await fetchGetRoleList({ status: '1' });

  if (!error) {
    const options = data.records.map(item => ({
      label: item.roleName,
      value: item.roleCode
    }));
    roleOptions.value = options;
  }
}

function handleInitModel() {
  Object.assign(model, createDefaultModel());

  if (props.operateType === 'edit' && props.rowData) {
    Object.assign(model, props.rowData);
  }

  if (props.operateType === 'add') {
    rules.value.password.required = true;
  } else if (props.operateType === 'edit') {
    rules.value.password.required = false;
  }
}

function closeDrawer() {
  visible.value = false;
}

async function handleSubmit() {
  await validate();
  // request

  if (props.operateType === 'add') {
    const { error } = await fetchAddUser(model);
    if (!error) {
      window.$message?.success($t('common.addSuccess'));
    }
  } else if (props.operateType === 'edit') {
    const { error } = await fetchUpdateUser(model);
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
    getRoleOptions();
  }
});
</script>

<template>
  <n-drawer v-model:show="visible" display-directive="show" :width="360">
    <n-drawerContent :title="title" :native-scrollbar="false" closable>
      <n-form ref="formRef" :model="model" :rules="rules">
        <n-form-item :label="$t('page.manage.user.userName')" path="userName">
          <n-input v-model:value="model.userName" :placeholder="$t('page.manage.user.form.userName')" />
        </n-form-item>
        <n-form-item :label="$t('page.manage.user.password')" path="password">
          <n-input v-model:value="model.password" :placeholder="$t('page.manage.user.form.password')" />
        </n-form-item>
        <n-form-item :label="$t('page.manage.user.userGender')" path="userGender">
          <NRadioGroup v-model:value="model.userGender">
            <NRadio v-for="item in userGenderOptions" :key="item.value" :value="item.value" :label="$t(item.label)" />
          </NRadioGroup>
        </n-form-item>
        <n-form-item :label="$t('page.manage.user.nickName')" path="nickName">
          <n-input v-model:value="model.nickName" :placeholder="$t('page.manage.user.form.nickName')" />
        </n-form-item>
        <n-form-item :label="$t('page.manage.user.userPhone')" path="userPhone">
          <n-input v-model:value="model.userPhone" :placeholder="$t('page.manage.user.form.userPhone')" />
        </n-form-item>
        <n-form-item :label="$t('page.manage.user.userEmail')" path="email">
          <n-input v-model:value="model.userEmail" :placeholder="$t('page.manage.user.form.userEmail')" />
        </n-form-item>
        <n-form-item :label="$t('page.manage.user.userStatus')" path="status">
          <NRadioGroup v-model:value="model.status">
            <NRadio v-for="item in enableStatusOptions" :key="item.value" :value="item.value" :label="$t(item.label)" />
          </NRadioGroup>
        </n-form-item>
        <n-form-item :label="$t('page.manage.user.userRole')" path="roles">
          <n-select
            v-model:value="model.userRoles"
            multiple
            :options="roleOptions"
            :placeholder="$t('page.manage.user.form.userRole')"
          />
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




<template>
  <n-drawer v-model:show="visible" display-directive="show" :width="360">
    <n-drawerContent :title="title" :native-scrollbar="false" closable>
      <n-form ref="formRef" :model="model" :rules="rules">
        <n-form-item :label="$t('page.manage.role.roleName')" path="roleName">
          <n-input v-model:value="model.roleName" :placeholder="$t('page.manage.role.form.roleName')" />
        </n-form-item>
        <n-form-item :label="$t('page.manage.role.roleCode')" path="roleCode">
          <n-input v-model:value="model.roleCode" :placeholder="$t('page.manage.role.form.roleCode')" />
        </n-form-item>
        <n-form-item :label="$t('page.manage.role.roleStatus')" path="status">
          <NRadioGroup v-model:value="model.status">
            <NRadio v-for="item in enableStatusOptions" :key="item.value" :value="item.value" :label="$t(item.label)" />
          </NRadioGroup>
        </n-form-item>
        <n-form-item :label="$t('page.manage.role.roleDesc')" path="roleDesc">
          <n-input v-model:value="model.roleDesc" :placeholder="$t('page.manage.role.form.roleDesc')" />
        </n-form-item>
      </n-form>
      <n-space v-if="isEdit">
        <n-button @click="openMenuAuthModal">{{ $t('page.manage.role.menuAuth') }}</n-button>
        <MenuAuthModal v-model:visible="menuAuthVisible" :role-id="roleId" :role-home="model.roleHome" />
        <n-button @click="openButtonAuthModal">{{ $t('page.manage.role.buttonAuth') }}</n-button>
        <ButtonAuthModal v-model:visible="buttonAuthVisible" :role-id="roleId" />
        <n-button @click="openApiAuthModal">{{ $t('page.manage.role.apiAuth') }}</n-button>
        <ApiAuthModal v-model:visible="apiAuthVisible" :role-id="roleId" />
      </n-space>
      <template #footer>
        <n-space :size="16">
          <n-button @click="closeDrawer">{{ $t('common.cancel') }}</n-button>
          <n-button type="primary" @click="handleSubmit">{{ $t('common.confirm') }}</n-button>
        </n-space>
      </template>
    </n-drawerContent>
  </n-drawer>
</template>



<script setup lang="ts">
import { computed, reactive, watch } from 'vue';
import { useBoolean } from '@hl/hooks';
import { useFormRules, useNaiveForm } from '@/hooks/common/form';
import { fetchAddRole, fetchUpdateRole } from '@/service/api';
import { $t } from '@/locales';
import { enableStatusOptions } from '@/constants/business';
import MenuAuthModal from './menu-auth-modal.vue';
import ButtonAuthModal from './button-auth-modal.vue';
import ApiAuthModal from './/api-auth-modal.vue';

defineOptions({
  name: 'RoleOperateDrawer'
});

interface Props {
  /** the type of operation */
  operateType: NaiveUI.TableOperateType;
  /** the edit row data */
  rowData?: Api.SystemManage.Role | null;
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
const { bool: menuAuthVisible, setTrue: openMenuAuthModal } = useBoolean();
const { bool: buttonAuthVisible, setTrue: openButtonAuthModal } = useBoolean();
const { bool: apiAuthVisible, setTrue: openApiAuthModal } = useBoolean();

const title = computed(() => {
  const titles: Record<NaiveUI.TableOperateType, string> = {
    add: $t('page.manage.role.addRole'),
    edit: $t('page.manage.role.editRole')
  };
  return titles[props.operateType];
});

// type Model = Pick<Api.SystemManage.Role, 'roleName' | 'roleCode' | 'roleDesc' | 'roleHome' | 'status'>;

const model: Api.SystemManage.RoleUpdateParams = reactive(createDefaultModel());

function createDefaultModel(): Api.SystemManage.RoleAddParams {
  return {
    roleName: '',
    roleCode: '',
    roleDesc: '',
    roleHome: '',
    status: null
  };
}

type RuleKey = Exclude<keyof Api.SystemManage.RoleAddParams, 'roleDesc' | 'roleHome'>;

const rules: Record<RuleKey, App.Global.FormRule> = {
  roleName: defaultRequiredRule,
  roleCode: defaultRequiredRule,
  status: defaultRequiredRule
};

const roleId = computed(() => props.rowData?.id || -1);

const isEdit = computed(() => props.operateType === 'edit');

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
    const { error } = await fetchAddRole(model);
    if (!error) {
      window.$message?.success($t('common.addSuccess'));
    }
  } else if (props.operateType === 'edit') {
    const { error } = await fetchUpdateRole(model);
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

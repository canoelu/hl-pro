import type {
  ICustomProps,
  IFormItemProps,
  IMetaForm,
} from '@hl/core'
import { FormTypeEnum } from '@hl/core'
import {
  NButton,
  NCard,
  NColorPicker,
  NForm,
  NFormItem,
  NInput,
  NInputNumber,
  NModal,
  NRadio,
  NRadioGroup,
  NSelect,
  NSwitch
} from 'naive-ui'
import type {
  InputNumberProps,
  InputProps,
  ModalProps,
  RadioProps,
  SelectProps,
  SwitchProps
} from 'naive-ui'
import { isUndefined } from 'lodash-es'
import type { Component, PropType } from 'vue'
import { defineComponent, h, ref, watch } from 'vue'

import ArrayItem from './arrayItem'
import BackgroundItem from './background'
import CustomItem from './customItem'
import FontStyle from './fontSytle'
import FontWeight from './fontWeight'
import LinearGradient from './linearGradient'
import { GlobalColorSwatches } from './enums'

export default defineComponent({
  components: {
    FontStyle,
    FontWeight,
    LinearGradient,
    NSwitch,
    BackgroundItem
  },
  props: {
    name: {
      type: String,
      required: true
    },
    uid: {
      type: String,
      required: true
    },
    ukey: {
      type: String,
      required: true
    },
    children: {
      type: Array as PropType<IMetaForm[]>,
      required: true
    },
    data: {
      type: Object as PropType<Record<string, any>>,
      required: true
    }
  },
  emits: ['change', 'updateData'],
  setup(props, { emit }) {
    const formData = ref<Record<string, any>>(props.data)
    const componentMap=new Map<FormTypeEnum,Component>([[FormTypeEnum.COLOR,NColorPicker],[FormTypeEnum.SWITCH,NSwitch],[FormTypeEnum.FONT_STYLE,FontStyle],[FormTypeEnum.FONT_WEIGHT,FontWeight],[FormTypeEnum.BACKGROUND,BackgroundItem]])
    watch(
      () => props.data,
      () => {
        formData.value = props.data
      }
    )
    const changed = (val: any, keys: Array<string>) => {
      emit('change', keys, val)
      emit('updateData', props.ukey, formData)
    }
    const isShowLabel = (showLabel?: boolean) => showLabel !== false
    const isShow = ref<boolean>(false)
    const renderModal = (item: IMetaForm, modelValue: Record<string, any>, path: Array<string>) => {
      const options = ((item || {}).props || {}) as ModalProps
      return (
        <>
          <div class="justify-center flex-row flex-nowrap flex items-center">
            <NInput
              readonly={true}
              onClick={() => (isShow.value = true)}
              placeholder={options.placeholder}
              value={JSON.stringify(modelValue)}
            />
            <NButton type="primary" onClick={() => (isShow.value = true)}>
              {options.buttonText}
            </NButton>
          </div>
          <NModal v-model:show={isShow.value} class={['dark:bg-gray-800', 'bg-gray-100']}>
            <NCard title={item.label || ''} bordered={options.bordered || false}>
              <NForm size="small" labelPlacement="top">
                {(item.children || []).map((el) => {
                  return (
                    <NFormItem
                      prop={`${props.ukey}${item.prop}${el.prop}`}
                      label={el.label}
                      showLabel={isShowLabel(el.showLabel)}
                    >
                      {renderItem(el, modelValue, path)}
                    </NFormItem>
                  )
                })}
              </NForm>
            </NCard>
          </NModal>
        </>
      )
    }

    const renderFormItem = (
      item: IMetaForm,
      modelValue: Record<string, any>,
      path: Array<string> = []
    ) => {
      let component =item.type?componentMap.get(item.type) as Component: NInput
      
      return h(component, {
        value: modelValue[item.prop],
        onUpdateValue: (value) => {
          modelValue[item.prop] = value
          changed(value, path)
        }
      })
    }
    const renderItem = (item: IMetaForm, modelValue, path: Array<string> = []) => {
      if (!modelValue) {
        return <> </>
      }
      const itemOptions = (item.props || item.componentOptions || {}) as IFormItemProps
      const options: Record<string, any>[] =
        (itemOptions as SelectProps | RadioProps | SwitchProps)?.options || []

      /**
       * 获取设置的值
       * @param {string} name 需要获取值的名称
       * @param {any} [defaultValue=undefined] 默认值
       * @return 返回值本体或默认值
       */
      function getOptionsValue<T = undefined>(name: string, defaultValue?: T): T {
        return name in itemOptions ? itemOptions[name] : defaultValue
      }

      switch (item.type) {
        case FormTypeEnum.COLOR:
          return (
            <NColorPicker
              v-model:value={modelValue[item.prop]}
              swatches={GlobalColorSwatches}
              on-update:value={(event) => changed(event, [...path, item.prop])}
            />
          )
        case FormTypeEnum.SELECT:
          return (
            <NSelect
              v-model:value={modelValue[item.prop]}
              placeholder={item.label}
              on-update:value={(event) => changed(event, [...path, item.prop])}
              options={options}
              clearable={true}
            />
          )
        case FormTypeEnum.RADIO:
          return (
            <NRadioGroup
              v-model:value={modelValue[item.prop]}
              on-update:value={(event) => changed(event, [...path, item.prop])}
            >
              {options.map((op) => (
                <NRadio value={op.value} key={op.value}>
                  {op.label}
                </NRadio>
              ))}
            </NRadioGroup>
          )
        case FormTypeEnum.NUMBER:
          const numberMax: number = getOptionsValue<number>('max', 9999999999)
          const numberMin: number = getOptionsValue<number>('min', -9999999999)

          return (
            <NInputNumber
              v-model:value={modelValue[item.prop]}
              on-update:value={(event) => changed(event, [...path, item.prop])}
              max={numberMax}
              min={numberMin}
              clearable={true}
              v-slots={{
                prefix: (itemOptions as InputNumberProps).prefix,
                suffix: (itemOptions as InputNumberProps).suffix
              }}
            />
          )
        case FormTypeEnum.SWITCH:
        case FormTypeEnum.FONT_STYLE:
        case FormTypeEnum.FONT_WEIGHT:
        case FormTypeEnum.LINEAR_GRADIENT:
        case FormTypeEnum.BACKGROUND:
          return renderFormItem(item, modelValue, [...path, item.prop])
        case FormTypeEnum.ARRAY:
          const count = getOptionsValue<number>('count', 1)
          const type = getOptionsValue<'static' | 'dynamic'>('type', 'static')
          const maxItem = getOptionsValue<number | undefined>('maxItem')
          const minItem = getOptionsValue<number>('minItem')
          return h(ArrayItem, {
            value: modelValue[item.prop],
            onUpdateValue: (value) => {
              modelValue[item.prop] = value
              changed(value, [...path, item.prop])
            },
            count,
            type,
            maxItem,
            minItem
          })
        case FormTypeEnum.MODAL:
          const childModelValue = modelValue[item.prop]
          if (isUndefined(childModelValue)) {
            return <></>
          }
          return renderModal(item, childModelValue, [...path, item.prop])
        case FormTypeEnum.CUSTOM:
          return (
            <CustomItem
              v-model:value={modelValue[item.prop]}
              onChange={(event) => changed(event, [...path, item.prop])}
              component={(itemOptions as ICustomProps).componentType}
              args={(itemOptions as ICustomProps).args}
            />
          )
        default:
          return (
            <NInput
              clearable
              v-model:value={modelValue[item.prop]}
              onChange={(event) => changed(event, [...path, item.prop])}
              readonly={itemOptions!.editable === false}
              disabled={itemOptions!.disabled}
              v-slots={{
                prefix: (itemOptions as InputProps).prefix,
                suffix: (itemOptions as InputProps).suffix
              }}
            />
          )
      }
    }
    return () => (
      <NForm labelPlacement="top">
        {props.children.map((item) => (
          <NFormItem
            prop={`${props.ukey}${item.prop}`}
            label={item.label}
            showLabel={isShowLabel(item.showLabel)}
          >
            {isUndefined(formData.value) ? <></> : renderItem(item, formData.value, [props.uid])}
          </NFormItem>
        ))}
      </NForm>
    )
  }
})

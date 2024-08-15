import type { IMetaContainerItem, IMetaForm } from '@hl/core'
import { ContainerType } from '@hl/core'
import { NCard, NCollapse, NCollapseItem, NFormItem, NDivider } from 'naive-ui'
import type { PropType } from 'vue'
import { defineComponent, ref, watch } from 'vue'

import FormAttr from './formAttr'

export default defineComponent({
    components: {
        FormAttr
    },
    props: {
        config: {
            type: Object as PropType<Array<IMetaContainerItem>>,
            required: true
        },
        data: {
            type: Object as PropType<Record<string, any>>,
            required: true
        },
        mode: {
            type: String as PropType<ContainerType>,
            required: false,
            defalut: ContainerType.CARD
        },
        flat: {
            type: Boolean as PropType<boolean>,
            required: false,
            defalut: false
        }
    },
    emits: ['change', 'update:data'],
    setup(props, { emit }) {
        const formData = ref<Record<string, any>>(props.data)
        const change = (keys: Array<string>, val: any) => {
            emit('change', keys, val)
            emit('update:data', formData)
        }

        watch(
            () => props.data,
            () => {
                formData.value = props.data
            }
        )

        const updateForm = (prop: string, data: any) => {
            formData.value[prop] = data
        }

        const renderForm = (el: IMetaContainerItem) => {
            const modeValue = props.flat ? formData.value : formData.value[el.prop]
            const children = (el.children || []) as Array<IMetaForm>
            return modeValue ? (
                <FormAttr
                    children={children}
                    data={modeValue}
                    name={el.label}
                    uid={el.prop}
                    ukey={el.prop}
                    onChange={change}
                    onUpdateData={updateForm}
                />
            ) : (
                <> {'未获取到正确的数据'}</>
            )
        }

        const renderContainer = (containerItems: Array<IMetaContainerItem>) => {
            const containerMap = new Map([[ContainerType.COLLAPSE, <NCollapse accordion={true}>
                {containerItems.map((el) => {
                    return (
                        <NCollapseItem key={el.prop} title={el.label} name={el.prop}>
                            {renderForm(el)}
                        </NCollapseItem>
                    )
                })}
            </NCollapse>], [ContainerType.CARD, <>
                {containerItems.map((el) => {
                    return (
                        <NCard title={el.label} class="mb-1">
                            {renderForm(el)}
                        </NCard>
                    )
                })}
            </>], [ContainerType.FORM, <div class="p-2">
                {containerItems.map((el) => {
                    return (
                        <>
                            <NDivider
                                title-placement="left"
                                style={{ marginTop: '0px', marginBottom: '0px' }}
                            >
                                {el.label}
                            </NDivider>
                            {renderForm(el)}
                        </>
                    )
                })}
            </div>]])
            const ContainerItem = containerMap.get(props.mode)
            return ContainerItem
            switch (props.mode) {
                case ContainerType.COLLAPSE:
                    return (
                        <NCollapse accordion={true}>
                            {containerItems.map((el) => {
                                return (
                                    <NCollapseItem key={el.prop} title={el.label} name={el.prop}>
                                        {renderForm(el)}
                                    </NCollapseItem>
                                )
                            })}
                        </NCollapse>
                    )
                case ContainerType.CARD:
                    return (
                        <>
                            {containerItems.map((el) => {
                                return (
                                    <NCard title={el.label} class="mb-1">
                                        {renderForm(el)}
                                    </NCard>
                                )
                            })}
                        </>
                    )
                case ContainerType.FORM:
                    return (
                        <div class="p-2">
                            {containerItems.map((el) => {
                                return (
                                    <>
                                        <NDivider
                                            title-placement="left"
                                            style={{ marginTop: '0px', marginBottom: '0px' }}
                                        >
                                            {el.label}
                                        </NDivider>
                                        {renderForm(el)}
                                    </>
                                )
                            })}
                        </div>
                    )
            }
        }
        return () => renderContainer(props.config)
    }
})

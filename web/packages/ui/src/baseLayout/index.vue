<template>
    <div class="relative wh-full" :class="[commonClass]" :style="cssVars">
        <div :id="isWrapperScroll ? scrollElId : undefined" class="wh-full flex flex-col"
            :class="[commonClass, scrollWrapperClass, { 'overflow-y-auto': isWrapperScroll }]">
            <!--tab-->
            <template v-if="showHeader">
                <header class="hl-layout-header flex-shrink-0"
                    :class="[style['layout-header'], commonClass, header?.headerClass, headerLeftGapClass, fixedClass]">
                    <slot name="header"></slot>
                </header>
            </template>
            <!--tab-->
            <template v-if="showTab">
                <div class="tab flex-shrink-0" :class="tabClass">
                    <slot name="tab" />
                </div>
                <div v-show="fullContent || fixedHeaderAndTab" class="flex-shrink-0 overflow-hidden"
                    :class="[style['layout-tab-placement']]"></div>
            </template>
            <!--leftSider-->
            <template v-if="showSider">
                <aside v-show="!fullContent" class="absolute left-0 top-0 h-full"
                    :class="[commonClass, leftSider?.siderClass, ...siderPaddingClass, siderCollapseClass]">
                    <slot name="sider" />
                </aside>
            </template>
            <!--rightSider-->
            <template v-if="showRightSider">
                <aside v-show="!fullContent" class="absolute right-0 top-0 h-full"
                    :class="[commonClass, rightSider?.siderClass, ...rightSiderPaddingClass, rightSiderCollapseClass]">
                    <slot name="rightSider"></slot>
                </aside>
            </template>
            <!--mobile-->
            <template v-if="showMobileSider">
                <aside class="absolute left-0 top-0 h-full w-0 bg-white"
                    :class="[commonClass, style['layout-mobile-sider'], leftSider?.collapse ? 'overflow-hidden' : style['layout-sider'], leftSider?.mobileSiderClass]">
                    <slot name="sider" />
                </aside>
                <div v-show="!leftSider?.collapse" class="absolute left-0 top-0 h-full w-full bg-[rgba(0,0,0,0.2)]"
                    :class="[style['layout-mobile-sider-mask']]" @click="handleClickMask"></div>
            </template>
            <!--main-->
            <main :id="isContentScroll ? scrollElId : undefined" class="flex flex-col flex-grow"
                :class="[contentScrollClass]">
                <slot></slot>
            </main>
            <!--footer-->
            <template v-if="showFooter">
                <footer v-show="!fullContent" class="flex-shrink-0"
                    :class="[style['layout-footer'], commonClass, footer?.footerClass, footerLeftGapClass, { 'absolute left-0 bottom-0 w-full': footer?.fixed }]">
                    <slot name="footer"></slot>
                </footer>
            </template>
        </div>

    </div>
</template>
<script lang="ts" setup>
import { computed, unref } from 'vue'
import { useBaseLayout } from './useBaseLayout'
import { LAYOUT_SCROLL_EL_ID, LAYOUT_MAX_Z_INDEX } from './shared'
import { IBaseLayout, Slots, Emits } from '../types'
import style from './index.module.css';

const props = withDefaults(defineProps<IBaseLayout>(), {
    prefix: '--hl-',
    mode: 'vertical',
    scrollMode: 'content',
    scrollElId: LAYOUT_SCROLL_EL_ID,
    commonClass: 'transition-all-300',
    fixedTop: true,
    maxZIndex: LAYOUT_MAX_Z_INDEX,
    header: () => ({
        visible: true,
        height: 56

    }),
    tab: () => ({
        visible: true,
        height: 48
    }),
    leftSider: () => ({
        visible: true,
        collapse: false,
        width: 220,
        collapsedWidth: 64,
    }),
    rightSider: () => ({
        visible: true,
        collapse: false,
        width: 220,
        collapsedWidth: 64,
    }),
    footer: () => ({
        visible: true,
        height: 48,
        rightFooter: false,

    })
})
const { cssVars, isWrapperScroll, isContentScroll, fixedHeaderAndTab, isVertical, isHorizontal } = useBaseLayout(props)
const slots = defineSlots<Slots>()



const emit = defineEmits(['closeSidebar']);

const showHeader = computed(() => Boolean(slots.header) && props.header?.visible)
const showSider = computed(() => !props.isMobile && Boolean(slots.sider) && props.leftSider?.visible);
const showRightSider = computed(() => !props.isMobile && Boolean(slots.rightSider) && props.rightSider?.visible);
const showTab = computed(() => Boolean(slots.tab) && props.tab?.visible)
const showMobileSider = computed(() => props.isMobile && Boolean(slots.sider) && props?.leftSider?.visible);
const showFooter = computed(() => Boolean(slots.footer) && props.footer?.visible);
const fixedClass = computed(() => unref(fixedHeaderAndTab) ? 'absolute top-0 left-0 w-full' : '')

const siderCollapseClass = computed(() => {
    return props.leftSider.collapse ? style['layout-sider_collapsed'] : style['layout-sider']
})
const rightSiderCollapseClass = computed(() => props.rightSider?.collapse ? style['layout-right-sider_collapsed'] : style['layout-right-sider'])

const gapClass = computed(() => {
    let cls: string[] = [];

    const { leftSider, fullContent, rightSider } = props

    if (!fullContent && showSider.value) {
        cls = [...cls, leftSider?.collapse ? style['left-gap_collapsed'] : style['left-gap']]
    }
    if (!fullContent && showRightSider.value) {
        cls = [...cls, rightSider?.collapse ? style['right-gap_collapsed'] : style['right-gap']]

    }

    return cls.join(" ");
});
const tabClass = computed(() => [style['layout-tab'], props.commonClass, props.tab?.tabClass, { 'top-0!': props.fullContent || !unref(showHeader) }, unref(gapClass), { 'absolute w-full': unref(fixedHeaderAndTab) }])
const contentScrollClass = computed(() => {
    let cls = [props.commonClass, props.contentClass, unref(gapClass),]
    if (unref(fixedHeaderAndTab) && !unref(props.fullContent)) {
        cls = [...cls, style['top-gap']]
    }
    if (unref(isContentScroll)) {
        cls = [...cls, 'overflow-y-auto']
    }
    if (unref(props.footer.fixed) && !unref(props.fullContent)) {
        cls = [...cls, style['bottom-gap']]
    }
    return cls
})
const footerLeftGapClass = computed(() => {
    const condition1 = unref(isVertical);
    const condition2 = unref(isHorizontal) && unref(isWrapperScroll) && !props.footer.fixed;
    const condition3 = Boolean(unref(isHorizontal) && props.footer?.rightFooter);

    if (condition1 || condition2 || condition3) {
        return gapClass.value;
    }

    return '';
});

const siderPaddingClass = computed(() => {
    let cls: string[] = [];

    if (unref(showHeader) && !headerLeftGapClass.value) {
        cls = [...cls, style['sider-padding-top']];
    }
    if (showFooter.value && !footerLeftGapClass.value) {
        cls = [...cls, style['sider-padding-bottom']];

    }
    return cls
});

const rightSiderPaddingClass = computed(() => {
    let cls: string[] = [];

    if (unref(showHeader) && !headerLeftGapClass.value) {
        cls = [...cls, style['right-sider-padding-top']];
    }
    if (unref(showFooter) && !footerLeftGapClass.value) {
        cls = [...cls, style['right-sider-padding-bottom']];

    }

    return cls
});


const headerLeftGapClass = computed(() => (unref(isVertical) ? gapClass.value : ''));

function handleClickMask() {
    emit('closeSidebar', true);
}
</script>
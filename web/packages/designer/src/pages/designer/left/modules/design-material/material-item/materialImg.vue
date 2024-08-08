<template>
    <img class="list-img" v-if='imageSrc' :src='imageSrc' alt="图表图片" />
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'

interface ImageModule {
    default: string;
}
interface Props {
    image: (() => Promise<ImageModule>) | String;
}

const props = defineProps<Props>()

const imageSrc = ref<string | null>(null);
const urlPattern = /^(http|https):\/\/([\w.]+\/?)\S*/;

// 加载图片
const loadImage = async () => {
    if (!props.image) return
    try {
        if (typeof props.image === 'string') {
            if (urlPattern.test(props.image) || props.image?.includes('@') || props.image?.includes('base64')) {
                imageSrc.value = props.image

            }
        } else {
            const imageModule = await props.image();
            if (imageModule && typeof imageModule.default === 'string') {
                imageSrc.value = imageModule.default;
            } else {
                console.error('Image module does not have a default export of type string.');
            }
        }



    } catch (error) {
        console.error('Error loading image:', error);
    }
};

// 在组件挂载时加载图片
onMounted(() => {
    loadImage();
});
</script>
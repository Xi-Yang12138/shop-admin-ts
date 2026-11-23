<!-- 共享组件：图片选择/管理面板 -->
<template>
    <el-container class="image-picker" :style="{ height: height, background: '#f5f7fa' }">
        <el-header class="image-header">
            <el-button type="primary" @click="handleOpenCreate">新增图片分类</el-button>
            <el-button type="warning" @click="handleOpenUpload">上传图片</el-button>
        </el-header>
        <el-container>
            <ImageAside ref="ImageAsideRef" @change="handleAsideChange" />
            <ImageMain :openChoose="openChoose" ref="ImageMainRef" @choose="handleChoose" />
        </el-container>
    </el-container>
</template>

<script setup>
import { ref } from 'vue'
import ImageAside from './ImageAside.vue'
import ImageMain from './ImageMain.vue'

defineProps({
    openChoose: { type: Boolean, default: false },
    height: { type: String, default: '100%' }
})

const emit = defineEmits(['choose'])

const ImageAsideRef = ref(null)
const handleOpenCreate = () => ImageAsideRef.value.handleCreate()

const ImageMainRef = ref(null)
const handleAsideChange = (image_class_id) => {
    ImageMainRef.value.loadData(image_class_id)
}
const handleOpenUpload = () => ImageMainRef.value.openUploadFile()
const handleChoose = (e) => emit('choose', e)
</script>

<style scoped>
.image-header {
    display: flex;
    align-items: center;
    margin-left: 20px;
}
</style>
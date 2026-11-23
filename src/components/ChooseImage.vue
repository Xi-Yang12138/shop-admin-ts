<template>
    <div v-if="model">
        <el-image :src="model" fit="cover" :lazy="true" class="choose-image"></el-image>
        
    </div>

    <div class="choose-image-btn" @click="open">
        <el-icon class="icon-plus">
            <Plus />
        </el-icon>
    </div>

    <el-dialog title="选择图片" v-model="dialogVisible" width="70%" top="5vh">

        <ImagePicker :open-choose="true" height="70vh" @choose="handleChoose" />

        <template #footer>
            <span>
                <el-button @click="close">取消</el-button>
                <el-button type="primary" @click="submit">确定</el-button>
            </span>
        </template>
    </el-dialog>

</template>

<script setup>
import { ref } from 'vue'
import ImagePicker from '~/components/ImagePicker.vue'

const dialogVisible = ref(false)

const open = () => {
    dialogVisible.value = true
}
const close = () => {
    dialogVisible.value = false
}

let urls = []
const handleChoose = (e) => {
    urls = e.map(o => o.url)

}

const model = defineModel()
model.value = urls[0]

</script>



<style scoped>
.choose-image{
    width: 100px;
    height: 100px;
    border-radius: 5px;
    border: 1px solid #dcdfe6;
    margin-right: 10px;

}
.choose-image-btn {
    width: 100px;
    height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    @apply hover:bg-gray-200;
}

.icon-plus {
    font-size: 24px;
    @apply text-gray-500;
}
</style>
<!-- 共享组件: 删除确认按钮 -->
<template>
    <el-popconfirm :title="title" confirm-button-text="确认" cancel-button-text="取消" placement="bottom"
        @confirm="handleConfirm">
        <template #reference>
            <el-button type="primary" text>{{ text }}</el-button>
        </template>
    </el-popconfirm>
</template>

<script setup>
defineProps({
    title: { type: String, default: '确定要删除吗？' },
    text: { type: String, default: '删除' },
})

const emit = defineEmits(['confirm'])
const handleConfirm = () => emit('confirm')
</script>
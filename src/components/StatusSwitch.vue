<!-- 共享组件: 状态开关 -->
<template>
    <el-switch :model-value="modelValue" :active-value="activeValue" :inactive-value="inactiveValue" :loading="loading"
        :disabled="disabled" @change="handleChange" />
</template>

<script setup>
defineProps({
    modelValue: { type: [Number, Boolean], default: 0 },
    activeValue: { type: [Number, Boolean], default: 1 },
    inactiveValue: { type: [Number, Boolean], default: 0 },
    loading: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
})

const emit = defineEmits(['update:modelValue', 'change'])
const handleChange = (val) => {
    emit('update:modelValue', val)
    emit('change', val)
}
</script>
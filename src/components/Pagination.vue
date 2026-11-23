<!-- 共享组件: 分页 -->
<template>
    <div class="pagination">
        <el-pagination background layout="prev, pager, next, total" :total="total" :current-page="currentPage"
            :page-size="pageSize" @current-change="handleCurrentChange" />
    </div>
</template>

<script setup>
const props = defineProps({
    total: { type: Number, default: 0 },
    currentPage: { type: Number, default: 1 },
    pageSize: { type: Number, default: 10 },
})

const emit = defineEmits(['current-change'])
const handleCurrentChange = (p) => emit('current-change', p)
</script>

<style scoped>
.pagination {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
}
</style>
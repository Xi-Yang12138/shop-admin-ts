<!-- 页面: 图库管理 -->
<template>
    <ImagePicker :height="h + 'px'" />
</template>

<script setup>
import ImagePicker from '~/components/ImagePicker.vue'

const windowHeight = window.innerHeight || document.body.clientHeight
const h = windowHeight - 100 - 40 - 40
</script>
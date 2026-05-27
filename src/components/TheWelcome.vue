<template>
    <el-input v-model="userInfo.login_name" style="width: 240px" placeholder="Please input" />
    <el-input v-model="userInfo.login_pwd" style="width: 240px" placeholder="Please input" />
    <el-button type="primary">Primary</el-button>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const userInfo = ref({
    login_name: 'wy000',
    login_pwd: '123456',
})


</script>
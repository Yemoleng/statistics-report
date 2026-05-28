<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
//import { post } from '@/api/api.js'
//import { getCookies, setCookies } from '@/utils/cache.js'
import { onMounted } from 'vue'
import { backendLogin, getOrganizationInitData } from '@/api/backendApi.ts'
import { useInitDataStore } from '@/stores/initDataStore'
import { FORBIDDEN } from '@/constants/http.js'
import { getYesterday, dayPeriod } from '@/utils/date.ts'
import { getCookies } from '@/utils/cache.js'
const initDataStore = useInitDataStore()
let yesterday = getYesterday()
let lastDays = dayPeriod(-1)

onMounted(async () => {
  //获取组织架构初始化数据
  try {
    if (yesterday == lastDays) {
      await backendLogin()
    } else if (getCookies('ASP.NET_SessionId') == 'undefined') {
      await backendLogin()
    }
    let res = await getOrganizationInitData()
    initDataStore.websiteId = res.data.websites[0].guid
    console.log('websiteId', initDataStore.websiteId)
  } catch (error: any) {
    console.log('error', error.data.code)
    if (error.data.code && error.data.code === FORBIDDEN) {
      // 登录后台获取Cookie
      await backendLogin()
      console.log('登录')
    } else {
      console.error('Error', error)
    }
  }
})
</script>

<template>
  <header>
    <div class="wrapper">
      <nav>
        <RouterLink to="/"></RouterLink>
      </nav>
    </div>
  </header>
  <RouterView />
</template>

<style scoped></style>

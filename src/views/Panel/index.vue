<template>
  <div class="bg">
    <div class="title-box">
      <div class="title">无忧数据大屏</div>
      <span class="now">{{ now }}</span>
    </div>
    <SaleOrder />
    <CusQuote />
    <!-- <div ref="saleOrderRef" class="chat-title"></div> -->
  </div>
</template>

<script setup lang="ts">
import { getUserInfo, getCustomerPay } from '@/api/backendApi.ts'
import {
  dayPeriod,
  monthPeriod,
  getToday,
  timestampToDate,
  getNow,
  getMonthStart,
} from '@/utils/date.ts'
import { useInitDataStore } from '@/stores/initDataStore.ts'
import { ref, onMounted, nextTick } from 'vue'
import SaleOrder from './SaleOrder.vue'
import CusQuote from './CusQuote.vue'

const initDataStore = useInitDataStore()
let yesterday = dayPeriod(-1)
let lastDays = dayPeriod(-7)
let today = getToday()
const now = ref(getNow())
let timer = 0
timer = setInterval(() => {
  now.value = getNow()
}, 1000)

// 获取用户信息
let yesterdayReg = ref(0)
let allReg = ref(0)

getUserInfo(yesterday, yesterday).then((res: any) => {
  console.log('userInfo', res, res.totalCount)
  yesterdayReg.value = res.totalCount
})
getUserInfo().then((res: any) => {
  console.log('userInfoAll', res, res.totalCount)
  allReg.value = res.totalCount
})

onMounted(() => {
  getCustomerPay(getMonthStart(), today).then((res: any) => {
    console.log('customerPay', res)
  })
})
</script>

<style scoped lang="less">
@charset "UTF-8";
/* CSS Document */
.bg {
  margin: 0 auto;
  width: 100%;
  min-height: 100vh;
  // background: url(@/assets/images/bg2.jpg) no-repeat;
  background-size: cover;
  padding-top: 0rem;
  padding: 0rem 0.2rem;
}
.title-box {
  width: 100%;
  position: relative;
}
.title {
  font-size: 0.12rem;
  line-height: 0.3rem;
  color: rgba(14, 253, 255, 1);
  text-align: center;
  font-weight: bold;
}
.now {
  right: 0;
  top: 0;
  position: absolute;
  font-size: 0.12rem;
  line-height: 0.3rem;
  color: rgba(14, 253, 255, 1);
  text-align: center;
  font-weight: bold;
}
</style>

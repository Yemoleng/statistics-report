<template>
  <div ref="cusQuoteRef" class="cusOrderChat"></div>
</template>

<script setup lang="ts">
import { getQuoteList } from '@/api/backendApi.ts'
import { dayPeriod, getToday, timestampToDate } from '@/utils/date.ts'
import { useInitDataStore } from '@/stores/initDataStore.ts'
import { ref, onMounted, nextTick } from 'vue'
import * as echarts from 'echarts'

let lastDays = dayPeriod(-7)
let today = getToday()
let yesterday = dayPeriod(-1)
const quoteList = ref([])
const quoteMap = new Map<string, number>()
let quoteResult: any = []
let typeData = []
let cusQuoteRef = ref(null)

const initQuoteList = async () => {
  let myChart = echarts.init(cusQuoteRef.value)
  getQuoteList(yesterday, yesterday, 1000, 1000).then((res: any) => {
    quoteList.value = res

    quoteList.value.forEach((item: any) => {
      quoteMap.set(item.SourceType, (quoteMap.get(item.SourceType) || 0) + 1)
    })
    quoteResult = Array.from(quoteMap, ([type, count]) => ({ type, count }))
    typeData = quoteResult.map((item: any) => {
      return { value: item.count, name: item.type }
    })
    let option = {
      title: {
        text: '昨日报价占比',
      },
      tooltip: {
        trigger: 'item',
        formatter: '{b}: {c} ({d}%)', // 显示分类名称、数量和百分比
      },
      series: [
        {
          type: 'pie',
          data: typeData,
        },
      ],
    }
    myChart.setOption(option)
    console.log('quoteList', quoteResult)
  })
}
onMounted(() => {
  initQuoteList()
})
</script>

<style scoped>
.cusOrderChat {
  width: 30rem;
  height: 20rem;
  font-size: 0.18rem;
  font-weight: 600;
  margin-bottom: 0.2rem;
  color: rgba(14, 253, 255, 1);
}
</style>

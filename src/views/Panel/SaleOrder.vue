<template>
  <div class="saleOrder">
    <div ref="saleOrderRef" class="saleOrderChat"></div>
  </div>
</template>

<script setup lang="ts">
import { getSaleOrderList } from '@/api/backendApi.ts'
import { dayPeriod, monthPeriod, getToday, timestampToDate, getNow } from '@/utils/date.ts'
import qs from 'qs'
import { useInitDataStore } from '@/stores/initDataStore.ts'
import { ref, onMounted, nextTick } from 'vue'
import * as echarts from 'echarts'

const initDataStore = useInitDataStore()
let lastDays = dayPeriod(-7)
let today = getToday()

// 销售订单列表
const saleOrderData = ref([])
const saleOrderPms = qs.stringify({
  take: 1000,
  skip: 0,
  page: 1,
  pageSize: 1000,
  OrderCreatTimeBegin: lastDays,
  OrderCreatTimeEnd: today,
  FinishStatus: 1,
  Field: 0,
  OrderCodeOrName: '',
  WebUserCodeNameCompN: '',
  SaleManCodeName: '',
  ServiceNameOrCode: '',
  websiteid: initDataStore.websiteId,
})
const saleMap = new Map<string, number>()
let saleResult: any = Array.from(saleMap, ([date, count]) => ({ date, count }))
const saleAmountMap = new Map<string, number>()

// saleResult = [
//   {
//     date: '2026-05-11',
//     count: 54,
//   },
//   {
//     date: '2026-05-12',
//     count: 42,
//   },
//   {
//     date: '2026-05-13',
//     count: 43,
//   },
//   {
//     date: '2026-05-14',
//     count: 61,
//   },
//   {
//     date: '2026-05-15',
//     count: 63,
//   },
//   {
//     date: '2026-05-16',
//     count: 44,
//   },
//   {
//     date: '2026-05-17',
//     count: 6,
//   },
// ]
let color = [
  '#c23531',
  '#2f4554',
  '#61a0a8',
  '#d48265',
  '#91c7ae',
  '#749f83',
  '#ca8622',
  '#bda29a',
  '#6e7074',
  '#546570',
  '#c4ccd3',
]
const saleOrderRef = ref<HTMLElement>()

const getSaleOrderData = async () => {
  await getSaleOrderList(saleOrderPms).then((res: any) => {
    saleOrderData.value = res.data
    saleOrderData.value.forEach((item: any) => {
      const date = timestampToDate(Number(item.CreateTime_Datetime.slice(6, 19)))
      // 统计订单量
      saleMap.set(date, (saleMap.get(date) || 0) + 1)
      // 统计销售额
      const orderAmount = Number(item.OrderMoney_Decimal) - Number(item.OrderRetuanAmt_Decimal)
      saleAmountMap.set(date, (saleAmountMap.get(date) || 0) + orderAmount)
      // console.log('resp', saleAmountMap.get(date))
    })
    saleResult = Array.from(saleMap, ([date, count]) => ({
      date,
      count,
      amount: saleAmountMap.get(date) || 0, // 同步销售额数据
    })).sort((a, b) => {
      return new Date(a.date).getTime() - new Date(b.date).getTime()
    })
  })
}

// onMounted(async () => {
//   let myChart = echarts.init(saleOrderRef.value)
//   await getSaleOrderData()
//   let xData = saleResult.map((item) => item.date)
//   let yData = saleResult.map((item) => item.count)
//   let yAmountData = saleResult.map((item) => {
//     return Number(item.amount).toFixed(2)
//   })
//   let option = {
//     title: {
//       text: '近七天销售情况',
//     },
//     tooltip: {},
//     legend: {
//       data: ['日期'],
//     },
//     xAxis: {
//       data: xData,
//     },
//     yAxis: {},
//     series: [
//       {
//         name: '销量',
//         type: 'bar',
//         data: yData,
//         itemStyle: {
//           color: (params) => {
//             return color[params.dataIndex % color.length]
//           },
//         },
//       },
//       {
//         name: '趋势',
//         type: 'line', // 折线图
//         data: yAmountData, // 使用相同的数据作为示例
//         lineStyle: {
//           color: '#5470c6', // 折线颜色
//         },
//         smooth: true, // 平滑曲线
//         symbol: 'circle', // 数据点样式
//         symbolSize: 8, // 数据点大小
//       },
//     ],
//     color,
//   }
//   myChart.setOption(option)
// })
onMounted(async () => {
  let myChart = echarts.init(saleOrderRef.value)
  await getSaleOrderData()
  let xData = saleResult.map((item) => item.date)
  let yData = saleResult.map((item) => item.count)
  let yAmountData = saleResult.map((item) => {
    return Number(item.amount).toFixed(2)
  })
  let option = {
    title: {
      text: '近七天销售情况',
    },
    tooltip: {
      trigger: 'axis', // 支持轴触发，显示柱状图和折线图的详细信息
      axisPointer: {
        type: 'cross', // 显示十字指示器
      },
    },
    legend: {
      data: ['销量', '销售额'], // 添加图例
    },
    xAxis: {
      type: 'category',
      data: xData,
    },
    yAxis: [
      {
        type: 'value',
        name: '销量', // 左侧 Y 轴名称
        position: 'left', // 左侧 Y 轴
        axisLine: {
          lineStyle: {
            color: '#c23531', // 左侧 Y 轴颜色
          },
        },
      },
      {
        type: 'value',
        name: '销售额', // 右侧 Y 轴名称
        position: 'right', // 右侧 Y 轴
        axisLine: {
          lineStyle: {
            color: '#5470c6', // 右侧 Y 轴颜色
          },
        },
      },
    ],
    series: [
      {
        name: '销量',
        type: 'bar',
        data: yData,
        itemStyle: {
          color: (params) => {
            return color[params.dataIndex % color.length]
          },
        },
      },
      {
        name: '销售额',
        type: 'line', // 折线图
        data: yAmountData,
        yAxisIndex: 1, // 绑定到右侧 Y 轴
        smooth: true, // 平滑曲线
        lineStyle: {
          color: '#5470c6', // 折线颜色
        },
        symbol: 'circle', // 数据点样式
        symbolSize: 8, // 数据点大小
      },
    ],
    color,
  }
  myChart.setOption(option)
})
</script>

<style>
.saleOrderChat {
  width: 30rem;
  height: 20rem;
  font-size: 0.18rem;
  font-weight: 600;
  margin-bottom: 0.2rem;
  color: rgba(14, 253, 255, 1);
}
</style>

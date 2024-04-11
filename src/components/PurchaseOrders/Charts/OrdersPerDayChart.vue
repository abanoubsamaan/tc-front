<script setup>
import usePurchaseOrders from '@/composables/usePurchaseOrders'
import { onMounted, ref, watch } from 'vue'

const { getPOsPerDay, POsPerDay } = usePurchaseOrders()

onMounted(() => {
  getPOsPerDay()
})

watch(POsPerDay, () => {
  chartOptions.value.xAxis.categories = POsPerDay.value.map((po) => po.date)
  chartOptions.value.series[0].data = POsPerDay.value.map((po) => po.count)
})

const chartOptions = ref({
  chart: {
    type: 'line'
  },
  title: {
    text: 'Orders per Day'
  },
  xAxis: {
    categories: []
  },
  series: [
    {
      name: 'Orders',
      data: [],
      color: 'gray'
    }
  ]
})
</script>
<template>
  <highcharts :options="chartOptions"></highcharts>
</template>

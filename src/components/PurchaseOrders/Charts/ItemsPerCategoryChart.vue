<script setup>
import usePurchaseOrders from '@/composables/usePurchaseOrders'
import { onMounted, ref, watch } from 'vue'

const { getCategories, categories } = usePurchaseOrders()

onMounted(() => {
  getCategories()
})

watch(categories, () => {
  chartOptions.value.xAxis.categories = categories.value.map((category) => category.name)
  chartOptions.value.series[0].data = categories.value.map((category) => category.items_count)
})

const chartOptions = ref({
  chart: {
    type: 'column'
  },
  title: {
    text: 'Items per category'
  },
  xAxis: {
    categories: []
  },
  series: [
    {
      name: 'Items',
      data: [],
      color: 'gray'
    }
  ]
})
</script>
<template>
  <highcharts :options="chartOptions"></highcharts>
</template>
